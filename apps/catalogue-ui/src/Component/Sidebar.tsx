import React from "react";
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
  return (
    <div>
    <div className="sidebar">
      <button className="sidebar__button">
        <img
          src={plus}
          alt="Logo"
          style={{ verticalAlign: "middle", marginRight: "8px" }}
        />
        <span style={{ verticalAlign: "middle" }}>Add Project</span>
      </button>
      <div className="sidebar__links">
      <div className="sidebar__link">
        {/* <p className="sidebar__link"> */}
          {" "}
          <img
            src={analytics}
            alt="Logo"
            style={{ verticalAlign: "middle", marginRight: "8px" }}
          />{" "}
           <span>Analytics</span>
           </div>
        {/* </p> */}
        <p className="sidebar__link">
          {" "}
          <img
            src={square}
            alt="Logo"
            style={{ verticalAlign: "middle", marginRight: "8px" }}
          />
          Projects
        </p>
        <p className="sidebar__link">
          {" "}
          <img
            src={settings}
            alt="Logo"
            style={{ verticalAlign: "middle", marginRight: "8px" }}
          />
          Settings
        </p>
      </div>
    </div>
    <div>
    <div className="sidebar">
      <p className="sidebar__button2">
        <div className="project_status">
        <span>
        <span style={{ verticalAlign: "middle" }}>MY PROJECT STATUS</span>
        
        <img
          src={addsquare}
          alt="Logo"
          style={{ verticalAlign: "middle", marginLeft: "40px" }}
        />
        </span>
        </div>
      </p>
      <div className="sidebar__links1">
        <p className="sidebar__link">
          {" "}
          <img
            src={green}
            alt="Logo"
            style={{ verticalAlign: "middle", marginRight: "20px" }}
          />{" "}
          Ongoing
        </p>
        <p className="sidebar__link">
          {" "}
          <img
            src={orange}
            alt="Logo"
            style={{ verticalAlign: "middle", marginRight: "20px" }}
          />
          Completed
        </p>
        <p className="sidebar__link">
          {" "}
          <img
            src={purple}
            alt="Logo"
            style={{ verticalAlign: "middle", marginRight: "20px" }}
          />
          Delayed
        </p>
        <p className="sidebar__link">
          {" "}
          <img
            src={blue}
            alt="Logo"
            style={{ verticalAlign: "middle", marginRight: "20px" }}
          />
          At Risk
        </p>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Sidebar;
