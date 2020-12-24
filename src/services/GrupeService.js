import ApiService from './ApiService';

const ENDPOINTS = {
  GRUPE: 'grupe',
};

class GrupeService extends ApiService {
  getGrupe = (params) => this.apiClient.get(ENDPOINTS.GRUPE, { params });

  storeGrupa = (data) => this.apiClient.post(ENDPOINTS.GRUPE, data);

  getGrupeDropdown = async (search) => {
    const { data } = await this.getGrupe({ search });
    return data.map((grupa) => ({
      value: grupa.id,
      label: grupa.naziv,
    }));
  };
}

export const grupeService = new GrupeService();
