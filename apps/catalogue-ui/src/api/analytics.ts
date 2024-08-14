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

export const getFilters = async (category: string) => {
  return await AxiosUtility({
    url: `${API_BASE_URL}/filter/${category}`,
    method: 'GET',
  });
}

export const getProjectsByFilters = async (filters: {
  statuses?: string[];
  members?: string[];
  technology?: string[];
  resources?: string[];
}) => {
  return AxiosUtility({
    url: `${API_BASE_URL}/filter/multiple`,
    method: 'GET',
    params: filters,
  });
};

export const sortProjectsByName = async (order: string) => {
  return AxiosUtility({
    url: `${API_BASE_URL}/sort/name`,
    method: 'GET',
    params: { order }
  });
};

export const sortProjectsByProgress = async (order: string) => {
  return AxiosUtility({
    url: `${API_BASE_URL}/sort/progress`,
    method: 'GET',
    params: { order }
  });
};