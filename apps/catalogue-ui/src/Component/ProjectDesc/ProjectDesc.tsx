import React, { useEffect, useState } from 'react';
import './ProjectDesc.css';
import { projectData } from './projects';
import { useParams } from 'react-router-dom';
import { Project } from '../ProjectInterface';
import { getProjectById } from '../../api/projects';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProjectById(id);
        setProject(projectData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError('Failed to load project');
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="ml-64 mt-6 h-full overflow-y-scroll">
        <h1 className="home_header mb-5">Loading ...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-64 mt-6 h-full overflow-y-scroll">
        <h1 className="home_header mb-5">{error}</h1>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="ml-64 mt-6 h-full overflow-y-scroll">
        <h1 className="home_header mb-5">Project not found</h1>
      </div>
    );
  }

  return (
    <div className="ml-64 mt-6 h-full overflow-y-scroll">
      <h1 className="home_header mb-5">{project.projectName}</h1>
      <div style={{ padding: '0 1rem' }}>
        <div className="project-info-item bg-white rounded-lg w-full max-w-7xl">
          <h2 className="project-info-heading">Description</h2>
          <p className="project-info-detail">{project.description}</p>
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">GitHub Link</h2>
          <a
            href={project.gitHubLinks}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.gitHubLinks}
          </a>
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">Website</h2>
          <a
            href={project.demoURL}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.demoURL}
          </a>
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">Technology</h2>
          <div className="flex flex-wrap gap-2">
            {project.technology.map((tech, index) => (
              <div
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-lg"
              >
                <p className="project-info-detail">{tech}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">Resources</h2>
          <div className="flex flex-wrap gap-2">
            {project.resources.map((res, index) => (
              <div
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-lg"
              >
                <p className="project-info-detail">{res}</p>
              </div>
            ))}
          </div>
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
          <p className="project-info-detail">{project.projectStatus}</p>
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">Progress Percentage</h2>
          <p className="project-info-detail">{project.progressPercent}</p>
        </div>
        <div className="project-info-item mt-4">
          <h2 className="project-info-heading">Completion Date</h2>
          <p className="project-info-detail">{project.completionDate || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
