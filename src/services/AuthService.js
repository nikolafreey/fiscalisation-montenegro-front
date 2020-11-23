import ApiService from './ApiService';

const ENDPOINTS = {
  LOGIN: 'login',
  CSRF: 'sanctum/csrf-cookie'
};

class AuthService extends ApiService {
  login = (email, password) => this.apiClient.post(ENDPOINTS.LOGIN, {email, password});

  getCsrfCookie = () => this.apiClient.get(ENDPOINTS.CSRF);
}

export const authService = new AuthService();