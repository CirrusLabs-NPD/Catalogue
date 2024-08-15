import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProject, getProjects, cancelDeleteProject } from '../api/projects';
import { Project } from './ProjectInterface';

const ProjectSearch: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getProjects();
        setProjects(projectData);
        setFilteredProjects(projectData);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects');
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const results = projects.filter(project =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm, projects]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const updatedProject = await deleteProject(id); // Update the project's status to "Awaiting Deletion"
        setProjects(prevProjects => prevProjects.map(project => project._id === id ? updatedProject : project));
        setFilteredProjects(prevProjects => prevProjects.map(project => project._id === id ? updatedProject : project));
      } catch (err) {
        console.error('Failed to delete project:', err);
        setError('Failed to delete project');
      }
    }
  };

  const handleCancelDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel the deletion of this project?')) {
      try {
        const updatedProject = await cancelDeleteProject(id);
        setProjects(prevProjects => prevProjects.map(project => project._id === id ? updatedProject : project));
        setFilteredProjects(prevProjects => prevProjects.map(project => project._id === id ? updatedProject : project));
      } catch (err) {
        console.error('Failed to cancel project deletion:', err);
        setError('Failed to cancel project deletion');
      }
    }
  };

  return (
    <div className="ml-64 mt-6 h-full overflow-y-scroll">
      <h1 className="home_header mb-5">Manage Projects</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Search projects by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredProjects.length === 0 ? (
          <div>No projects found</div>
        ) : (
          filteredProjects.map(project => (
            <div key={project._id} className="project-info-item bg-white rounded-lg p-4 shadow">
              <h2 className="text-xl font-bold">{project.projectName}</h2>
              <p className="text-gray-600">{project.description}</p>

              <div className="mt-4 flex space-x-4">
                <Link
                  to={`/description/${project._id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  View
                </Link>
                <button
                  className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${project.projectStatus === 'Awaiting Deletion' ? 'bg-gray-500 hover:bg-gray-700' : 'bg-red-500 hover:bg-red-700 text-white'}`}
                  onClick={() => handleDelete(project._id)}
                  disabled={project.projectStatus === 'Awaiting Deletion'}
                >
                  {project.projectStatus === 'Awaiting Deletion' ? 'Awaiting Deletion' : 'Delete'}
                </button>
                {project.projectStatus === 'Awaiting Deletion' && (
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleCancelDelete(project._id)}
                  >
                    Cancel Deletion
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectSearch;
