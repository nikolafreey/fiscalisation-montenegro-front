import ApiService from './ApiService';

const ENDPOINTS = {
  PREDUZECA: 'preduzeca',
  PREDUZECE: 'preduzeca/{id}',
};

class PreduzecaService extends ApiService {
  getPreduzeca = (params) =>
    this.apiClient.get(ENDPOINTS.PREDUZECA, { params });

  storePreduzece = (data) => this.apiClient.post(ENDPOINTS.PREDUZECA, data);

  getPreduzece = (id) =>
    this.apiClient.get(ENDPOINTS.PREDUZECE.replace('{id}', id));

  updatePreduzece = (data) =>
    this.apiClient.put(ENDPOINTS.PREDUZECE.replace('{id}', data.id), data);

  deletePreduzece = (id) =>
    this.apiClient.delete(ENDPOINTS.PREDUZECE.replace('{id}', id));

  getPreduzecaDropdown = async (search) => {
    const { data } = await this.getPreduzeca({ search });

    return data.data.map((preduzece) => ({
      value: preduzece.id,
      label: preduzece.kratki_naziv,
    }));
  };
}

export const preduzecaService = new PreduzecaService();
