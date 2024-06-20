import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import Home from '../Component/Home';
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
              {/* <Route path="/page1" element={<Page1 />} />
              <Route path="/page2" element={<Page2 />} /> */}
              {/* Add more routes here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
