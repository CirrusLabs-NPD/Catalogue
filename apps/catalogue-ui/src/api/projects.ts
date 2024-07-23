import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/projects'; // Adjust the base URL as necessary

export const addProject = async (project: any) => {
    const response = await axios.post(API_BASE_URL, project);
    return response.data;
};

export const getProjects = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};
