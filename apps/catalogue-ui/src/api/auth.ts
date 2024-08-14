import AxiosUtility from './AxiosUtility';

const API_BASE_URL = 'http://localhost:3000/api/auth';

export const getToken = async (data: { email: string, name: any }) => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/login`,
    method: 'POST',
    data: data
  });
};

export const getUsers = async () => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/users`,
    method: 'GET'
  })
}

export const assignRole = async (email: string, role: string) => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/assign-role`,
    method: 'POST',
    data: { email, role }
  })
}

export const assignStatus = async (email: string, status: string) => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/assign-status`,
    method: 'POST',
    data: { email, status }
  })
}


export const deleteUser = async (id: string) => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/${id}`,
    method: 'DELETE'
  });
}
