import axios from 'axios';
import AxiosUtility from './AxiosUtility';

const API_BASE_URL = 'http://localhost:3000/api';

interface Member {
  _id: string;
  name: string;
  email: string;
  title: string;
  techStack: string[];
  projects: string[];
}

// Function to get all members
export const getMembers = async (): Promise<Member[]> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/members`,
    method: 'GET'
  });
};

// Function to add a new member
export const addMember = async (member: Omit<Member, '_id'>): Promise<Member> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/members`,
    method: 'POST',
    data: member
  });
};

// Function to update a member's details
export const updateMember = async (id: string, member: Omit<Member, '_id'>): Promise<Member> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/members/${id}`,
    method: 'PUT',
    data: member
  });
};

// Function to delete a member
export const deleteMember = async (id: string): Promise<void> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/members/${id}`,
    method: 'DELETE'
  });
};

// Other functions remain unchanged
export const getToken = async (data: { email: string; name: string }): Promise<any> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/auth/login`,
    method: 'POST',
    data: data
  });
};

export const getUsers = async (): Promise<Member[]> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/auth/users`,
    method: 'GET'
  });
};

export const assignRole = async (email: string, role: string): Promise<void> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/auth/assign-role`,
    method: 'POST',
    data: { email, role }
  });
};

export const assignStatus = async (email: string, status: string): Promise<void> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/auth/assign-status`,
    method: 'POST',
    data: { email, status }
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/auth/${id}`,
    method: 'DELETE'
  });
};