import ApiService from './ApiService';
import httpService from './HttpService';

const ENDPOINTS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  ME: 'me',
  CSRF: 'sanctum/csrf-cookie',
  FORGOT: 'password/email',
  RESET: 'password/reset',
};

class AuthService extends ApiService {
  constructor() {
    super();
    httpService.setUnauthorizedCallback(() =>
      this.setAuthenticatedStorage(false)
    );
  }

  login = (credentials) => this.apiClient.post(ENDPOINTS.LOGIN, credentials);

  getCsrfCookie = () => this.apiClient.get(ENDPOINTS.CSRF);

  isAuthenticated = () => localStorage.getItem('isAuthenticated');

  logout = () => this.apiClient.post(ENDPOINTS.LOGOUT);

  getUser = () => this.apiClient.get(ENDPOINTS.ME);

  forgotPassword = (data) => this.apiClient.post(ENDPOINTS.FORGOT, data);

  resetPassword = (data) => this.apiClient.post(ENDPOINTS.RESET, data);

  setAuthenticatedStorage = (authenticated, token) => {
    if (authenticated) {
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
    }
  };
}

export const authService = new AuthService();
