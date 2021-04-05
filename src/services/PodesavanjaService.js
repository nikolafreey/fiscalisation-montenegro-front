import ApiService from './ApiService';

const ENDPOINTS = {
  DODAJ_KORISNIKA: 'podesavanja/dodajKorisnika',
};

class PodesavanjaService extends ApiService {
  storePreduzece = (data) =>
    this.apiClient.post(ENDPOINTS.DODAJ_KORISNIKA, data);
}

export const podesavanjaService = new PodesavanjaService();
