import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from './ProjectInterface';
import { formatDate } from '../api/projects';
import { Calendar, Users, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'At Risk': return 'bg-orange-100 text-orange-800';
      case 'Awaiting Deletion': return 'bg-red-100 text-red-800';
      case 'Delayed': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link
      to={`/description/${project._id}`}
      className="block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4"
    >
      <div className="group h-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
              {project.projectName}
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.projectStatus)}`}>
              {project.projectStatus}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <Calendar size={16} className="mr-2" />
            <span>Started: {formatDate(project.startDate)}</span>
          </div>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Progress</span>
              <span className="text-gray-800 font-semibold">{project.progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${project.progressPercent}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600">
                <Users size={16} className="mr-2" />
                <span>{project.members.length} {project.members.length === 1 ? 'Member' : 'Members'}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;