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

export const updateProject = async (id: string, project: any) => {
  return AxiosUtility({
    url: `${API_BASE_URL}/projects/${id}`,
    method: 'PUT',
    data: project,
  });
};

export const deleteProject = async (id: string) => {
  try {
    const response = await AxiosUtility({
      url: `${API_BASE_URL}/projects/${id}`,
      method: 'DELETE',
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
