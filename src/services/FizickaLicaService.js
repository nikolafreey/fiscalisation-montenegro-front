import { fizickoLiceDelete } from '../store/sagas/FizickaLicaSagas';
import ApiService from './ApiService';

const ENDPOINTS = {
  FIZICKA_LICA: 'api/fizicka-lica',
  FIZICKO_LICE: 'api/fizicka-lica/{id}',
};

class FizickaLicaService extends ApiService {
  getFizickaLica = () => this.apiClient.get(ENDPOINTS.FIZICKA_LICA);

  storeFizickoLice = (data) => this.apiClient.post(ENDPOINTS.FIZICKA_LICA, data);

  getFizickoLice = (id) => this.apiClient.get(ENDPOINTS.FIZICKO_LICE.replace('{id}', id));

  updateFizickoLice = (data) => this.apiClient.put(ENDPOINTS.FIZICKO_LICE.replace('{id}', data.id), data);

  deleteFizickoLice = (id) => this.apiClient.delete(ENDPOINTS.FIZICKO_LICE.replace('{id}', id));

  getFizickaLicaDropdown = async () => {
    const { data } = await this.getFizickaLica();
    return data.map(fizickoLice => ({value: fizickoLice.id, label: fizickoLice.kratki_naziv}));
  };
}

export const fizickaLicaService = new FizickaLicaService();