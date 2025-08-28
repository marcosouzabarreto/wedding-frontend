import api from './api';

export const getGifts = async () => {
  const response = await api.get('/gifts/');
  return response.data;
};

export const createPreference = async (gift_ids: number[]) => {
  const response = await api.post('/payments/create-preference', { gift_ids });
  return response.data;
};
