import ApiService from './ApiService';

const ENDPOINTS = {
  PREDUZECA: 'api/preduzeca',
  PREDUZECE: 'api/preduzeca/{id}',
};

class PreduzecaService extends ApiService {
  getPreduzeca = () => this.apiClient.get(ENDPOINTS.PREDUZECA);

  storePreduzece = (data) => this.apiClient.post(ENDPOINTS.PREDUZECA, data);

  getPreduzece = (id) => this.apiClient.get(ENDPOINTS.PREDUZECE.replace('{id}', id));

  updatePreduzece = (data) => this.apiClient.put(ENDPOINTS.PREDUZECE.replace('{id}', data.id), data);

  deletePreduzece = (id) => this.apiClient.delete(ENDPOINTS.PREDUZECE.replace('{id}', id));

  getPreduzecaDropdown = async () => {
    const { data } = await this.getPreduzeca();
    return data.map(preduzece => ({value: preduzece.id, label: preduzece.kratki_naziv}));
  };
}

export const preduzecaService = new PreduzecaService();