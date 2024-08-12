import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getProjectsByFilters } from '../api/analytics';
import { Project } from './ProjectInterface';
import ProjectCard from './ProjectCard';

function FilteredProjects() {
  const { filterType = '' } = useParams<{ filterType: string }>();
  const location = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (filterType === '') {
      setLoading(false);
      setError('No filter type specified');
      return;
    }

    const fetchProjects = async () => {
      const searchParams = new URLSearchParams(location.search);
      const filterValues = searchParams.getAll('value');
      setSelectedOptions(filterValues);

      if (filterValues.length > 0) {
        try {
          const filters = { [filterType]: filterValues };
          const fetchedProjects = await getProjectsByFilters(filters);
          setProjects(fetchedProjects);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching projects:', error);
          setError('Failed to load projects');
          setLoading(false);
        }
      }
    };

    fetchProjects();
  }, [filterType, location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="ml-64 mt-6 h-full overflow-y-scroll">
      <div className="overflow-y-auto h-full">
        <h1 className="home_header">Projects Filtered By {filterType.charAt(0).toUpperCase() + filterType.slice(1)}: {selectedOptions.join(', ')}</h1>
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
