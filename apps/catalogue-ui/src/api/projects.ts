import axios from 'axios';
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

export const cancelDeleteProject = async (id: string) => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/projects/${id}/cancel-delete`,
    method: 'PUT',
    data: {}
  });
};

export const getStatuses = async () => {
  return AxiosUtility({
    url: `${API_BASE_URL}/statuses`,
    method: 'GET',
  });
};

export const getMembers = async () => {
  return AxiosUtility({
    url: `${API_BASE_URL}/members`,
    method: 'GET',
  });
};

export const addStatus = async (status: any) => {
  return AxiosUtility({
    url: `${API_BASE_URL}/statuses`,
    method: 'POST',
    data: status
  });
};

export const deleteStatus = async (id: string) => {
  return AxiosUtility({
    url: `${API_BASE_URL}/statuses/${id}`,
    method: 'DELETE'
  });
};

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export const approveProject = async (id: string) => {
  return AxiosUtility({
    url: `${API_BASE_URL}/projects/${id}/approve`,
    method: 'PUT',
  });
};

export const rejectProject = async (id: string) => {
  return AxiosUtility({
    url: `${API_BASE_URL}/projects/${id}/reject`,
    method: 'PUT',
  });
};

export const getProjectsByStatus = async (status: 'pending' | 'approved' | 'rejected') => {
  try {
    const response = await AxiosUtility({
      url: `${API_BASE_URL}/projects/status/${status}`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects by status:', error);
    throw error;
  }
};
