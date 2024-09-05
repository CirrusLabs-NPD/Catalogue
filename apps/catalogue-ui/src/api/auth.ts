import axios from 'axios';
import AxiosUtility from './AxiosUtility';

const API_BASE_URL = 'http://localhost:3000/api/auth';

interface Member {
  _id: string; // Make _id optional for create operations
  name: string;
  email: string;
  title: string; // Ensure all required fields are defined
  techStack: string[];
  projects: string[];
}

// Function to get an authentication token
export const getToken = async (data: { email: string; name: string }): Promise<any> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/login`,
    method: 'POST',
    data: data
  });
};

// Function to get all users
export const getUsers = async (): Promise<Member[]> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/users`,
    method: 'GET'
  });
};

// Function to assign a role to a user
export const assignRole = async (email: string, role: string): Promise<void> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/assign-role`,
    method: 'POST',
    data: { email, role }
  });
};

// Function to change the status of a user
export const assignStatus = async (email: string, status: string): Promise<void> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/assign-status`,
    method: 'POST',
    data: { email, status }
  });
};

// Function to delete a user
export const deleteUser = async (id: string): Promise<void> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/${id}`,
    method: 'DELETE'
  });
};

// Function to get all members
export const getMembers = async (): Promise<Member[]> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}`,
    method: 'GET'
  });
};

// Function to add a new member
export const addMember = async (member: Omit<Member, '_id'>): Promise<Member> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}`,
    method: 'POST',
    data: member
  });
};

// Function to update a member's details
export const updateMember = async (id: string, member: Omit<Member, '_id'>): Promise<Member> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/${id}`,
    method: 'PUT',
    data: member
  });
};

// Function to delete a member
export const deleteMember = async (id: string): Promise<void> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/${id}`,
    method: 'DELETE'
  });
};
