import axios from 'axios';

import { BASE_URL } from '../config';

class HttpService {
  constructor(options = {}) {
    this.client = axios.create(options);
    this.client.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
    this.unauthorizedCallback = () => {};
  }

  handleSuccessResponse(response) {
    return response;
  }

  handleErrorResponse = error => {
    try {
      const { status } = error.response;

      switch (status) {
      case 401:
        this.unauthorizedCallback();

        break;
      default:
        break;
      }

      return Promise.reject(error);
    } catch (e) {
      return Promise.reject(error);
    }
  };
  
  setUnauthorizedCallback(callback) {
    this.unauthorizedCallback = callback;
  }
}


const options = {
  baseURL: BASE_URL,
  withCredentials: true,
}



const httpService = new HttpService(options);

export default httpService;