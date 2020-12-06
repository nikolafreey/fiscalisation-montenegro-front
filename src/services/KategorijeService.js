import ApiService from './ApiService';

const ENDPOINTS = {
  KATEGORIJE: 'kategorije',
  KATEGORIJA: 'kategorije/{id}',
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
    console.log(data.data);
    return data.data.map((kategorije) => ({
      value: kategorije.id,
      label: kategorije.naziv,
    }));
  };
}

export const kategorijeService = new KategorijeService();
