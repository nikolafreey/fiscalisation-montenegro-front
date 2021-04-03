import ApiService from './ApiService';

const ENDPOINTS = {
  DEPOZITWITHDRAW: 'depozit-withdraws',
  DEPOZITTODAY: 'get-depozit-today',
};

class DepozitWithdrawService extends ApiService {
  getDepozitWithdraw = (params) =>
    this.apiClient.get(ENDPOINTS.DEPOZITWITHDRAW, { params });

  getDepozitToday = () => this.apiClient.get(ENDPOINTS.DEPOZITTODAY);

  storeDepozitWithdraw = (data) =>
    this.apiClient.post(ENDPOINTS.DEPOZITWITHDRAW, data);
}

export const depozitWithdrawService = new DepozitWithdrawService();
