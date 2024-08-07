import React from "react";
import { Link } from "react-router-dom";
import plus from "../app/assets/Plus.png";
import analytics from "../app/assets/category.png";
import square from "../app/assets/task-square.png";
import settings from "../app/assets/setting-2.png";
import addsquare from "../app/assets/add-square.png";
import green from "../app/assets/Ellipse 8.png";
import orange from "../app/assets/Ellipse 9.png";
import purple from "../app/assets/Ellipse 10.png";
import blue from "../app/assets/Ellipse 11.png";

function Sidebar() {
  return (
    <aside className="fixed top-18 left-0 h-full w-64 border-r border-gray-300 p-5">
      <div>
        <Link to="/addpage" className="block">
          <button className="flex items-center justify-center w-full rounded-2xl py-3 px-5 mb-3 bg-red-600 text-white cursor-pointer hover:bg-red-700">
            <img
              src={plus}
              alt="Logo"
              className="mr-2"
            />
            <span>Add Project</span>
          </button>
        </Link>

        <div className="mt-5">
          <Link to="/home" className="flex items-center py-4 pl-2 cursor-pointer hover:text-red-600">
            <img
              src={square}
              alt="Projects"
              className="mr-2"
            />
            <span>Projects</span>
          </Link>
        </div>

        <div className="mt-3 border-b border-gray-300 pb-5">
          <Link to="/analytics" className="flex items-center py-4 pl-2 cursor-pointer hover:text-red-600">
            <img
              src={analytics}
              alt="Analytics"
              className="mr-2"
            />
            <span>Analytics</span>
          </Link>
          
          <div className="flex items-center py-4 pl-2 cursor-pointer hover:text-red-600">
            <img
              src={settings}
              alt="Settings"
              className="mr-2"
            />
            <span>Settings</span>
          </div>
        </div>
      </div>

      <div className="mt-5 ml-5">
        <div className="flex items-center justify-between p-4">
          <span className="text-sm whitespace-nowrap">MY PROJECT STATUS</span>
          <img
            src={addsquare}
            alt="Add"
            className="h-6 w-6 object-contain ml-4"
          />
        </div>
        
        <div className="mt-5">
          <div className="flex items-center py-2 cursor-pointer">
            <img
              src={green}
              alt="Ongoing"
              className="mr-5 h-4 w-4 mt-1"
            />
            <span>Ongoing</span>
          </div>
          <div className="flex items-center py-2 cursor-pointer">
            <img
              src={orange}
              alt="Completed"
              className="mr-5 h-4 w-4 mt-1"
            />
            <span>Completed</span>
          </div>
          <div className="flex items-center py-2 cursor-pointer">
            <img
              src={purple}
              alt="Delayed"
              className="mr-5 h-4 w-4 mt-1"
            />
            <span>Delayed</span>
          </div>
          <div className="flex items-center py-2 cursor-pointer">
            <img
              src={blue}
              alt="At Risk"
              className="mr-5 h-4 w-4 mt-1"
            />
            <span>At Risk</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
