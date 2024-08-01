import axios from 'axios';

const API_URL = '/api/codeblocks/';

// Fetches all code blocks from the API
export const getAllCodeBlocks = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Fetches a specific code block by its ID from the API
export const getCodeBlock = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};