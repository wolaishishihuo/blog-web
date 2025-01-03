import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getApiBaseUrl, isMockEnabled } from "./env";

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 如果启用了 mock，添加相应的标记
    if (isMockEnabled()) {
      config.headers["X-Mock-Enabled"] = "true";
    }

    // 这里可以添加 token 等认证信息
    // const token = getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;

    // 这里可以统一处理响应数据
    if (response.status === 200) {
      return res;
    }

    return Promise.reject(new Error("请求失败"));
  },
  (error) => {
    console.error("请求错误:", error);
    return Promise.reject(error);
  }
);

// 封装通用请求方法
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request.get(url, config);
  },

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return request.post(url, data, config);
  },

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return request.put(url, data, config);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request.delete(url, config);
  },
};

export default request;
