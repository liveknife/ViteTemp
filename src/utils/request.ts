import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

export const axiosInstance = axios.create({})

// Interceptors
axiosInstance.interceptors.request.use(
  (config): AdaptAxiosRequestConfig => {
    // console.log(config, '请求成功----->>>>>')
    return config;
  },
  (error): any => {
    // console.log(error, '请求失败----->>>>>')
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response): Promise<any> => {
    // console.log(response, '响应成功----->>>>>')
    return response.data;
  },
  async (error): Promise<any> => {
    // console.log(error, '响应失败----->>>>>')
    return Promise.reject(error);
  }
);