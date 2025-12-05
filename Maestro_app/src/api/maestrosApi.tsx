import axios from "axios";

const BASE_URL = "http://192.168.100.8:3000/api";

export const maestrosApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});