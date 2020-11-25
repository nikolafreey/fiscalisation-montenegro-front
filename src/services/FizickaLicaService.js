import ApiService from './ApiService';

const ENDPOINTS = {
  FIZICKA_LICA: 'api/fizicka-lica'
};

class FizickaLicaService extends ApiService {
  getFizickaLica = () => this.apiClient.get(ENDPOINTS.FIZICKA_LICA);

  storeFizickoLice = (data) => this.apiClient.post(ENDPOINTS.FIZICKA_LICA, data);
}

export const fizickaLicaService = new FizickaLicaService();