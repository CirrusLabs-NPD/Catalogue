import React, { useEffect, useState } from 'react';
import { getProjects } from '../api/projects';
import { Project } from './ProjectInterface';
import FilterDropdown from './FilterDropdown/filter';
import SortDropdown from './FilterDropdown/SortDropdown';
import ProjectCard from './ProjectCard';
import { Loader2 } from 'lucide-react';

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
        // Filter only approved projects
        const approvedProjects = response.filter(project => project.approvalStatus === 'approved');
        setProjects(approvedProjects);
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

  return (
    <div className="ml-64 mt-6 pl-10 max-h-[calc(100vh-100px)]">
      <div className="h-full">
        <h1 className="text-[#2C4B84] text-4xl pl-8 pt-1">Approved Projects</h1>
        <div className="flex space-x-4 mt-5 ml-4 mb-4">
          <FilterDropdown />
          <SortDropdown onSortChange={handleSortChange} />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-[#2C4B84] animate-spin" />
            <span className="ml-3 text-lg text-[#2C4B84]">Loading approved projects...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center text-lg">{error}</div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {Array.isArray(projectData) && projectData.length > 0 ? (
              projectData.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))
            ) : (
              <div>No approved projects available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;