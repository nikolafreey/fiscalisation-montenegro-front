import ApiService from './ApiService';

const ENDPOINTS = {
  PREDUZECA: 'preduzeca',
  PREDUZECE: 'preduzeca/{id}',
};

class PreduzecaService extends ApiService {
  getPreduzeca = (params) =>
    this.apiClient.get(ENDPOINTS.PREDUZECA, { params });

  storePreduzece = (data) => {
    let ziroRacuni = JSON.stringify(data.ziro_racuni);
    let form_data = new FormData();

    for (let key in data) {
      form_data.append(key, data[key]);
    }

    form_data.append('ziro_racuni', JSON.stringify(data.ziro_racuni));

    this.apiClient.post(ENDPOINTS.PREDUZECA, form_data, {
      'Content-Type':
        'multipart/form-data; charset=utf-8; boundary=' +
        Math.random().toString().substr(2),
    });
  };

  getPreduzece = (id) =>
    this.apiClient.get(ENDPOINTS.PREDUZECE.replace('{id}', id));

  updatePreduzece = (data) => {
    let ziroRacuni = JSON.stringify(data.ziro_racuni);
    let form_data = new FormData();

    for (let key in data) {
      form_data.append(key, data[key]);
    }

    form_data.append('ziro_racuni', JSON.stringify(data.ziro_racuni));
    form_data.append('_method', 'PUT');

    // this.apiClient.put(ENDPOINTS.PREDUZECE.replace('{id}', data.id), data);
    this.apiClient.post(ENDPOINTS.PREDUZECA, form_data, {
      'Content-Type':
        'multipart/form-data; charset=utf-8; boundary=' +
        Math.random().toString().substr(2),
    });
  };

  deletePreduzece = (id) =>
    this.apiClient.delete(ENDPOINTS.PREDUZECE.replace('{id}', id));

  getPreduzecaDropdown = async (search) => {
    const { data } = await this.getPreduzeca({ search });

    return data.data.map((preduzece) => ({
      value: preduzece.id,
      label: preduzece.kratki_naziv,
    }));
  };
}

export const preduzecaService = new PreduzecaService();
