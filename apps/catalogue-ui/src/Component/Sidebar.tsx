import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "./Sidebar.css";
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
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);
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

      {/* <div className="sidebar__link"> */}
      <Link to="/home" className="sidebar__link">
            <img
              src={square}
              alt="Projects"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            <span>Projects</span>
            </Link>
          {/* </div> */}
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
              src="/src/app/assets/admindash.png"
              alt="admindash"
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            <span>Admin Dashboard</span>
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
          <p
            className="sidebar__link"
            onMouseEnter={() => setHoveredStatus("Ongoing")}
            onMouseLeave={() => setHoveredStatus(null)}
          >
            <img
              src={green}
              alt="Ongoing"
              style={{ verticalAlign: "middle", marginRight: "20px", width: "15px", height: "15px", marginTop: "6px" }}
            />
            Ongoing
            {hoveredStatus === "Ongoing" && (
              <div className="tooltip">Projects that are currently ongoing.</div>
            )}
          </p>
          <p
            className="sidebar__link"
            onMouseEnter={() => setHoveredStatus("Completed")}
            onMouseLeave={() => setHoveredStatus(null)}
          >
            <img
              src={orange}
              alt="Completed"
              style={{ verticalAlign: "middle", marginRight: "20px", width: "15px", height: "15px", marginTop: "6px" }}
            />
            Completed
            {hoveredStatus === "Completed" && (
              <div className="tooltip">Projects that are completed.</div>
            )}
          </p>
          <p
            className="sidebar__link"
            onMouseEnter={() => setHoveredStatus("Delayed")}
            onMouseLeave={() => setHoveredStatus(null)}
          >
            <img
              src={purple}
              alt="Delayed"
              style={{ verticalAlign: "middle", marginRight: "20px", width: "15px", height: "15px", marginTop: "6px" }}
            />
            Delayed
            {hoveredStatus === "Delayed" && (
              <div className="tooltip">Projects that are delayed.</div>
            )}
          </p>
          <p
            className="sidebar__link"
            onMouseEnter={() => setHoveredStatus("At Risk")}
            onMouseLeave={() => setHoveredStatus(null)}
          >
            <img
              src={blue}
              alt="At Risk"
              style={{ verticalAlign: "middle", marginRight: "20px", width: "15px", height: "15px", marginTop: "6px" }}
            />
            At Risk
            {hoveredStatus === "At Risk" && (
              <div className="tooltip">Projects that are at risk.</div>
            )}
          </p>
        </div>
      </div>
    </aside>
  );
}


export default Sidebar;