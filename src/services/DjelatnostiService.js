import ApiService from './ApiService';
import { poreziService } from './PoreziService';

const ENDPOINTS = {
  DJELATNOSTI: 'djelatnosti',
  DJELATNOST: 'djelatnost/{id}',
};

class DjelatnostiService extends ApiService {
  getDjelatnosti = (params) =>
    this.apiClient.get(ENDPOINTS.DJELATNOSTI, { params });

  storeDjelatnost = (data) => this.apiClient.post(ENDPOINTS.DJELATNOSTI, data);

  getDjelatnost = (id) =>
    this.apiClient.get(ENDPOINTS.DJELATNOST.replace('{id}', id));

  updateDjelatnost = (data) =>
    this.apiClient.put(ENDPOINTS.DJELATNOST.replace('{id}', data.id), data);

  deleteDjelatnost = (id) =>
    this.apiClient.delete(ENDPOINTS.DJELATNOST.replace('{id}', id));

  getDjelatnostiDropdown = async (search) => {
    const { data } = await this.getDjelatnosti({ search });
    return data.data.map((djelatnost) => ({
      value: djelatnost.id,
      label: djelatnost.naziv,
    }));
  };
}

export const djelatnostiService = new DjelatnostiService();
