import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProject, getProjects, updateProjectStatus } from '../api/projects'; // Make sure to import updateProjectStatus
import { Project } from './ProjectInterface';

const ProjectSearch: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApprovedProjects, setFilteredApprovedProjects] = useState<Project[]>([]);
  const [filteredRejectedProjects, setFilteredRejectedProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectData = await getProjects();
        setProjects(projectData);
        filterProjects(projectData);
      } catch (err) {
        handleError('Failed to load projects', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filterProjects = (projects: Project[]) => {
    const approved = projects.filter(project => project.demoURL === 'Approved');
    const rejected = projects.filter(project => project.demoURL === 'Rejected');
    
    setFilteredApprovedProjects(approved);
    setFilteredRejectedProjects(rejected);
  };

  useEffect(() => {
    filterProjects(projects);
  }, [searchTerm, projects]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredApprovedProjects(prev =>
        prev.filter(project =>
          project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredRejectedProjects(prev =>
        prev.filter(project =>
          project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      filterProjects(projects);
    }
  }, [searchTerm]);

  const handleError = (message: string, err: any) => {
    console.error(message, err);
    setError(message);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        setProjects(prev => prev.filter(project => project._id !== id));
        filterProjects(projects.filter(project => project._id !== id));
      } catch (err) {
        handleError('Failed to delete project', err);
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Approved' ? 'Rejected' : 'Approved';
    if (window.confirm(`Are you sure you want to mark this project as ${newStatus}?`)) {
      try {
        await updateProjectStatus(id, newStatus); 
        setProjects(prev => 
          prev.map(project => 
            project._id === id ? { ...project, demoURL: newStatus } : project
          )
        );
        filterProjects(projects); 
      } catch (err) {
        handleError(`Failed to change project status to ${newStatus}`, err);
      }
    }
  };

  return (
    <div className="flex-1 ml-64 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">Manage Projects</h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 mb-8 rounded text-lg" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <div className="mb-8">
          <input
            type="text"
            className="w-full p-4 text-xl text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Search projects by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-6 text-2xl text-gray-600">Loading projects...</p>
          </div>
        ) : (
          <>
            {/* Approved Projects Section */}
            <h2 className="text-2xl font-bold mb-4 text-green-800">Approved Projects</h2>
            {filteredApprovedProjects.length === 0 ? (
              <div className="text-center py-12 text-gray-600">No approved projects found</div>
            ) : (
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg text-lg">
                  <thead>
                    <tr className="bg-green-100 text-gray-700 text-left text-base leading-normal">
                      <th className="py-3 px-6 font-bold">Project Name</th>
                      <th className="py-3 px-6 font-bold">Status</th>
                      <th className="py-3 px-6 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {filteredApprovedProjects.map(project => (
                      <tr key={project._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out">
                        <td className="py-3 px-6">{project.projectName}</td>
                        <td className="py-3 px-6">
                          <span className={`px-2 py-1 rounded text-sm font-bold bg-green-100 text-green-600`}>
                            {project.projectStatus}
                          </span>
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex gap-3">
                            <Link
                              to={`/description/${project._id}`}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out text-lg"
                            >
                              View 
                            </Link>
                            <button
                              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out text-lg"
                              onClick={() => handleToggleStatus(project._id, project.demoURL)}
                            >
                              Reject
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out text-lg"
                              onClick={() => handleDelete(project._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Rejected Projects Section */}
            <h2 className="text-2xl font-bold mb-4 text-red-800">Rejected Projects</h2>
            {filteredRejectedProjects.length === 0 ? (
              <div className="text-center py-12 text-gray-600">No rejected projects found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg text-lg">
                  <thead>
                    <tr className="bg-red-100 text-gray-700 text-left text-base leading-normal">
                      <th className="py-3 px-6 font-bold">Project Name</th>
                      <th className="py-3 px-6 font-bold">Status</th>
                      <th className="py-3 px-6 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {filteredRejectedProjects.map(project => (
                      <tr key={project._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out">
                        <td className="py-3 px-6">{project.projectName}</td>
                        <td className="py-3 px-6">
                          <span className={`px-2 py-1 rounded text-sm font-bold bg-red-100 text-red-600`}>
                            {project.projectStatus}
                          </span>
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex gap-3">
                            <Link
                              to={`/description/${project._id}`}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out text-lg"
                            >
                              View 
                            </Link>
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out text-lg"
                              onClick={() => handleToggleStatus(project._id, project.demoURL)}
                            >
                              Approve
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out text-lg"
                              onClick={() => handleDelete(project._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectSearch;
