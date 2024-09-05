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
import AdminDashboard from '../Component/AdminDashboard/AdminDashboard';
import ProjectStatus from '../Component/ProjectStatus';
import ManageProject from '../Component/ManageProject';
import SearchResults from '../Component/SearchResults';
import AccessDenied from '../Component/AccessDenied';
import { StatusProvider } from '../Component/StatusContext';
import AddMember from '../Component/AddMember';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedLoggedInStatus = sessionStorage.getItem('isLoggedIn');
    const storedUserRole = sessionStorage.getItem('userRole');
    if (storedLoggedInStatus === 'true') {
      setIsLoggedIn(true);
      setUserRole(storedUserRole || '');
    }
  }, []);

  const handleLogin = (isLoggedIn: boolean, role: string) => {
    setIsLoggedIn(isLoggedIn);
    setUserRole(role);
    sessionStorage.setItem('isLoggedIn', isLoggedIn.toString());
    sessionStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');
  };

  const ProtectedRoute: React.FC<{ element: React.ReactElement; requiredRole?: string }> = ({ element, requiredRole }) => {
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/access-denied" />;
    }
    return element;
  };

  return (
    <StatusProvider>
      <Router>
        <div className="flex flex-col h-screen overflow-hidden">
          {isLoggedIn && <Header onLogout={handleLogout} />}
          <div className="flex flex-1 overflow-hidden">
            {isLoggedIn && <Sidebar userRole={userRole} />}
            <main className="flex-1 overflow-y-auto bg-gray-50">
              <Routes>
                <Route path="/" element={<Loginpage setIsLoggedIn={handleLogin} />} />
                <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/analytics" element={<ProtectedRoute element={<Analytics />} />} />
                <Route path="/addpage" element={<ProtectedRoute element={<AddPage />} />} />
                <Route path="/description/:id" element={<ProtectedRoute element={<ProjectDetails />} />} />
                <Route path="/projects/filter" element={<ProtectedRoute element={<FilteredProjects />} />} />
                <Route path="/search-results" element={<ProtectedRoute element={<SearchResults />} />} />
                <Route path="/AdminDashboard" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} />
                <Route path="/ProjectStatus" element={<ProtectedRoute element={<ProjectStatus />} requiredRole="admin" />} />
                <Route path="/ManageProject" element={<ProtectedRoute element={<ManageProject />} requiredRole="admin" />} />
                <Route path="/AddMember" element={<ProtectedRoute element={<AddMember />} requiredRole="admin" />} /> 
                <Route path="/access-denied" element={<AccessDenied />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </StatusProvider>
  );
}

export default App;
