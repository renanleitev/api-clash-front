import axios from 'axios';

const backendAPI = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const baseURL = `${backendAPI}`;

export const basePlayersURL = `${baseURL}/players`;
export const baseBattlesURL = `${baseURL}/battles`;

const axiosInstance = axios.create();

export const getPlayersData = async (url) => {
  const axiosUrl = `${basePlayersURL}/${url}`;
  const response = await axiosInstance.get(axiosUrl);
  return response.data;
};

export const getBattlesData = async (url) => {
  const axiosUrl = `${baseBattlesURL}/${url}`;
  const response = await axiosInstance.get(axiosUrl);
  return response.data;
};

export default axiosInstance;
