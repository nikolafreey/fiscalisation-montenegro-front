import ApiService from './ApiService';

const ENDPOINTS = {
  GRUPE: 'api/grupe',
};

class GrupeService extends ApiService {
  getGrupe = (params) => this.apiClient.get(ENDPOINTS.GRUPE, { params });

  getGrupeDropdown = async (search) => {
    const { data } = await this.getGrupe({ search });
    return data.map((grupa) => ({
      value: grupa.id,
      label: grupa.naziv,
    }));
  };
}

export const grupeService = new GrupeService();
