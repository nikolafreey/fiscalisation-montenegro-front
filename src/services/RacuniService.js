import ApiService from './ApiService';

const ENDPOINTS = {
  RACUNI: 'racuni',
  RACUN: 'racuni/{id}',
  ROBE: 'robe-racuni',
  STATUS: 'racuni-status',
  PDV: 'racuni-pdv',
  KUPCI: 'racuni-najveci-kupci',
  DUZNICI: 'racuni-najveci-duznici',
  USLUGE: 'usluge',
  ATRIBUTI_GRUPE: 'atributi-grupe',
};

class RacuniService extends ApiService {
  getRacuni = (params) => this.apiClient.get(ENDPOINTS.RACUNI, { params });

  getRacuniStatus = (params) =>
    this.apiClient.get(ENDPOINTS.STATUS, { params });

  getRacuniKupci = (params) => this.apiClient.get(ENDPOINTS.KUPCI, { params });

  getRacuniDuznici = (params) =>
    this.apiClient.get(ENDPOINTS.DUZNICI, { params });

  getRacuniPdv = (params) => this.apiClient.get(ENDPOINTS.PDV, { params });

  storeRacun = (noviRacun) => {
    const usluge = Object.keys(noviRacun.usluge).map((uslugaId) => ({
      usluga_id: uslugaId,
      kolicina: noviRacun.usluge[uslugaId].kolicina,
    }));
    const robe = Object.keys(noviRacun.robe).map((robaId) => ({
      usluga_id: robaId,
      atribut_id: noviRacun.robe[robaId].atribut_robe?.id,
      kolicina: noviRacun.robe[robaId].kolicina,
    }));
    const stavke = [...usluge, ...robe];
    return this.apiClient.post(ENDPOINTS.RACUNI, {
      stavke,
      vrsta_racuna: 'gotovinski',
    });
  };

  storeBezgotovinskiRacun = (values) => {
    values.stavke = values.stavke.map((stavka) => {
      if (!stavka.roba_id) return { ...stavka, usluga_id: stavka.id };
      else return stavka;
    });
    return this.apiClient.post(ENDPOINTS.RACUNI, {
      ...values,
      // preduzece_id: '028b4491-6a9a-459b-be42-f7bccca522d6'
    });
  };

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
  };
}

export const racuniService = new RacuniService();
