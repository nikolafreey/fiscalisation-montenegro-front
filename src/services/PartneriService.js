import ApiService from './ApiService';

const ENDPOINTS = {
  PARTNERI: 'api/partneri',
};

class PartneriService extends ApiService {
  getPartneri = () => this.apiClient.get(ENDPOINTS.PARTNERI);

  storePartner = (data) => this.apiClient.post(ENDPOINTS.PARTNERI, data);
}

export const partneriService = new PartneriService();
