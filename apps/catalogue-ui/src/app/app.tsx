import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import Home from '../Component/Home';
import Analytics from '../Component/Analytics';
import AddPage from '../Component/AddProject/AddPage';
// import Page1 from '../Component/Page1'; 
// import Page2 from '../Component/Page2';

export function App() {
  return (
    <Router>
      <div>
        <Header />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/addpage" element={<AddPage />} />
              {/* Add more routes here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
