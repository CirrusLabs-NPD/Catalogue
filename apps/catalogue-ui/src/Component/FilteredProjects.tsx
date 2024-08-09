import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectsByStatus } from '../api/analytics';
import { Project } from './ProjectInterface';
import ProjectCard from './ProjectCard';

function FilteredProjects() {
  const { status } = useParams<{ status: string }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (status) {
        try {
          const fetchedProjects = await getProjectsByStatus([status]);
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
  }, [status]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="ml-64 mt-6 h-full overflow-y-scroll">
      <div className="overflow-y-auto h-full">
        <h1 className="home_header">Projects with status: {status}</h1>
        <div className="flex flex-wrap justify-center">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilteredProjects;