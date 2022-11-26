import axios from 'axios';

const key = '30593721-3615c14b1fd526cc46c7cd9ff';
const photosApi = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page: 1,
  },
});

export const getPtotos = async params => {
  const response = await photosApi.get(`/?key=${key}`, { params });
  return response.data;
};

// export const addQuery = async obj => {
//   const response = await axios.post(`/?key=${key}`, obj);
//   return response.data;
// };

// export const deleteQuery = async id => {
//   const response = await axios.delete(`/?key=${key}/${id}`);
//   return response.data;
// };

// export const updateQuery = async fields => {
//   const response = await axios.put(`/?key=${key}/${fields.id}`, fields);
//   return response.data;
// };
