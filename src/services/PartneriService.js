import ApiService from './ApiService';

const ENDPOINTS = {
  PARTNERI: 'partneri',
  PARTNER: 'partneri/{id}',
};

class PartneriService extends ApiService {
  getPartneri = (params) => this.apiClient.get(ENDPOINTS.PARTNERI, { params });

  storePartner = (data) => this.apiClient.post(ENDPOINTS.PARTNERI, data);

  getPartner = (id) =>
    this.apiClient.get(ENDPOINTS.PARTNER.replace('{id}', id));

  updatePartner = (data) =>
    this.apiClient.put(ENDPOINTS.PARTNER.replace('{id}', data.id), data);

  deletePartner = (id) =>
    this.apiClient.delete(ENDPOINTS.PARTNER.replace('{id}', id));
}

export const partneriService = new PartneriService();
