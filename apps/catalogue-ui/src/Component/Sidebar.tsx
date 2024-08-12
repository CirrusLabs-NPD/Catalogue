import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import plus from "../app/assets/Plus.png";
import analytics from "../app/assets/category.png";
import square from "../app/assets/task-square.png";
import addsquare from "../app/assets/add-square.png";
import { getStatuses } from '../api/projects';

interface Status {
  _id: string;
  projectStatus: string;
}

const statusColors: { [key: string]: string } = {
  "Ongoing": "#34C759",
  "Completed": "#FF9500",
  "Delayed": "#AF52DE",
  "At Risk": "#007AFF"
};

function Sidebar() {
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const fetchedStatuses = await getStatuses();
        setStatuses(fetchedStatuses);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    fetchStatuses();
  }, []);

  const handleStatusClick = (status: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append('value', status);
    
    navigate(`/projects/filter/statuses?${searchParams.toString()}`);
  };
    
  return (
    <aside className="fixed top-18 left-0 h-full w-64">
      <div className="w-64 p-5 border-r border-gray-300 relative">
        <Link to="/addpage" className="block mb-4">
          <button className="w-full flex items-center justify-center rounded-lg p-2.5 mb-2 bg-[#D5292B] text-white h-16 hover:bg-[#a31517]">
            <img
              src={plus}
              alt="Logo"
              className="mr-2"
            />
            <span>Add Project</span>
          </button>
        </Link>

        <div className="border-b border-gray-300">
          <Link to="/home" className="flex items-center ml-8 mb-4 cursor-pointer hover:text-[#D5292B]">
            <img
              src={square}
              alt="Projects"
              className="mr-2"
            />
            <span>Projects</span>
          </Link>
          <Link to="/analytics" className="flex items-center ml-8 mb-4 cursor-pointer hover:text-[#D5292B]">
            <img
              src={analytics}
              alt="Analytics"
              className="mr-2"
            />
            <span>Analytics</span>
          </Link>
          <div className="flex items-center ml-8 mb-4 cursor-pointer hover:text-[#D5292B]">
            <img
              src="/src/app/assets/admindash.png"
              alt="Admin Dashboard"
              className="mr-2"
            />
            <span>Admin Dashboard</span>
          </div>
        </div>
      </div>
      <div className="w-64 p-5">
        <div className="flex items-center justify-between p-4">
          <span className="text-sm whitespace-nowrap">MY PROJECT STATUS</span>
          <img
            src={addsquare}
            alt="Add"
            className="h-6 w-6 object-contain ml-4"
          />
        </div>
        <div>
          {statuses.map((status) => (
            <p 
              key={status._id} 
              className="flex items-center ml-8 mb-4 cursor-pointer relative hover:text-[#D5292B]"
              onMouseEnter={() => setHoveredStatus(status.projectStatus)}
              onMouseLeave={() => setHoveredStatus(null)}
              onClick={() => handleStatusClick(status.projectStatus)}
            >
              <span
                className="inline-block w-4 h-4 rounded-full mr-5 mt-1.5"
                style={{ backgroundColor: statusColors[status.projectStatus] || "#CCCCCC" }}
              />
              {status.projectStatus}
              {hoveredStatus === status.projectStatus && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1.5 rounded text-xs whitespace-nowrap z-10">
                  {`View projects with status ${status.projectStatus}`}
                </div>
              )}
            </p>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
