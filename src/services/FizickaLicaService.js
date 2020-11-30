import ApiService from './ApiService';

const ENDPOINTS = {
  FIZICKA_LICA: 'fizicka-lica',
  FIZICKO_LICE: 'fizicka-lica/{id}',
};

class FizickaLicaService extends ApiService {
  getFizickaLica = (params) =>
    this.apiClient.get(ENDPOINTS.FIZICKA_LICA, { params });

  storeFizickoLice = (data) =>
    this.apiClient.post(ENDPOINTS.FIZICKA_LICA, data);

  getFizickoLice = (id) =>
    this.apiClient.get(ENDPOINTS.FIZICKO_LICE.replace('{id}', id));

  updateFizickoLice = (data) =>
    this.apiClient.put(ENDPOINTS.FIZICKO_LICE.replace('{id}', data.id), data);

  deleteFizickoLice = (id) =>
    this.apiClient.delete(ENDPOINTS.FIZICKO_LICE.replace('{id}', id));

  getFizickaLicaDropdown = async (search) => {
    const { data } = await this.getFizickaLica({ search });
    return data.data.map((fizickoLice) => ({
      value: fizickoLice.id,
      label: fizickoLice.ime,
    }));
  };
}

export const fizickaLicaService = new FizickaLicaService();
