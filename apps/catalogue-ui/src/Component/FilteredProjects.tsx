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
    <div className="ml-64 mt-6 h-full overflow-y-scroll">
      <div className="overflow-y-auto h-full">
        <h1 className="home_header">Projects Filtered By: {renderFilterSummary()}</h1>
        <FilterDropdown />
        <div className="flex flex-wrap justify-center">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
        {projects.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No projects found matching the selected filters.</p>
        )}
      </div>
    </div>
  );
}

export default FilteredProjects;