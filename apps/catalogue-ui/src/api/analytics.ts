import AxiosUtility from './AxiosUtility';

const API_BASE_URL = 'http://localhost:3000/api/dashboard';

export const getStatusCount = async () => {
  return AxiosUtility({
    url: `${API_BASE_URL}/status-count`,
    method: 'GET'
  });
};

export const getPercentDash = async () => {
    return AxiosUtility({
      url: `${API_BASE_URL}/percent-dash`,
      method: 'GET'
    });
};

export const getMonthlyCompletion = async () => {
    return AxiosUtility({
      url: `${API_BASE_URL}/monthly-completion`,
      method: 'GET'
    });
};

export const getProjectsByStatus = async (statuses: string[]) => {
  return AxiosUtility({
    url: `${API_BASE_URL}/filter/status`,
    method: 'GET',
    params: { statuses: statuses.join(',') }
  });
};