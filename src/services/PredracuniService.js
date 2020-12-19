import ApiService from './ApiService';

const ENDPOINTS = {
  PREDRACUNI: 'predracuni',
  PREDRACUN: 'predracuni/{id}',
};

class PredracuniService extends ApiService {
  getPredracuni = (params) =>
    this.apiClient.get(ENDPOINTS.PREDRACUNI, { params });

  storePredracun = (data) => this.apiClient.post(ENDPOINTS.PREDRACUNI, data);

  getPredracun = (id) =>
    this.apiClient.get(ENDPOINTS.PREDRACUN.replace('{id}', id));

  updatePredracun = (data) =>
    this.apiClient.put(ENDPOINTS.PREDRACUN.replace('{id}', data.id), data);

  deletePredracun = (id) =>
    this.apiClient.delete(ENDPOINTS.PREDRACUN.replace('{id}', id));

  getPredracuniDropdown = async (search) => {
    const { data } = await this.getPredracuni({ search });
    return data.data.map((predracun) => ({
      value: predracun.id,
      label: predracun.ime,
    }));
  };
}

export const predracuniService = new PredracuniService();
