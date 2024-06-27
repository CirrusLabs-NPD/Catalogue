import React from 'react';
import './Home.css';
import downarr from '../app/assets/arrow-down.png';
import filter from '../app/assets/filter.png';
import { Link } from 'react-router-dom';
import iconlogohome from '../app/assets/iconlogohome.png';
import commentsimg from '../app/assets/commentsimg.png';
import FilterDropdown from './FilterDropdown/filter';
import CalendarDropdown from './FilterDropdown/calendarDropdown';

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
    <div className="overflow-y-auto h-full">
       <h1 className="home_header">Project Catalogue</h1>
      <div className="flex space-x-4 mt-4 mb-4">
        <FilterDropdown/>
        <CalendarDropdown/>
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

      {/* Project containers */}
      {/* Responsive Grid for Project Blocks */}
      <div className="flex flex-wrap justify-center">
  {Array.from({ length: 6 }).map((_, index) => (
    <Link
      key={index}
        to="/CirrusInshightsNow"
      className={`container border border-gray-300 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mt-12 p-4 rounded-lg mx-2 mb-4 ${colors[index % colors.length]}`}
    >
      <div className="flex flex-col items-start">
        <h2 className="cirrHeading text-[#5B4BA7] text-xl mt-4 ml-4 mb-2">
          CirrusInsightsNow.AI
        </h2>
        <p className="pHome text-[#0D062D] text-sm ml-4">
          Duration: 6 Weeks
        </p>
        <ul className="list-disc ml-8 text-[#787486] text-lg mt-2">
          <li>Simplifies the creation of user stories</li>
          <li>Allows users to focus on their project's needs</li>
          <li>
            Ensures that the user stories align with best practices and
            project goals.
          </li>
        </ul>
        <div className="flex justify-between items-center w-full mt-2 px-4">
          <span className="pHome text-[#0D062D] text-sm">Progress</span>
          <span className="text-[#0D062D] text-sm ml-auto">100%</span> {/* Align to the right */}
        </div>
        <div className="w-[90%] h-[3px] bg-red-500 mt-1 mx-auto mb-2"></div> {/* Horizontal red line */}
        <div className="flex justify-between items-center w-full mt-2 px-4"> {/* Container for members and comments */}
          <div className="flex items-center">
            <img src={iconlogohome} alt="Logo" className="h-5 mr-2" />
            <span className="text-[#0D062D] text-sm">3 Members</span>
          </div>
          <div className="flex items-center">
            <img src={commentsimg} alt="Comments" className="h-5 mr-2" />
            <span className="text-[#0D062D] text-sm">0 Comments</span>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>


    </div>
  );
}

export default Home;