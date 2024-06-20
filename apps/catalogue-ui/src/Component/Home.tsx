import React from 'react'
import "./Home.css";
import downarr from '../app/assets/arrow-down.png';
import filter from '../app/assets/filter.png';

function Home() {
  return (
    <div>
      <h1 className='home_header'>Project Catalogue</h1>
      <div className='filter_align'>
      <img src={filter} alt="Logo" className="h-12" />
        <span>Filter</span>
        <img src={downarr} alt="Logo" className="h-12" />
      </div>
    </div>
  )
}

export default Home
