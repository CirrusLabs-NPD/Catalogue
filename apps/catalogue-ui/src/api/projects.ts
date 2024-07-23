import AxiosUtility from './AxiosUtility';

const API_BASE_URL = 'http://localhost:3000/api';

export const getProjects = async () => {
  return AxiosUtility({
    url: `${API_BASE_URL}/projects`,
    method: 'GET',
  });
};

export const getProjectById = async (id: any) => {
  return AxiosUtility({
    url: `${API_BASE_URL}/projects/${id}`,
    method: 'GET',
  });
};

export const addProject = async (project: any) => {
  return AxiosUtility({
    url: `${API_BASE_URL}/projects`,
    method: 'POST',
    data: project,
  });
};
