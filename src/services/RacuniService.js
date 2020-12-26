import ApiService from './ApiService';

const ENDPOINTS = {
  RACUNI: 'racuni',
  RACUN: 'racuni/{id}',
  ROBE: 'robe-racuni',
  USLUGE: 'usluge',
  ATRIBUTI_GRUPE: 'atributi-grupe',
};

class RacuniService extends ApiService {
  getRacuni = (params) => this.apiClient.get(ENDPOINTS.RACUNI, { params });

  storeRacun = (noviRacun) => {
    const usluge = Object.keys(noviRacun.usluge).map(uslugaId => ({
      usluga_id: uslugaId,
      kolicina: noviRacun.usluge[uslugaId].kolicina,
    }));
    const robe = Object.keys(noviRacun.robe).map(robaId => ({
      usluga_id: robaId,
      atribut_id: noviRacun.robe[robaId].atribut_robe?.id,
      kolicina: noviRacun.robe[robaId].kolicina,
    }));
    const stavke = [...usluge, ...robe];
    this.apiClient.post(ENDPOINTS.RACUNI, { stavke, preduzece_id: '00331d67-2537-47e2-911b-3399826cd175' });
  }

  getRobe = (params) => this.apiClient.get(ENDPOINTS.ROBE, { params });
  
  getUsluge = (params) => this.apiClient.get(ENDPOINTS.USLUGE, { params });

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

  getAtributiGrupe = (params) => {
    return this.apiClient.get(ENDPOINTS.ATRIBUTI_GRUPE, { params });
  } 
}

export const racuniService = new RacuniService();
