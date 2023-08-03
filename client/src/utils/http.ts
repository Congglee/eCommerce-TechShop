import axios, { AxiosInstance } from "axios";
class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
      timeout: 10000,
    });
  }
}

export const http = new Http().instance;
