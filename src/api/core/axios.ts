import axios from "axios";

axios.defaults.withCredentials = true;
const service = axios.create({
  baseURL: "/api",
  timeout: 600000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use((res) => {
  return res;
});

export default service;
