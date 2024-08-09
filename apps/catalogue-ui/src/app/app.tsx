import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import Home from '../Component/Home';
import Analytics from '../Component/Analytics/Analytics';
import AddPage from '../Component/AddProject/AddPage';
import ProjectDetails from '../Component/ProjectDesc/ProjectDesc';
import Loginpage from '../Component/Loginpage/Loginpage';
import FilteredProjects from '../Component/FilteredProjects';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user was previously logged in from sessionStorage
    const storedLoggedInStatus = sessionStorage.getItem('isLoggedIn');
    if (storedLoggedInStatus && storedLoggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
  };

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    return isLoggedIn ? (
      <React.Fragment>{element}</React.Fragment>
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <Router>
      <div className="h-screen overflow-hidden">
        {isLoggedIn && <Header />}
        {isLoggedIn && <Sidebar />}
        <Routes>
          <Route path="/" element={<Loginpage setIsLoggedIn={handleLogin} />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/analytics"
            element={<ProtectedRoute element={<Analytics />} />}
          />
          <Route
            path="/addpage"
            element={<ProtectedRoute element={<AddPage />} />}
          />
          <Route
            path="/description/:id"
            element={<ProtectedRoute element={<ProjectDetails />} />}
          />
          <Route
            path="/projects/filter/:status"
            element={<ProtectedRoute element={<FilteredProjects />} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
