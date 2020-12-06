import ApiService from './ApiService';

const ENDPOINTS = {
  JEDINICE_MJERE: 'jedinice_mjere',
};

class JediniceMjereService extends ApiService {
  getJediniceMjere = (params) =>
    this.apiClient.get(ENDPOINTS.JEDINICE_MJERE, { params });

  getJediniceMjereDropdown = async (search) => {
    const { data } = await this.getJediniceMjere({ search });
    return data.map((jedinicaMjere) => ({
      value: jedinicaMjere.id,
      label: jedinicaMjere.naziv,
      stopa: jedinicaMjere.stopa,
    }));
  };
}

export const jediniceMjereService = new JediniceMjereService();
