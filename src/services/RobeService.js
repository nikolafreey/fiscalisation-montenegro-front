import ApiService from './ApiService';

const ENDPOINTS = {
  ROBE: 'robe',
  ROBA: 'robe/{id}',
};

class RobeService extends ApiService {
  getRobe = (params) => this.apiClient.get(ENDPOINTS.ROBE, { params });

  storeRoba = (data) => this.apiClient.post(ENDPOINTS.ROBE, data);

  getRoba = (id) => this.apiClient.get(ENDPOINTS.ROBA.replace('{id}', id));

  updateRoba = (data) =>
    this.apiClient.put(ENDPOINTS.ROBA.replace('{id}', data.id), data);

  deleteRoba = (id) =>
    this.apiClient.delete(ENDPOINTS.ROBA.replace('{id}', id));

  getRobeDropdown = async (search) => {
    const { data } = await this.getRobe({ search });
    return data.data.map((roba) => ({
      value: roba.id,
      label: roba.ime,
    }));
  };
}

export const robeService = new RobeService();
