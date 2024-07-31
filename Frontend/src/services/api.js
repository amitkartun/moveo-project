import axios from 'axios';

const API_URL = '/api/codeblocks/';

export const getAllCodeBlocks = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const getCodeBlock = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};

export const updateCodeBlock = async (id, code) => {
  const response = await axios.put(`${API_URL}${id}`, { code });
  return response.data;
};