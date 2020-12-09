import ApiService from './ApiService';

const ENDPOINTS = {
  ATRIBUTI: 'atributi',
  ATRIBUT: 'atributi/{id}',
  TIPOVI_ATRIBUTA: 'tipovi-atributa',
  TIP_ATRIBUTA: 'tipovi-atributa/{id}',
};


class AtributiService extends ApiService {
  getAtributi = (params) =>
    this.apiClient.get(ENDPOINTS.ATRIBUTI, { params });

  getTipoviAtributa = (params) =>
    this.apiClient.get(ENDPOINTS.TIPOVI_ATRIBUTA, { params });

  storeAtribut = (data) => this.apiClient.post(ENDPOINTS.ATRIBUTI, data);

  storeTipAtributa = (data) => this.apiClient.post(ENDPOINTS.TIPOVI_ATRIBUTA, data);

  getAtribut = (id) =>
    this.apiClient.get(ENDPOINTS.ATRIBUT.replace('{id}', id));

  updateAtribut = (data) =>
    this.apiClient.put(ENDPOINTS.ATRIBUT.replace('{id}', data.id), data);

  deleteAtribut = (id) =>
    this.apiClient.delete(ENDPOINTS.ATRIBUT.replace('{id}', id));

  getAtributiDropdown = async () => {
    const { data } = await this.getAtributi();
    return data.map((atribut) => ({
      value: atribut.id,
      label: atribut.naziv,
    }));
  };
}

export const atributiService = new AtributiService();
