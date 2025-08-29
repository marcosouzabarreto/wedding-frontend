import api from '../api';

export const getGifts = async () => {
  const response = await api.get('/gifts/');
  return response.data;
};

interface CreatePreferencePayload {
  gift_ids: number[];
  custom_amount?: number;
  gifter_name?: string;
  message?: string;
}

export const createPreference = async (payload: CreatePreferencePayload) => {
  const response = await api.post('/payments/create-preference', payload);
  return response.data;
};
