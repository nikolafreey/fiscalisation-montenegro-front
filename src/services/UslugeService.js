import ApiService from './ApiService';

const ENDPOINTS = {
  USLUGE: 'usluge',
  USLUGA: 'usluge/{id}',
};

class UslugeService extends ApiService {
  getUsluge = (params) => this.apiClient.get(ENDPOINTS.USLUGE, { params });

  storeUsluga = (data) => this.apiClient.post(ENDPOINTS.USLUGE, data);

  getUsluga = (id) => this.apiClient.get(ENDPOINTS.USLUGA.replace('{id}', id));

  updateUsluga = (data) =>
    this.apiClient.put(ENDPOINTS.USLUGA.replace('{id}', data.id), data);

  deleteUsluga = (id) =>
    this.apiClient.delete(ENDPOINTS.USLUGA.replace('{id}', id));
}

export const uslugeService = new UslugeService();
