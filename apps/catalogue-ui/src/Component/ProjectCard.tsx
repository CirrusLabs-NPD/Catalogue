import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from './ProjectInterface';
import iconlogohome from '../app/assets/iconlogohome.png';

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
      className={`container border border-gray-300 w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mt-12 p-4 rounded-lg mx-2 mb-4 ${
        colors[index % colors.length]
      }`}
    >
      <div className="flex flex-col items-start">
        <h2 className="cirrHeading text-[#5B4BA7] text-xl mt-4 ml-4 mb-2">
          {project.projectName}
        </h2>
        <p className="pHome text-[#0D062D] text-sm ml-4">
          Start Date: {project.startDate}
        </p>
        <ul className="list-disc ml-8 text-[#787486] text-lg mt-2">
          {project.description.split('.').slice(0, 2).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="flex justify-between items-center w-full mt-2 px-4">
          <span className="pHome text-[#0D062D] text-sm">Progress</span>
          <span className="text-[#0D062D] text-sm ml-auto">
            {project.progressPercent}
          </span>
        </div>
        <div className="w-[90%] h-[3px] bg-red-500 mt-1 mx-auto mb-2"></div>
        <div className="flex justify-between items-center w-full mt-2 px-4">
          <div className="flex items-center">
            <img src={iconlogohome} alt="Logo" className="h-5 mr-2" />
            <span className="text-[#0D062D] text-sm">
              {project.members.length} Members
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;