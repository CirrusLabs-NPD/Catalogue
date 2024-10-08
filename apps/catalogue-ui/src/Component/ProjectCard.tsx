import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from './ProjectInterface';
import { formatDate } from '../api/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const colors = [
  'bg-gray-100',
  'bg-red-200',
  'bg-blue-200',
  'bg-gray-100',
  'bg-red-200',
  'bg-blue-200',
];

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      to={`/description/${project._id}`}
      className="block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4"
    >
      <div className={`flex flex-col h-full ${colors[index % colors.length]} border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300`}>
        <div className="p-6 flex-grow flex flex-col">
          {/* Project Name */}
          <h2 className="cirrHeading text-[#5B4BA7] text-xl font-semibold mb-3 line-clamp-2 flex-shrink-0">
            {project.projectName}
          </h2>
          
          {/* Start Date */}
          <p className="text-[#0D062D] text-sm mb-2 flex-shrink-0">
            Start Date: {formatDate(project.startDate)}
          </p>
          
          {/* Project Status */}
          <p className="text-[#0D062D] text-sm mb-4 flex-shrink-0">
            Status: 
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium ml-2 ${
              project.projectStatus === 'Completed' ? 'bg-green-100 text-green-800' :
              project.projectStatus === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
              project.projectStatus === 'At Risk' ? 'bg-orange-100 text-orange-800' :
              project.projectStatus === 'Awaiting Deletion' ? 'bg-red-100 text-red-800' :
              project.projectStatus === 'Delayed' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {project.projectStatus}
            </span>
          </p>

          {/* Project Description */}
          <ul className="list-disc ml-4 text-[#787486] text-sm mb-4 space-y-2 flex-grow">
            {project.description.split('.').slice(0, 2).map((item, i) => (
              <li key={i}>{item.trim()}</li>
            ))}
          </ul>
          
          {/* Progress and Members */}
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#0D062D] text-sm">Progress</span>
              <span className="text-[#0D062D] text-sm font-medium">
                {project.progressPercent}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-[4px] mb-4">
              <div 
                className="bg-red-500 h-[4px] rounded-full" 
                style={{ width: `${project.progressPercent}%` }}
              ></div>
            </div>
            <div className="flex items-center">
              <span className="text-[#0D062D] text-sm font-medium">
                {project.members.length} {project.members.length === 1 ? 'Member' : 'Members'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
