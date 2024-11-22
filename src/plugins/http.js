import axios from 'axios';
import {ref} from "vue";

import {Loading} from 'quasar';

import {apiTimeoutInMs} from "src/config/constants";
import {triggerNegative} from "src/plugins/notify";

const PROD = import.meta.env.PROD;

export function getBaseUrl() {
  if (PROD) {
    return import.meta.env.VITE_API_URL_PROD;
  }
  return import.meta.env.VITE_API_URL_DEV;
}

export class MyFetch {
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: apiTimeoutInMs,
      ...options,
    });
    this.isFetching = ref(false);
  }

  errorHandling(error, statusCode) {
    let messages = [];
    error.message && messages.push(error.message);
    error.response?.data?.message && messages.push(error.response.data.message);
    error.statusText && messages.push(error.statusText);
    statusCode && statusCode !== 200 && messages.push(`Something went wrong. Status code ${statusCode}`);
    messages.length > 0 && triggerNegative({message: messages.join('... '), position: 'center', multiLine: true});
  }

  static generateUrl(url, params = {}) {
    const query = new URLSearchParams(params).toString();
    return url + '?' + query;
  }

  async request(method, url, data = {}, options = {}) {
    try {
      this.isFetching.value = true;
      Loading.show();
      const response = await this.axiosInstance[method](url, method === 'get' ? options : data, options);
       return {
        error: null,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      this.errorHandling(error, error.response?.status);
      return {
        error: error,
        data: null,
        status: error.response?.status,
      };
    } finally {
      this.isFetching.value = false;
      Loading.hide();
    }
  }

  async get(url, options = {}) {
    return this.request('get', url, {}, options);
  }

  async post(url, data = {}, options = {}) {
    return this.request('post', url, data, options);
  }

}

export const API_BASE_URL = getBaseUrl();
export const api = () => new MyFetch(API_BASE_URL);
