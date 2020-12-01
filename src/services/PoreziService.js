import ApiService from './ApiService';

const ENDPOINTS = {
  POREZI: 'porezi',
};

class PoreziService extends ApiService {
  getPorezi = (params) => this.apiClient.get(ENDPOINTS.POREZI, { params });

  getPoreziDropdown = async (search) => {
    const { data } = await this.getPorezi({ search });
    return data.map((porez) => ({
      value: porez.id,
      label: porez.naziv,
    }));
  };
}

export const poreziService = new PoreziService();
