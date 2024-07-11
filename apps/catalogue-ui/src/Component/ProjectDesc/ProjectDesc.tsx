import React, { useEffect, useState } from 'react';
import './ProjectDesc.css';
import { projectData } from './projects';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  useEffect(() => {
    const appName = window.location.pathname.split('/')[2];
    const projectExists = projectData.find((e) => e.id === appName);
    if (projectExists) {
      setProject(projectExists);
    }
  }, []);

  if (!project) {
    return (
      <div className="ml-64 mt-6 h-full overflow-y-scroll">
        <h1 className="home_header mb-5">Loading ...</h1>
      </div>
    );
  }

  return (
    <div className="ml-64 mt-6 h-full overflow-y-scroll">
      <h1 className="home_header mb-5">{project.name}</h1>
      <div style={{ padding: '0 1rem' }}>
        <div className="project-info-item bg-white rounded-lg w-full max-w-7xl">
          <h2 className="project-info-heading">Description</h2>
          <p className="project-info-detail">{project.description}</p>
          {project.description1 && <p className="project-info-detail">{project.description1}</p>}
          {project.description2 && <p className="project-info-detail">{project.description2}</p>}
          {project.description3 && <p className="project-info-detail">{project.description3}</p>}
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">GitHub Links</h2>
          <div className="flex flex-col">
            {project.githubLinks.map((link, index) => (
              <a
                key={index}
                href={link}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">Website</h2>
          <a
            href={project.Web_URL}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.Web_URL}
          </a>
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">Technology</h2>
          <p className="project-info-detail">{project.technology}</p>
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">Other Technology</h2>
          <p className="project-info-detail">{project.otherTechnology}</p>
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">Duration</h2>
          <p className="project-info-detail">{project.duration}</p>
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">Members</h2>
          <div className="flex flex-wrap gap-2">
            {project.members.map((member, index) => (
              <div
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-lg"
              >
                <p className="project-info-detail">{member}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">Status</h2>
          <p className="project-info-detail">{project.status}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
