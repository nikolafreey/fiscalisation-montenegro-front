import ApiService from './ApiService';

const ENDPOINTS = {
  INDEX: 'podesavanja',
  SHOW: 'podesavanja/{id}',
  CREATE: 'podesavanja/dodajKorisnika',
  UPLOAD_FILES: 'preduzeca/{id}',
  USER: 'users/{id}',
};

class PodesavanjaService extends ApiService {
  showPodesavanja = () => this.apiClient.get(ENDPOINTS.INDEX);

  storePreduzece = (data) => this.apiClient.post(ENDPOINTS.INDEX, data);

  uploadFiles = (data, id) => {
    return this.apiClient.post(
      ENDPOINTS.UPLOAD_FILES.replace('{id}', id),
      data,
      {
        'Content-Type':
          'multipart/form-data; charset=utf-8; boundary=' +
          Math.random().toString().substr(2),
      }
    );
  };

  updatePreduzece = (data) =>
    this.apiClient.put(ENDPOINTS.SHOW.replace('{id}', data.id), data);

  storePreduzeceKorisnik = (data) =>
    this.apiClient.post(ENDPOINTS.CREATE, data);

  deleteKorisnika = (id) =>
    this.apiClient.delete(ENDPOINTS.USER.replace('{id}', id));
}

export const podesavanjaService = new PodesavanjaService();
