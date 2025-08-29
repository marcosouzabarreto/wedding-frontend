import api from '../api';
import { Family, FamilyRSVPRequest } from '../types/family';

/**
 * Fetches family details from the API using a token.
 * @param token The family token.
 * @returns A promise that resolves to the Family data.
 */
export const getFamilyByToken = async (token: string): Promise<Family> => {
  const response = await api.get<Family>(`/families/token/${token}`);
  return response.data;
};

/**
 * Submits the family's RSVP to the API.
 * @param rsvpData The complete RSVP data payload.
 * @returns A promise that resolves when the submission is successful.
 */
export const submitRsvp = async (rsvpData: FamilyRSVPRequest): Promise<void> => {
  await api.post('/rsvps/family', rsvpData);
};
