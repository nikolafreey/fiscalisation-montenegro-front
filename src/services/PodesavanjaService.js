import ApiService from './ApiService';

const ENDPOINTS = {
  PODESAVANJA: 'podesavanja',
  SHOW_PODESAVANJE: 'podesavanja/{id}',
  DODAJ_KORISNIKA: 'podesavanja/dodajKorisnika',
  USER: 'users/{id}',
};

class PodesavanjaService extends ApiService {
  showPodesavanja = () => this.apiClient.get(ENDPOINTS.PODESAVANJA);
  storePreduzece = (data) => this.apiClient.post(ENDPOINTS.PODESAVANJA, data);
  updatePreduzece = (data) =>
    this.apiClient.post(
      ENDPOINTS.SHOW_PODESAVANJE.replace('{id}', data.id),
      data
    );
  storePreduzeceKorisnik = (data) =>
    this.apiClient.post(ENDPOINTS.DODAJ_KORISNIKA, data);
  deleteKorisnika = (id) =>
    this.apiClient.delete(ENDPOINTS.USER.replace('{id}', id));
}

export const podesavanjaService = new PodesavanjaService();
