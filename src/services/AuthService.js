import ApiService from './ApiService';

const ENDPOINTS = {
  LOGIN: 'login',
  CSRF: 'sanctum/csrf-cookie'
};

class AuthService extends ApiService {
  login = (email, password) => this.apiClient.post(ENDPOINTS.LOGIN, {email, password});

  getCsrfCookie = () => this.apiClient.get(ENDPOINTS.CSRF);

  isAuthenticated = () => localStorage.getItem('isAuthenticated');

  setAuthenticatedStorage = (authenticated) => 
    localStorage.setItem('isAuthenticated', authenticated);

}

export const authService = new AuthService();