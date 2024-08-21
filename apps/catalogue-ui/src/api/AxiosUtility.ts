import axios from 'axios';

const AxiosUtility = async ({
  url,
  method,
  data = null,
  params = null,
  fileUpload = false
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  params?: any;
  fileUpload?: boolean;
}) => {
  const token = localStorage.getItem('jwt_token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': fileUpload ? 'multipart/form-data' : 'application/json',
  };

  try {
    let config: any = {
      url,
      method,
      headers,
      params,
    };

    if (method !== 'GET' && method !== 'DELETE') {
      config.data = fileUpload ? data : JSON.stringify(data);
    }

    const response = await axios(config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default AxiosUtility;