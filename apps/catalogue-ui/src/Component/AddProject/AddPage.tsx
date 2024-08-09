import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './AddPage.css';
import { addProject, getStatuses } from '../../api/projects';
import { useNavigate } from 'react-router-dom';

interface FormData {
  projectName: string;
  duration: string;
  gitHubLinks: string;
  technology: string;
  resources: string;
  projectStatus: string;
  members: string;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const fetchedStatuses = await getStatuses();
        setStatuses(fetchedStatuses);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const newProject = {
        projectName: data.projectName,
        duration: data.duration,
        gitHubLinks: data.gitHubLinks,
        technology: data.technology.split(',').map((tech) => tech.trim()),
        resources: data.resources.split(',').map((resource) => resource.trim()),
        projectStatus: data.projectStatus,
        members: data.members.split(',').map((member) => member.trim()),
        description: data.description,
        progressPercent: Number(data.progressPercent),
        demoURL: data.demoURL,
        completionDate: data.completionDate,
      };
      await addProject(newProject);
      reset();
      navigate('/home');
    } catch (error) {
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="ml-64 mt-6 h-[calc(100%-100px)] overflow-y-scroll">
      <div className="AddPage">
        <h1 className="home_header mb-1">Add Project</h1>
        <div className="flex items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-100 p-8 rounded-lg ml-7 w-full w-1x9"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="projectName"
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
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

              {/* Duration Field */}
              <div className="mb-4">
                <label
                  htmlFor="duration"
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
                >
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  placeholder="Enter duration"
                  {...register('duration', {
                    required: 'Duration is required',
                  })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                    errors.duration ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              {/* GitHub Links Field */}
              <div className="mb-4">
                <label
                  htmlFor="gitHubLinks"
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
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
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
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
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
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
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
                >
                  Members
                </label>
                <input
                  type="text"
                  id="members"
                  placeholder="Enter members (comma separated)"
                  {...register('members', {
                    required: 'Members are required',
                  })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                    errors.members ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.members && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.members.message}
                  </p>
                )}
              </div>

              {/* Project Status Field */}
              <div className="mb-4">
                <label
                  htmlFor="projectStatus"
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
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
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
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
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
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
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
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
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
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
                className="font-quicksand text-lg bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="font-quicksand text-lg bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
