import { api } from '../../services/httpClient';

export const applyAsGuide = (input: unknown) =>
  api('/guide-applications', { method: 'POST', body: JSON.stringify(input) });
