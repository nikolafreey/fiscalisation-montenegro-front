import ApiService from './ApiService';

const ENDPOINTS = {
  PROIZVODJACI: 'proizvodjaci-robe',
  PROIZVODJAC: 'proizvodjaci-robe/{id}',
};

class ProizvodjacService extends ApiService {
  getProizvodjac = (params) =>
    this.apiClient.get(ENDPOINTS.PROIZVODJACI, { params });

  storeProizvodjac = (data) =>
    this.apiClient.post(ENDPOINTS.PROIZVODJACI, data);

  getProizvodjac = (id) =>
    this.apiClient.get(ENDPOINTS.PROIZVODJAC.replace('{id}', id));

  updateProizvodjac = (data) =>
    this.apiClient.put(ENDPOINTS.PROIZVODJAC.replace('{id}', data.id), data);

  deleteProizvodjac = (id) =>
    this.apiClient.delete(ENDPOINTS.PROIZVODJAC.replace('{id}', id));

  getProizvodjaciDropdown = async (search) => {
    const { data } = await this.getProizvodjac({ search });
    return data.map((proizvodjac) => ({
      value: proizvodjac.id,
      label: proizvodjac.naziv,
    }));
  };
}

export const proizvodjacService = new ProizvodjacService();
