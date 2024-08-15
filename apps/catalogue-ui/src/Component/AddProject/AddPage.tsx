import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addProject, getStatuses, getMembers } from '../../api/projects';
import { useNavigate } from 'react-router-dom';
import { Member } from '../ProjectInterface';

interface FormData {
  projectName: string;
  startDate?: string;
  gitHubLinks: string;
  technology: string;
  resources: string;
  projectStatus: string;
  projectManager: string;
  description: string;
  progressPercent: number;
  demoURL: string;
  completionDate?: string;
}

interface Status {
  _id: string;
  projectStatus: string;
}

const AddPage: React.FC = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const fetchedStatuses = await getStatuses();
        setStatuses(fetchedStatuses);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    const fetchMembers = async () => {
      try {
        const fetchedMembers = await getMembers();
        setMembers(fetchedMembers);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchStatuses();
    fetchMembers();
  }, []);

  const handleMemberSelection = (memberId: string) => {
    setSelectedMembers(prevSelected => 
      prevSelected.includes(memberId)
        ? prevSelected.filter(id => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const newProject = {
        projectName: data.projectName,
        startDate: data.startDate,
        gitHubLinks: data.gitHubLinks,
        technology: data.technology.split(',').map((tech) => tech.trim()),
        resources: data.resources.split(',').map((resource) => resource.trim()),
        projectStatus: data.projectStatus,
        projectManager: data.projectManager,
        members: selectedMembers,
        description: data.description,
        progressPercent: Number(data.progressPercent),
        demoURL: data.demoURL,
        completionDate: data.completionDate,
      };
      await addProject(newProject);
      reset();
      setSelectedMembers([]);
      navigate('/home');
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="ml-64 mt-6">
      <h1 className="ml-5 text-[#2C4B84] text-[35px] p-2">Add Project</h1>
      <div className="overflow-auto h-[calc(100vh-200px)] w-[calc(100%-36px)]">
        <div className="AddPage">
          <div className="flex items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-gray-100 p-8 rounded-lg ml-7 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Project Name Field */}
                <div className="mb-4">
                  <label
                    htmlFor="projectName"
                    className="text-lg block text-gray-700 font-bold mb-2"
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    placeholder="Enter project name"
                    {...register('projectName', {
                      required: 'Project Name is required',
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                      errors.projectName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.projectName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.projectName.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="projectManager"
                    className="text-lg block text-gray-700 font-bold mb-2"
                  >
                    Project Manager
                  </label>
                  <input
                    type="text"
                    id="projectManager"
                    placeholder="Enter project name"
                    {...register('projectManager', {
                      required: 'Project Manager is required',
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                      errors.projectManager ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.projectManager && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.projectManager.message}
                    </p>
                  )}
                </div>

                {/* Start Date Field */}
                <div className="mb-4">
                  <label
                    htmlFor="startDate"
                    className="text-lg block text-gray-700 font-bold mb-2"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    placeholder="Enter start date"
                    {...register('startDate', {
                      required: 'Start Date is required',
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                      errors.startDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                {/* GitHub Links Field */}
                <div className="mb-4">
                  <label
                    htmlFor="gitHubLinks"
                    className="text-lg block text-gray-700 font-bold mb-2"
                  >
                    GitHub Links
                  </label>
                  <input
                    type="text"
                    id="gitHubLinks"
                    placeholder="Enter GitHub links (comma separated)"
                    {...register('gitHubLinks', {
                      required: 'GitHub Links are required',
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                      errors.gitHubLinks ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.gitHubLinks && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.gitHubLinks.message}
                    </p>
                  )}
                </div>

                {/* Technology Field */}
                <div className="mb-4">
                  <label
                    htmlFor="technology"
                    className="text-lg block text-gray-700 font-bold mb-2"
                  >
                    Technology
                  </label>
                  <input
                    type="text"
                    id="technology"
                    placeholder="Enter technologies (comma separated)"
                    {...register('technology', {
                      required: 'Technology is required',
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                      errors.technology ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.technology && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.technology.message}
                    </p>
                  )}
                </div>

                {/* Resources Field */}
                <div className="mb-4">
                  <label
                    htmlFor="resources"
                    className="text-lg block text-gray-700 font-bold mb-2"
                  >
                    Resources
                  </label>
                  <input
                    type="text"
                    id="resources"
                    placeholder="Enter resources (comma separated)"
                    {...register('resources', {
                      required: 'Resources are required',
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                      errors.resources ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.resources && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.resources.message}
                    </p>
                  )}
                </div>

                {/* Members Field */}
                <div className="mb-4 col-span-1">
                  <label
                    htmlFor="members"
                    className="text-lg block text-gray-700 font-bold mb-2"
                  >
                    Members
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="members"
                      placeholder={selectedMembers.length > 0 
                        ? `${selectedMembers.length} member(s) selected`
                        : 'Select members'}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline text-left bg-white"
                      readOnly
                      onClick={() => setIsOpen(!isOpen)}
                    />
                    {isOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                        {members.map(member => (
                          <div
                            key={member._id}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => handleMemberSelection(member._id)}
                          >
                            <input
                              type="checkbox"
                              checked={selectedMembers.includes(member._id)}
                              onChange={() => {}}
                              className="mr-2"
                            />
                            {member.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Status Field */}
                <div className="mb-4">
                  <label
                    htmlFor="projectStatus"
                    className="text-lg block text-gray-700 font-bold mb-2"
                  >
                    Project Status
                  </label>
                  <select
                    id="projectStatus"
                    {...register('projectStatus', {
                      required: 'Project Status is required',
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                      errors.projectStatus ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select status</option>
                    {statuses.map((status) => (
                      <option key={status._id} value={status.projectStatus}>
                        {status.projectStatus}
                      </option>
                    ))}
                  </select>
                  {errors.projectStatus && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.projectStatus.message}
                    </p>
                  )}
                </div>

                {/* Description Field */}
                <div className="mb-4 col-span-2">
                  <label
                    htmlFor="description"
                    className="text-lg block text-gray-700 font-bold mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter project description"
                    {...register('description', {
                      required: 'Description is required',
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Progress Percent Field */}
                <div className="mb-4">
                  <label
                    htmlFor="progressPercent"
                    className="text-lg block text-gray-700 font-bold mb-2"
                  >
                    Progress Percent
                  </label>
                  <input
                    type="number"
                    id="progressPercent"
                    placeholder="Enter progress percentage"
                    {...register('progressPercent', {
                      required: 'Progress Percent is required',
                      min: { value: 0, message: 'Minimum value is 0' },
                      max: { value: 100, message: 'Maximum value is 100' },
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                      errors.progressPercent ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.progressPercent && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.progressPercent.message}
                    </p>
                  )}
                </div>

                {/* Demo URL Field */}
                <div className="mb-4">
                  <label
                    htmlFor="demoURL"
                    className="text-lg block text-gray-700 font-bold mb-2"
                  >
                    Demo URL
                  </label>
                  <input
                    type="url"
                    id="demoURL"
                    placeholder="Enter demo URL"
                    {...register('demoURL', {
                      required: 'Demo URL is required',
                      pattern: {
                        value: /^(ftp|http|https):\/\/[^ "]+$/,
                        message: 'Enter a valid URL',
                      },
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                      errors.demoURL ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.demoURL && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.demoURL.message}
                    </p>
                  )}
                </div>

                {/* Completion Date Field */}
                <div className="mb-4">
                  <label
                    htmlFor="completionDate"
                    className="text-lg block text-gray-700 font-bold mb-2"
                  >
                    Completion Date
                  </label>
                  <input
                    type="date"
                    id="completionDate"
                    placeholder="Enter completion date"
                    {...register('completionDate')}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                      errors.completionDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.completionDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.completionDate.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex justify-start mt-4 space-x-4">
                <button
                  type="submit"
                  className="text-lg bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-lg bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default AddPage;