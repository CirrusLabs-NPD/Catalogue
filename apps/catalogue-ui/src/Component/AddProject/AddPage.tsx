// AddPage.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './AddPage.css';

interface FormData {
  projectName: string;
  duration: string;
  githubLink: string;
  technology: string;
  otherTechnology: string;
  projectStatus: string;
  members: string;
  description: string;
}

const AddPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="ml-64 mt-6 h-full overflow-y-scroll">
      <div className="AddPage">
        <h1 className="home_header mb-1">Add Project</h1>
        <div className="flex items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-100 p-8 rounded-lg ml-7 w-full w-1x9 "
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

              {/* Github Link Field */}
              <div className="mb-4">
                <label
                  htmlFor="githubLink"
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
                >
                  Github Link
                </label>
                <input
                  type="url"
                  id="githubLink"
                  placeholder="Enter github link"
                  {...register('githubLink', {
                    required: 'Github Link is required',
                  })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                    errors.githubLink ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.githubLink && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.githubLink.message}
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
                  placeholder="Enter technology"
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

              {/* Other Technology Field */}
              <div className="mb-4">
                <label
                  htmlFor="otherTechnology"
                  className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
                >
                  Other Technology
                </label>
                <input
                  type="text"
                  id="otherTechnology"
                  placeholder="Enter technology"
                  {...register('otherTechnology', {
                    required: 'Other Technology is required',
                  })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                    errors.otherTechnology
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />
                {errors.otherTechnology && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.otherTechnology.message}
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
                  style={{ color: 'gray' }}
                  {...register('projectStatus', {
                    required: 'Project Status is required',
                  })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline ${
                    errors.projectStatus ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="atrisk">At Risk</option>
                  <option value="delayed">Delayed</option>
                </select>
                {errors.projectStatus && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.projectStatus.message}
                  </p>
                )}
              </div>
            </div>

            {/* Members Field */}
            <div className="mb-4">
              <label
                htmlFor="members"
                className="font-quicksand text-lg block text-gray-700 font-bold mb-2"
              >
                Members
              </label>
              <input
                type="text"
                id="members"
                placeholder="Enter members"
                {...register('members', { required: 'Members are required' })}
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

            {/* Description Field */}
            <div className="mb-4">
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

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-start mt-4 space-x-4">
              <button
                type="submit"
                className="font-quicksand text-lg  bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="font-quicksand text-lg  bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
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
