import ApiService from './ApiService';

const ENDPOINTS = {
  RACUNI: 'racuni',
  RACUN: 'racuni/{id}',
};

class RacuniService extends ApiService {
  getRacuni = (params) => this.apiClient.get(ENDPOINTS.RACUNI, { params });

  storeRacun = (data) => this.apiClient.post(ENDPOINTS.RACUNI, data);

  getRacun = (id) => this.apiClient.get(ENDPOINTS.RACUN.replace('{id}', id));

  updateRacun = (data) =>
    this.apiClient.put(ENDPOINTS.RACUN.replace('{id}', data.id), data);

  deleteRacun = (id) =>
    this.apiClient.delete(ENDPOINTS.RACUN.replace('{id}', id));

  getRacuniDropdown = async (search) => {
    const { data } = await this.getRacuni({ search });
    return data.data.map((racun) => ({
      value: racun.id,
      label: racun.ime,
    }));
  };
}

export const racuniService = new RacuniService();
