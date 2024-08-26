import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProject, getProjects, cancelDeleteProject } from '../api/projects';
import { Project } from './ProjectInterface';

const ProjectSearch: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectData = await getProjects();
        setProjects(projectData);
        setFilteredProjects(projectData);
      } catch (err) {
        handleError('Failed to load projects', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    setFilteredProjects(
      projects.filter(project =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, projects]);

  const handleError = (message: string, err: any) => {
    console.error(message, err);
    setError(message);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        setProjects(prev => 
          prev.map(project =>
            project._id === id ? { ...project, projectStatus: 'Awaiting Deletion' } : project
          )
        );
      } catch (err) {
        handleError('Failed to delete project', err);
      }
    }
  };

  const handleCancelDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel the deletion of this project?')) {
      try {
        const updatedProject = await cancelDeleteProject(id);
        setProjects(prev => 
          prev.map(project =>
            project._id === id ? updatedProject : project
          )
        );
      } catch (err) {
        handleError('Failed to cancel project deletion', err);
      }
    }
  };

  return (
    <div className="flex-1 ml-64 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Manage Projects</h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <div className="mb-8">
          <input
            type="text"
            className="w-full p-4 text-lg text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Search projects by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-6 text-xl text-gray-600">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 text-xl text-gray-600">No projects found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-[calc(100vh-300px)] pb-8">
            {filteredProjects.map(project => (
              <div key={project._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 text-blue-900">{project.projectName}</h2>
                  <p className="text-gray-600 mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/description/${project._id}`}
                      className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out text-center"
                    >
                      View
                    </Link>
                    <button
                      className={`flex-1 font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out ${
                        project.projectStatus === 'Awaiting Deletion'
                          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-700 text-white focus:ring-red-500'
                      }`}
                      onClick={() => handleDelete(project._id)}
                      disabled={project.projectStatus === 'Awaiting Deletion'}
                    >
                      {project.projectStatus === 'Awaiting Deletion' ? 'Awaiting Deletion' : 'Delete'}
                    </button>
                    {project.projectStatus === 'Awaiting Deletion' && (
                      <button
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
                        onClick={() => handleCancelDelete(project._id)}
                      >
                        Cancel Deletion
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSearch;
