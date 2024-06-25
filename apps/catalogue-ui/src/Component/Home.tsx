import React from 'react';
import './Home.css';
import downarr from '../app/assets/arrow-down.png';
import filter from '../app/assets/filter.png';
import iconlogohome from '../app/assets/iconlogohome.png';
import commentsimg from '../app/assets/commentsimg.png';

function Home() {
  const colors = [
    'bg-gray-100',
    'bg-red-200',
     'bg-blue-200',
     'bg-gray-100',
     'bg-red-200',
      'bg-blue-200',
  ];
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

      {/* Project containers */}
      {/* Responsive Grid for Project Blocks */}
      <div className="flex flex-wrap justify-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={`container border border-gray-300 w-11/12 sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 mt-12 p-4 rounded-[16px] mx-2 mb-4 ${colors[index % colors.length]}`}>
         {/* <div key={index} className={`container border border-gray-300 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mt-12 p-4 rounded-[16px] mx-2 mb-4 ${colors[index % colors.length]}`}> */}

            <h2 className='cirrHeading text-[#5B4BA7] text-xl mt-4 ml-4'>CirrusInsightsNow.AI</h2>
            <p className='pHome text-[#0D062D] text-sm mt-2 ml-4'>Duration: 6 Weeks</p>
            <ul className="list-disc ml-8 text-[#787486] text-lg mt-4">
              <li>Simplifies the creation of user stories</li>
              <li>Allows users to focus on their project's needs</li>
              <li>Ensures that the user stories align with best practices and project goals.</li>
            </ul>
            <div className='flex justify-between items-center mt-2 ml-4 mr-4'>
              <span className='pHome text-[#0D062D] text-sm'>Progress</span>
              <span className='text-[#0D062D] text-sm'>100%</span>
            </div>
            <div className='h-[3px] bg-red-500 mt-2 mx-4'></div>
            <div className='flex justify-between items-center mt-2 ml-4 mr-4'>
              <div className='flex items-center'>
                <img src={iconlogohome} alt="Logo" className="h-5 mr-2" />
                <span className='text-[#0D062D] text-sm'>3 Members</span>
              </div>
              <div className='flex items-center'>
                <img src={commentsimg} alt="Comments" className="h-5 mr-2" />
                <span className='text-[#0D062D] text-sm'>0 Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
