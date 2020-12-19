import ApiService from './ApiService';

const ENDPOINTS = {
  RACUNI: 'racuni',
  RACUN: 'racuni/{id}',
};

class RacuniService extends ApiService {
  getRacuni = (params) => this.apiClient.get(ENDPOINTS.RACUNI, { params });

  storeRacun = (noviRacun) => {
    const usluge = Object.keys(noviRacun.usluge).map(uslugaId => ({
      usluga_id: uslugaId,
      kolicina: noviRacun.usluge[uslugaId].kolicina,
      popust_procenat: 0,
      popust_iznos: 0,
      popust_na_jedinicnu_cijenu: 0,
    }));
    const robe = Object.keys(noviRacun.robe).map(robaId => ({
      usluga_id: robaId,
      kolicina: noviRacun.robe[robaId].kolicina,
      popust_procenat: 0,
      popust_iznos: 0,
      popust_na_jedinicnu_cijenu: 0,
    }));
    const stavke = [...usluge, ...robe];
    this.apiClient.post(ENDPOINTS.RACUNI, { stavke });
  }

  getRacun = (id) => this.apiClient.get(ENDPOINTS.RACUN.replace('{id}', id));

  updateRacun = (data) =>
    this.apiClient.put(ENDPOINTS.RACUN.replace('{id}', data.id), data);

  deleteRacun = (id) =>
    this.apiClient.delete(ENDPOINTS.RACUN.replace('{id}', id));

  getRacuniDropdown = async (search) => {
    const { data } = await this.getRacuni({ search });
    return data.data.map((racun) => ({
      value: racun.id,
      label: racun.ime,
    }));
  };
}

export const racuniService = new RacuniService();
