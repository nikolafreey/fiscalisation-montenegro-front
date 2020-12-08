import ApiService from './ApiService';

const ENDPOINTS = {
  KATEGORIJE_ROBE: 'kategorije-robe',
  KATEGORIJA_ROBE: 'kategorije-robe/{id}',
  PODKATEGORIJE_ROBE: 'podkategorije-robe',
  PODKATEGORIJA_ROBE: 'podkategorije-robe/{id}',
};


class KategorijeRobeService extends ApiService {
  getKategorijeRobe = (params) =>
    this.apiClient.get(ENDPOINTS.KATEGORIJE_ROBE, { params });

  getPodkategorijeRobe = (params) =>
    this.apiClient.get(ENDPOINTS.PODKATEGORIJE_ROBE, { params });

  storeKategorijaRobe = (data) => this.apiClient.post(ENDPOINTS.KATEGORIJE_ROBE, data);

  storePodkategorijaRobe = (data) => this.apiClient.post(ENDPOINTS.PODKATEGORIJE_ROBE, data);

  getKategorijaRobe = (id) =>
    this.apiClient.get(ENDPOINTS.KATEGORIJA_ROBE.replace('{id}', id));

  updateKategorijaRobe = (data) =>
    this.apiClient.put(ENDPOINTS.KATEGORIJA_ROBE.replace('{id}', data.id), data);

  deleteKategorijaRobe = (id) =>
    this.apiClient.delete(ENDPOINTS.KATEGORIJA_ROBE.replace('{id}', id));

  getKategorijeRobeDropdown = async () => {
    const { data } = await this.getKategorijeRobe();
    console.log(data);
    return data.map((kategorija_robe) => ({
      value: kategorija_robe.id,
      label: kategorija_robe.naziv,
    }));
  };
}

export const kategorijeRobeService = new KategorijeRobeService();
