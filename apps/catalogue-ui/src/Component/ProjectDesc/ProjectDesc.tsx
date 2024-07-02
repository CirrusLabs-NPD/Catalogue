import React, { useEffect, useState } from 'react';
import './ProjectDesc.css';
import { projectData } from './projects';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  useEffect(() => {
    const appName = window.location.pathname.split('/')[2];
    const projectExists = projectData.filter((e) => e.id == appName);
    if (projectExists && projectExists.length > 0) {
      setProject(projectExists[0]);
    }
  }, []);
  if (!project) {
    return (
      <div className="ml-64 mt-6 h-full overflow-y-scroll">
        <h1 className="home_header mb-5 ">Loading ...</h1>
      </div>
    );
  }
  return (
    <div className="ml-64 mt-6 h-full overflow-y-scroll">
      <h1 className="home_header mb-5 ">{project.name}</h1>
      <div style={{ padding: '0 1rem 0 1rem' }}>
        <div className="project-info-item bg-white rounded-lg w-full max-w-7xl">
          <h2 className="project-info-heading">Description</h2>
          <p className="project-info-detail">{project.description}</p>
          <p className="project-info-detail">{project.description1}</p>
          <p className="project-info-detail">{project.description2}</p>
          <p className="project-info-detail">{project.description3}</p>
        </div>
        <div className="project-info-item ">
          <h2 className="project-info-heading">GitHub Links</h2>
          {project.githubLinks.map((link, index) => (
            <p key={index} className="project-info-detail">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </p>
          ))}
        </div>
        <div className="project-info-item ">
          <h2 className="project-info-heading">Technology</h2>
          <p className="project-info-detail">{project.technology}</p>
        </div>
        <div className="project-info-item ">
          <h2 className="project-info-heading">Other Technology</h2>
          <p className="project-info-detail">{project.otherTechnology}</p>
        </div>
        <div className="project-info-item ">
          <h2 className="project-info-heading">Duration</h2>
          <p className="project-info-detail">{project.duration}</p>
        </div>
        <div className="project-info-item ">
          <h2 className="project-info-heading">Members</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              width: '500px',
            }}
          >
            {project.members.map((member, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: '0.5rem',
                  borderRadius: '10px',
                  minWidth: '100px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '1rem',
                }}
              >
                {' '}
                <p className="project-info-detail">{member}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="project-info-item ">
          <h2 className="project-info-heading">Status</h2>
          <p className="project-info-detail">{project.status}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
