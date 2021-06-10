import ApiService from './ApiService';

const ENDPOINTS = {
  PARTNERI: 'partneri',
  PARTNER: 'partneri/{id}',
};

class PartneriService extends ApiService {
  getPartneri = (params) => this.apiClient.get(ENDPOINTS.PARTNERI, { params });

  storePartner = (data) => this.apiClient.post(ENDPOINTS.PARTNERI, data);

  getPartner = (id) =>
    this.apiClient.get(ENDPOINTS.PARTNER.replace('{id}', id));

  updatePartner = (data) =>
    this.apiClient.put(ENDPOINTS.PARTNER.replace('{id}', data.id), data);

  deletePartner = (id) =>
    this.apiClient.delete(ENDPOINTS.PARTNER.replace('{id}', id));

  getPartneriDropdown = async (search) => {
    if (search === '') search = null;
    let filtered = search;
    if (search) {
      filtered = search.replace(/[^0-9a-zA-Zžćšđč]/gi, '');
    }
    const response = await this.getPartneri(filtered);
    console.log('partneriSeach', filtered);
    console.log('getPartneriDropdown:', response.data.data);
    if (response.data.data) {
      return response.data.data.map((partner) => ({
        value: partner.id,
        label: !partner.fizicko_lice_id
          ? partner.preduzece_partner?.kratki_naziv
          : partner.fizicko_lice.ime + ' ' + partner.fizicko_lice.prezime,
      }));
    }
  };
}

export const partneriService = new PartneriService();
