import React from 'react';
import './Home.css';
import downarr from '../app/assets/arrow-down.png';
import filter from '../app/assets/filter.png';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="home_header">Project Catalogue</h1>
      <div className="header_align_home">
        <div className="filter_align">
          <img src={filter} alt="Logo" className="h-5 m-1" />
          <span>Filter</span>
          <img src={downarr} alt="Logo" className="h-5 m-1 ml-14" />
        </div>
        <div className="filter_align">
          <img src={filter} alt="Logo" className="h-5 m-1" />
          <span>Today</span>
          <img src={downarr} alt="Logo" className="h-5 m-1 ml-12" />
        </div>
      </div>
      {/* <div className='container'>
          <h2 className='cirrHeading'>CirrusInsightsNow.AI</h2>
          <p className='pHome'>Duration: 6 Weeks</p>
          <ul>
            <li>Simplifies the creation of user stories</li>
            <li>
            Allows users to focus on their project's need</li>
            <li>Ensures that the user stories align with best practices and project goals.</li>
          </ul>
      </div> */}
      <Link to="/CirrusInshightsNow" className="sidebar__link">
      <div className='container border border-gray-300 w-1/4 mt-12 bg-gray-100 p-4 rounded-[16px]'>
  <h2 className='cirrHeading text-[#5B4BA7] text-xl mt-4 ml-4'>CirrusInsightsNow.AI</h2>
  <p className='pHome text-[#0D062D] text-sm mt-2 ml-4'>Duration: 6 Weeks</p>
  <ul className="list-disc ml-8 text-[#787486] text-lg mt-4">
    <li>Simplifies the creation of user stories</li>
    <li>Allows users to focus on their project's needs</li>
    <li>Ensures that the user stories align with best practices and project goals.</li>
  </ul>
  <span className='pHome text-[#0D062D] text-sm mt-2 ml-4'>Progress </span>
  <span className='ml-24 '>100%</span>
</div>
</Link>

    </div>
  );
}

export default Home;
