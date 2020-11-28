import ApiService from './ApiService';

const ENDPOINTS = {
  KATEGORIJE: 'api/kategorije',
  KATEGORIJA: 'api/kategorije/{id}',
};

class KategorijeService extends ApiService {
  getKategorije = (params) =>
    this.apiClient.get(ENDPOINTS.KATEGORIJE, { params });

  storeKategorija = (data) => this.apiClient.post(ENDPOINTS.KATEGORIJE, data);

  getKategorija = (id) =>
    this.apiClient.get(ENDPOINTS.KATEGORIJA.replace('{id}', id));

  updateKategorija = (data) =>
    this.apiClient.put(ENDPOINTS.KATEGORIJA.replace('{id}', data.id), data);

  deleteKategorija = (id) =>
    this.apiClient.delete(ENDPOINTS.KATEGORIJA.replace('{id}', id));

  getKategorijeDropdown = async () => {
    const { data } = await this.getKategorije();
    return data.map((kategorije) => ({
      value: kategorije.id,
      label: kategorije.kratki_naziv,
    }));
  };
}

export const kategorijeService = new KategorijeService();
