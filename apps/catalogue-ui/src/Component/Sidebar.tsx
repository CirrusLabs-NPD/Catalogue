import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import plus from "../app/assets/Plus.png";
import analytics from "../app/assets/category.png";
import square from "../app/assets/task-square.png";
import settings from "../app/assets/setting-2.png";
import addsquare from "../app/assets/add-square.png";
import { getStatuses } from '../api/projects'; // Make sure this path is correct

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
  const [statuses, setStatuses] = useState<Status[]>([]);

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

  return (
    <aside className="fixed top-18 left-0 h-full w-64">
      <div className="sidebar">
        <Link to="/addpage" className="sidebar_link">
          <button className="sidebar__button">
            <img
              src={plus}
              alt="Logo"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            <span style={{ verticalAlign: "middle" }}>Add Project</span>
          </button>
        </Link>

        <Link to="/home" className="sidebar__link">
          <img
            src={square}
            alt="Projects"
            style={{ verticalAlign: "middle", marginRight: "8px" }}
          />
          <span>Projects</span>
        </Link>

        <div className="sidebar__links">
          <Link to="/analytics" className="sidebar__link">
            <img
              src={analytics}
              alt="Analytics"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            <span>Analytics</span>
          </Link>
         
          <div className="sidebar__link">
            <img
              src={settings}
              alt="Settings"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            <span>Settings</span>
          </div>
        </div>
      </div>
      <div className="sidebar">
        <p className="sidebar__button2">
           <div className="project_status flex items-center justify-between p-4">
             <span className="text-sm whitespace-nowrap">MY PROJECT STATUS</span>
             <img
               src={addsquare}
               alt="Add"
               className="h-6 w-6 object-contain ml-4"
             />
           </div>
        </p>
        <div className="sidebar__links1">
          {statuses.map((status) => (
            <p key={status._id} className="sidebar__link">
              <span
                style={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  backgroundColor: statusColors[status.projectStatus] || "#CCCCCC",
                  marginRight: "20px",
                  marginTop: "6px",
                  verticalAlign: "middle"
                }}
              />
              {status.projectStatus}
            </p>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;