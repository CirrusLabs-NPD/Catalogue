import React, { useEffect, useState } from 'react';
import { getProjects } from '../api/projects';
import { Project } from './ProjectInterface';
import FilterDropdown from './FilterDropdown/filter';
import SortDropdown from './FilterDropdown/SortDropdown';
import ProjectCard from './ProjectCard';

const Home: React.FC = () => {
  const [projectData, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects();
      if (Array.isArray(response)) {
        setProjects(response);
      } else {
        console.error('Received non-array response:', response);
        setError('Unexpected data format received');
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (sortedProjects: Project[]) => {
    if (Array.isArray(sortedProjects)) {
      setProjects(sortedProjects);
    } else {
      console.error('Received non-array sorted projects:', sortedProjects);
      setError('Unexpected data format received from sorting');
    }
  };

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="ml-64 mt-6 max-h-[calc(100vh-100px)] overflow-y-auto">
      <div className="h-full">
        <h1 className="text-[#2C4B84] text-4xl pl-8 pt-1">Project Catalogue</h1>
        <div className="flex space-x-4 mt-5 mb-4">
          <FilterDropdown />
          <SortDropdown onSortChange={handleSortChange} />
        </div>
        <div className="flex flex-wrap justify-center">
          {Array.isArray(projectData) && projectData.length > 0 ? (
            projectData.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))
          ) : (
            <div>No projects available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;