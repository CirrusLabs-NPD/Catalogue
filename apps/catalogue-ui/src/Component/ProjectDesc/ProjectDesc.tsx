import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Project } from '../ProjectInterface';
import { getProjectById, deleteProject, updateProject } from '../../api/projects';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProjectById(id);
        setProject(projectData);
        setEditedProject(projectData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError('Failed to load project');
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProject(project);
  };

  const handleSave = async () => {
    try {
      const updatedProject = await updateProject(id!, editedProject!);
      setProject(updatedProject);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update project:', err);
      setError('Failed to update project');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id!);
        navigate('/projects');
      } catch (err) {
        console.error('Failed to delete project:', err);
        setError('Failed to delete project');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'progressPercent'){
      setEditedProject(prev => ({ ...prev!, [name]: parseInt(value)}))
    } else {
      setEditedProject(prev => ({ ...prev!, [name]: value }));
    }
  };

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Project) => {
    const { value } = e.target;
    setEditedProject(prev => ({ ...prev!, [field]: value.split(',').map(item => item.trim()) }));
  };

  if (loading) {
    return <div className="ml-64 mt-6 h-full overflow-y-scroll"><h1 className="text-[#2C4B84] text-4xl py-2 pl-4 mb-5">Loading ...</h1></div>;
  }

  if (error) {
    return <div className="ml-64 mt-6 h-full overflow-y-scroll"><h1 className="text-[#2C4B84] text-4xl py-2 pl-4 mb-5">{error}</h1></div>;
  }

  if (!project) {
    return <div className="ml-64 mt-6 h-full overflow-y-scroll"><h1 className="text-[#2C4B84] text-4xl py-2 pl-4 mb-5">Project not found</h1></div>;
  }

  return (
    <div className="ml-64 mt-6 h-full overflow-y-scroll">
      <h1 className="text-[#2C4B84] text-4xl py-2 pl-4 mb-5">{isEditing ? 'Edit Project' : project.projectName}</h1>
      <div className="px-4">
        {isEditing ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="projectName">
                Project Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="projectName"
                type="text"
                name="projectName"
                value={editedProject!.projectName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                value={editedProject!.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="gitHubLinks">
                GitHub Link
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="gitHubLinks"
                type="text"
                name="gitHubLinks"
                value={editedProject!.gitHubLinks}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="demoURL">
                Demo URL
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="demoURL"
                type="text"
                name="demoURL"
                value={editedProject!.demoURL}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="technology">
                Technology (comma-separated)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="technology"
                type="text"
                name="technology"
                value={editedProject!.technology.join(', ')}
                onChange={(e) => handleArrayInputChange(e, 'technology')}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="resources">
                Resources (comma-separated)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="resources"
                type="text"
                name="resources"
                value={editedProject!.resources.join(', ')}
                onChange={(e) => handleArrayInputChange(e, 'resources')}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="startDate">
                Start Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="startDate"
                type="date"
                name="startDate"
                value={editedProject!.startDate || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="members">
                Members (comma-separated)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="members"
                type="text"
                name="members"
                value={editedProject!.members.join(', ')}
                onChange={(e) => handleArrayInputChange(e, 'members')}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="projectStatus">
                Project Status
                <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="projectStatus"
                name="projectStatus"
                value={editedProject!.projectStatus}
                onChange={handleInputChange}
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="At Risk">At Risk</option>
                <option value="Delayed">Delayed</option>
              </select>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="progressPercent">
                Progress Percentage
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="progressPercent"
                type="number"
                name="progressPercent"
                value={editedProject!.progressPercent}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="completionDate">
                Completion Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="completionDate"
                type="date"
                name="completionDate"
                value={editedProject!.completionDate || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-5 p-5 bg-white rounded-lg w-full max-w-7xl">
              <h2 className="text-2xl font-medium text-black">Description</h2>
              <p className="text-lg text-[#787486] mt-1">{project.description}</p>
            </div>
            <div className="mb-5 mt-4">
              <h2 className="text-2xl font-medium text-black">GitHub Link</h2>
              <a href={project.gitHubLinks} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                {project.gitHubLinks}
              </a>
            </div>
            <div className="mb-5 mt-4">
              <h2 className="text-2xl font-medium text-black">Website</h2>
              <a href={project.demoURL} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                {project.demoURL}
              </a>
            </div>
            <div className="mb-5 mt-4">
              <h2 className="text-2xl font-medium text-black">Technology</h2>
              <div className="flex flex-wrap gap-2">
                {project.technology.map((tech, index) => (
                  <div key={index} className="bg-gray-200 px-3 py-1 rounded-lg">
                    <p className="text-lg text-[#787486]">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-5 mt-4">
              <h2 className="text-2xl font-medium text-black">Resources</h2>
              <div className="flex flex-wrap gap-2">
                {project.resources.map((res, index) => (
                  <div key={index} className="bg-gray-200 px-3 py-1 rounded-lg">
                    <p className="text-lg text-[#787486]">{res}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-5 mt-4">
              <h2 className="text-2xl font-medium text-black">Start Date</h2>
              <p className="text-lg text-[#787486]">{project.startDate || 'N/A'}</p>
            </div>
            <div className="mb-5 mt-4">
              <h2 className="text-2xl font-medium text-black">Members</h2>
              <div className="flex flex-wrap gap-2">
                {project.members.map((member, index) => (
                  <div key={index} className="bg-gray-200 px-3 py-1 rounded-lg">
                    <p className="text-lg text-[#787486]">{member}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-5 mt-4">
              <h2 className="text-2xl font-medium text-black">Status</h2>
              <p className="text-lg text-[#787486]">{project.projectStatus}</p>
            </div>
            <div className="mb-5 mt-4">
              <h2 className="text-2xl font-medium text-black">Progress Percentage</h2>
              <p className="text-lg text-[#787486]">{project.progressPercent}%</p>
            </div>
            <div className="mb-5 mt-4">
              <h2 className="text-2xl font-medium text-black">Completion Date</h2>
              <p className="text-lg text-[#787486]">{project.completionDate || 'N/A'}</p>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
