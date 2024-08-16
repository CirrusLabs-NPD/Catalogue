import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Project, Member } from '../ProjectInterface';
import { getProjectById, formatDate, updateProject, getMembers } from '../../api/projects';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | null>(null);
  const [allMembers, setAllMembers] = useState<Member[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProjectById(id);
        setProject(projectData);
        setEditedProject(projectData);
        const membersData = await getMembers();
        setAllMembers(membersData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };
  
    fetchData()
  }, [id]);

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProject(project);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const projectToUpdate = {
        ...editedProject!,
        membersId: editedProject!.members.map(m => m._id)
      };
      const updatedProject = await updateProject(id!, projectToUpdate);
      setProject(updatedProject);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update project:', err);
      setError('Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProject(prev => ({ ...prev!, [name]: name === 'progressPercent' ? parseInt(value) : value }));
  };

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Project) => {
    const { value } = e.target;
    setEditedProject(prev => ({ ...prev!, [field]: value.split(',').map(item => item.trim()) }));
  };

  const handleRemoveMember = (index: number) => {
    setEditedProject(prev => ({
      ...prev!,
      members: prev!.members.filter((_, i) => i !== index)
    }));
  };
  
  const handleAddMember = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const memberId = e.target.value;
    const memberToAdd = allMembers.find(m => m._id === memberId);
    if (memberToAdd) {
      setEditedProject(prev => ({
        ...prev!,
        members: [...prev!.members, memberToAdd]
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!project) {
    return <div className="text-center text-2xl text-gray-600">Project not found</div>;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <main className="h-full bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                {isEditing ? 'Edit Project' : project.projectName}
              </h1>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {isEditing ? (
                  <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="projectName" className="block text-lg font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  id="projectName"
                  value={editedProject!.projectName}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-lg border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="projectManager" className="block text-lg font-medium text-gray-700 mb-2">
                  Project Manager
                </label>
                <input
                  type="text"
                  name="projectManager"
                  id="projectManager"
                  value={editedProject!.projectManager}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-lg border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={editedProject!.description}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-lg border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="gitHubLinks" className="block text-lg font-medium text-gray-700 mb-2">
                  GitHub Link
                </label>
                <input
                  type="text"
                  name="gitHubLinks"
                  id="gitHubLinks"
                  value={editedProject!.gitHubLinks}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-lg border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="demoURL" className="block text-lg font-medium text-gray-700 mb-2">
                  Demo URL
                </label>
                <input
                  type="text"
                  name="demoURL"
                  id="demoURL"
                  value={editedProject!.demoURL}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-lg border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="technology" className="block text-lg font-medium text-gray-700 mb-2">
                  Technology (comma-separated)
                </label>
                <input
                  type="text"
                  name="technology"
                  id="technology"
                  value={editedProject!.technology.join(', ')}
                  onChange={(e) => handleArrayInputChange(e, 'technology')}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-lg border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="resources" className="block text-lg font-medium text-gray-700 mb-2">
                  Resources (comma-separated)
                </label>
                <input
                  type="text"
                  name="resources"
                  id="resources"
                  value={editedProject!.resources.join(', ')}
                  onChange={(e) => handleArrayInputChange(e, 'resources')}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-lg border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="startDate" className="block text-lg font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={editedProject!.startDate ? editedProject!.startDate.split('T')[0] : ''}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-lg border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="projectStatus" className="block text-lg font-medium text-gray-700 mb-2">
                  Project Status
                </label>
                <select
                  id="projectStatus"
                  name="projectStatus"
                  value={editedProject!.projectStatus}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-lg border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </div>
              <div>
                <label htmlFor="progressPercent" className="block text-lg font-medium text-gray-700 mb-2">
                  Progress Percentage
                </label>
                <input
                  type="number"
                  name="progressPercent"
                  id="progressPercent"
                  value={editedProject!.progressPercent}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-lg border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="completionDate" className="block text-lg font-medium text-gray-700 mb-2">
                  Completion Date
                </label>
                <input
                  type="date"
                  name="completionDate"
                  id="completionDate"
                  value={editedProject!.completionDate ? editedProject!.completionDate.split('T')[0] : ''}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm text-lg border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label htmlFor="members" className="block text-lg font-medium text-gray-700 mb-3">
                Members
              </label>
              <div className="mt-2 space-y-3 max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-md">
                {editedProject!.members.map((member, index) => (
                  <div key={member._id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                    <span className="text-base text-gray-700">{member.name} ({member.email})</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="text-red-600 hover:text-red-800 text-base font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <select
                onChange={handleAddMember}
                className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                <option value="">Add a member</option>
                {allMembers
                  .filter(member => !editedProject!.members.some(m => m._id === member._id))
                  .map(member => (
                    <option key={member._id} value={member._id}>
                      {member.name} ({member.email})
                    </option>
                  ))}
              </select>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
          <div className="px-6 py-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-lg font-medium text-gray-700 mb-2">Description</dt>
                <dd className="mt-1 text-base text-gray-900">{project.description}</dd>
              </div>
              <div>
                <dt className="text-xl font-medium text-gray-700 mb-2">Project Manager</dt>
                <dd className="mt-1 text-lg text-gray-900">{project.projectManager}</dd>
              </div>
              <div>
                <dt className="text-xl font-medium text-gray-700 mb-2">GitHub Link</dt>
                <dd className="mt-1 text-lg text-gray-900">
                  <a href={project.gitHubLinks} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {project.gitHubLinks}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xl font-medium text-gray-700 mb-2">Website</dt>
                <dd className="mt-1 text-lg text-gray-900">
                  <a href={project.demoURL} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {project.demoURL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xl font-medium text-gray-700 mb-2">Technology</dt>
                <dd className="mt-1 text-lg text-gray-900">
                  <div className="flex flex-wrap gap-3">
                    {project.technology.map((tech, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium bg-blue-100 text-blue-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
              <div>
                <dt className="text-xl font-medium text-gray-700 mb-2">Resources</dt>
                <dd className="mt-1 text-lg text-gray-900">
                  <div className="flex flex-wrap gap-3">
                    {project.resources.map((resource, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium bg-green-100 text-green-800">
                        {resource}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
              <div>
                <dt className="text-xl font-medium text-gray-700 mb-2">Start Date</dt>
                <dd className="mt-1 text-lg text-gray-900">{formatDate(project.startDate) || 'N/A'}</dd>
              </div>
              <div>
                <dt className="text-xl font-medium text-gray-700 mb-2">Members</dt>
                <dd className="mt-1 text-lg text-gray-900">
                  <div className="flex flex-wrap gap-3">
                    {project.members.map((member) => (
                      <span key={member._id} className="inline-flex flex-col items-center px-3 py-2 rounded-lg text-base font-medium bg-gray-100 text-gray-800">
                        <span>{member.name}</span>
                        <span className="text-sm text-gray-600">{member.email}</span>
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
              <div>
                <dt className="text-xl font-medium text-gray-700 mb-3">Status</dt>
                <dd className="mt-1 text-lg text-gray-900">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-base font-medium ${
                    project.projectStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.projectStatus === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                    project.projectStatus === 'At Risk' ? 'bg-oranges-100 text-orange-800' :
                    project.projectStatus === 'Awaiting Deletion' ? 'bg-red-100 text-red-800' :
                    project.projectStatus === 'Delayed' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {project.projectStatus}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xl font-medium text-gray-700 mb-2">Progress</dt>
                <dd className="mt-1 text-lg text-gray-900">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${project.progressPercent}%` }}></div>
                  </div>
                  <span className="text-base text-gray-700 mt-2">{project.progressPercent}%</span>
                </dd>
              </div>
              <div>
                <dt className="text-xl font-medium text-gray-700 mb-2">Completion Date</dt>
                <dd className="mt-1 text-lg text-gray-900">{formatDate(project.completionDate) || 'N/A'}</dd>
              </div>
            </dl>
            <div className="mt-8 text-center">
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Project
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  </main>
</div>
</div>
);
}

export default ProjectDetails;
