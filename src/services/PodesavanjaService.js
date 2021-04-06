import ApiService from './ApiService';

const ENDPOINTS = {
  DODAJ_KORISNIKA: 'podesavanja/dodajKorisnika',
  USER: 'users/{id}',
};

class PodesavanjaService extends ApiService {
  storePreduzece = (data) =>
    this.apiClient.post(ENDPOINTS.DODAJ_KORISNIKA, data);
  deleteKorisnika = (id) =>
    this.apiClient.delete(ENDPOINTS.USER.replace('{id}', id));
}

export const podesavanjaService = new PodesavanjaService();
