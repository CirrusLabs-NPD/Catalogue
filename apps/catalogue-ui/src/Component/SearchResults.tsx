import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProjects } from '../api/analytics';
import { Project } from './ProjectInterface';
import ProjectCard from './ProjectCard';

function SearchResults() {
  const location = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const searchParams = new URLSearchParams(location.search);
      const searchTerm = searchParams.get('search') || ''; // Get the search term from the URL

      if (searchTerm) {
        try {
          const fetchedProjects = await searchProjects(searchTerm);
          setProjects(fetchedProjects);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setError('Failed to load search results');
        }
      } else {
        setError('No search term provided');
      }

      setLoading(false);
    };

    fetchSearchResults();
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="ml-64 mt-6 h-full overflow-y-scroll">
      <div className="overflow-y-auto h-full">
        <h1 className="text-[#2C4B84] text-4xl pl-8 pt-1">Search Results:</h1>
        <div className="flex flex-wrap justify-center">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No projects found matching the search criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;