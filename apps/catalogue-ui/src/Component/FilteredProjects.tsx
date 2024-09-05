import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProjectsByFilters } from '../api/analytics';
import { Project } from './ProjectInterface';
import ProjectCard from './ProjectCard';
import FilterDropdown from './FilterDropdown/filter';

function FilteredProjects() {
  const location = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const fetchProjects = async () => {
      const searchParams = new URLSearchParams(location.search);
      const newFilters: { [key: string]: string[] } = {};

      ['technology', 'resources', 'statuses', 'members'].forEach(category => {
        const values = searchParams.get(category);
        if (values) {
          newFilters[category] = values.split(',');
        }
      });

      setFilters(newFilters);

      if (Object.keys(newFilters).length > 0) {
        try {
          const fetchedProjects = await getProjectsByFilters(newFilters);
          setProjects(fetchedProjects);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching projects:', error);
          setError('Failed to load projects');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

    const renderFilterSummary = () => {
    return Object.entries(filters).map(([category, options]) => (
      <div key={category} className="mb-2">
        <span className="font-semibold">{category.charAt(0).toUpperCase() + category.slice(1)}:</span> {options.join(', ')}
      </div>
    ));
  };

  return (
    <div className="ml-64 mt-6 max-h-[calc(100vh-100px)]">
      <div className="h-full">
      <h1 className="text-[#2C4B84] text-4xl pl-8 pt-1">Projects Filtered By:</h1>
      <h1 className="text-[#2C4B84] text-3xl pl-8 pt-1">{renderFilterSummary()}</h1>
        <div className="flex space-x-4 ml-4 mt-5 mb-4">
          <FilterDropdown />
        </div>
        <div className="flex flex-wrap justify-center">
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project, index) => (
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

export default FilteredProjects;