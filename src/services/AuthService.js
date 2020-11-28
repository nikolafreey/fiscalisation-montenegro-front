import ApiService from './ApiService';

const ENDPOINTS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  ME: 'api/me',
  CSRF: 'sanctum/csrf-cookie'
};

class AuthService extends ApiService {

  login = (credentials) => this.apiClient.post(ENDPOINTS.LOGIN, credentials);

  getCsrfCookie = () => this.apiClient.get(ENDPOINTS.CSRF);

  isAuthenticated = () => localStorage.getItem('isAuthenticated');

  logout = () => this.apiClient.post(ENDPOINTS.LOGOUT);

  getUser = () => this.apiClient.get(ENDPOINTS.ME)

  setAuthenticatedStorage = (authenticated) => {
    if (authenticated) localStorage.setItem('isAuthenticated', true);
    else localStorage.removeItem('isAuthenticated');
  }

}

export const authService = new AuthService();