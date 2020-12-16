import ApiService from './ApiService';

const ENDPOINTS = {
  ATRIBUTI: 'atribut-roba',
  ATRIBUT: 'atribut-roba/{id}',
  TIPOVI_ATRIBUTA: 'tipovi-atributa',
  TIP_ATRIBUTA: 'tipovi-atributa/{id}',
};

class AtributiService extends ApiService {
  getAtributi = (params) => this.apiClient.get(ENDPOINTS.ATRIBUTI, { params });

  getTipoviAtributa = (params) =>
    this.apiClient.get(ENDPOINTS.TIPOVI_ATRIBUTA, { params });

  storeAtribut = (data) => this.apiClient.post(ENDPOINTS.ATRIBUTI, data);

  storeTipAtributa = (data) =>
    this.apiClient.post(ENDPOINTS.TIPOVI_ATRIBUTA, data);

  getAtribut = (id) =>
    this.apiClient.get(ENDPOINTS.ATRIBUT.replace('{id}', id));

  getAtributiPoTipuAtributa = (tipAtributaId) =>
    this.apiClient.get(ENDPOINTS.TIP_ATRIBUTA.replace('{id}', tipAtributaId));

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

  getTipoviAtributaDropdown = async () => {
    const { data } = await this.getTipoviAtributa();
    console.log(data);
    return data.map((atribut) => ({
      value: atribut.id,
      label: atribut.naziv,
    }));
  };

  getAtributiPoTipuAtributaDropdown = async (id) => {
    const { data } = await this.getAtributiPoTipuAtributa(id);
    return data.map((atribut) => ({
      value: atribut.id,
      label: atribut.naziv,
    }));
  };
}

export const atributiService = new AtributiService();
