import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import Home from '../Component/Home';
import Analytics from '../Component/Analytics/Analytics';
import AddPage from '../Component/AddProject/AddPage';
import ProjectDetails from '../Component/ProjectDesc/ProjectDesc';
import Loginpage from '../Component/Loginpage/Loginpage';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        {isLoggedIn && <Header />}
        <div style={{ display: 'flex' }}>
          {isLoggedIn && <Sidebar />}
          <div style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Loginpage setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
              <Route path="/analytics" element={isLoggedIn ? <Analytics /> : <Navigate to="/" />} />
              <Route path="/addpage" element={isLoggedIn ? <AddPage /> : <Navigate to="/" />} />
              <Route path="/CirrusInshightsNow" element={isLoggedIn ? <ProjectDetails /> : <Navigate to="/" />} />
              {/* Add more routes here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
