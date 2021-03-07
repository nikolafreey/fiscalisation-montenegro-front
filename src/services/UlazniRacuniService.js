import ApiService from './ApiService';

const ENDPOINTS = {
  ULAZNI_RACUNI: 'ulazni-racuni',
  ULAZNI_RACUNI_PDV: 'ulazni-racuni-pdv',
  ULAZNI_RACUN: 'ulazni-racuni/{id}',
  ULAZNI_RACUNI_DANAS: 'ulazni-racuni-danas',
};

class UlazniRacuniService extends ApiService {
  getUlazniRacuni = (params) =>
    this.apiClient.get(ENDPOINTS.ULAZNI_RACUNI, { params });

  getUlazniRacuniPdv = (params) =>
    this.apiClient.get(ENDPOINTS.ULAZNI_RACUNI_PDV, { params });

  getUlazniRacuniDanas = () =>
    this.apiClient.get(ENDPOINTS.ULAZNI_RACUNI_DANAS);

  storeUlazniRacun = (data) =>
    this.apiClient.post(ENDPOINTS.ULAZNI_RACUNI, data);

  getUlazniRacun = (id) =>
    this.apiClient.get(ENDPOINTS.ULAZNI_RACUN.replace('{id}', id));

  updateUlazniRacun = (data) =>
    this.apiClient.put(ENDPOINTS.ULAZNI_RACUN.replace('{id}', data.id), data);

  deleteUlazniRacun = (id) =>
    this.apiClient.delete(ENDPOINTS.ULAZNI_RACUN.replace('{id}', id));

  getUlazniRacuniDropdown = async (search) => {
    const { data } = await this.getUlazniRacuni({ search });
    return data.data.map((ulazniRacun) => ({
      value: ulazniRacun.id,
      label: ulazniRacun.ime,
    }));
  };
}

export const ulazniRacuniService = new UlazniRacuniService();
