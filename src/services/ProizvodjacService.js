import ApiService from './ApiService';

const ENDPOINTS = {
  PROIZVODJAC: 'proizvodjaci-robe',
  PROIZVODJACI: 'proizvodjaci-robe/{id}',
};

class ProizvodjacService extends ApiService {
  getProizvodjac = (params) =>
    this.apiClient.get(ENDPOINTS.PREDUZECA, { params });

  storeProizvodjac = (data) => this.apiClient.post(ENDPOINTS.PREDUZECA, data);

  getProizvodjac = (id) =>
    this.apiClient.get(ENDPOINTS.PROIZVODJAC.replace('{id}', id));

  updateProizvodjac = (data) =>
    this.apiClient.put(ENDPOINTS.PROIZVODJAC.replace('{id}', data.id), data);

  deleteProizvodjac = (id) =>
    this.apiClient.delete(ENDPOINTS.PROIZVODJAC.replace('{id}', id));

  getProizvodjaciDropdown = async (search) => {
    const { data } = await this.getProizvodjac({ search });
    console.log('proizvodjac: ', data);
    return data.map((proizvodjac) => ({
      value: proizvodjac.id,
      label: proizvodjac.naziv,
    }));
  };
}

export const proizvodjacService = new ProizvodjacService();
