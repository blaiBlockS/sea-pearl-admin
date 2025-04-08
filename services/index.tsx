import axios from "axios";

export const clientAxios = axios.create({
  baseURL: "https://seapearladmin-u4lugvc76a-uc.a.run.app/",
  // withCredentials: true, // 쿠키 포함 시
});

export const serverAxios = axios.create({
  baseURL: "https://seapearladmin-u4lugvc76a-uc.a.run.app/",
  timeout: 5000,
});

clientAxios.interceptors.request.use((config) => {
  return config;
});
