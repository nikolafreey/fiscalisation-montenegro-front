import ApiService from './ApiService';

const ENDPOINTS = {
  BUYERS: 'api/buyers'
};

class BuyerService extends ApiService {
  getBuyers = () => this.apiClient.get(ENDPOINTS.BUYERS);
}

export const buyerService = new BuyerService();