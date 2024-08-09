import React, { useEffect, useState } from 'react';
import './Home.css';
import { getProjects } from '../api/projects';
import { Project } from './ProjectInterface';
import FilterDropdown from './FilterDropdown/filter';
import CalendarDropdown from './FilterDropdown/calendarDropdown';
import ProjectCard from './ProjectCard';

const Home: React.FC = () => {
  const [projectData, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="ml-64 mt-6 h-full overflow-y-scroll">
      <div className="overflow-y-auto h-full">
        <h1 className="home_header">Project Catalogue</h1>
        <div className="flex space-x-4 mt-4 mb-4">
          <FilterDropdown />
          <CalendarDropdown />
        </div>
        <div className="flex flex-wrap justify-center">
          {projectData.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;