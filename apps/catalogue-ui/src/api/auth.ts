import AxiosUtility from './AxiosUtility';

const API_BASE_URL = 'http://localhost:3000/api/auth';

export const getToken = async (email: string) => {
  return AxiosUtility({
    url: `${API_BASE_URL}/login`,
    method: 'POST',
    data: email
  });
};