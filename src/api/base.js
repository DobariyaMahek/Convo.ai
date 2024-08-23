import axios from "axios";
import { authHeader } from "helper/authHelper";

export const API_PREFIX = "";

const axiosApi = axios.create({
  baseURL: "https://195b-2405-201-200d-1932-20f0-e2c7-2c45-91e3.ngrok-free.app/",
});
export const axiosInstance = axiosApi;
export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { params: config, headers: authHeader() })
    .then((response) => response)
    .catch((error) => error.response);
}

export async function patch(url, data, config = {}) {
  return await axiosApi
    .patch(url, { ...data }, { ...config })
    .then((response) => response)
    .catch((error) => error.response);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config, headers: authHeader() })
    .then((response) => response)
    .catch((error) => error.response);
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config }).then((response) => response);
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, { ...config }).then((response) => response);
}

export function isSuccessResp(status) {
  if (status >= 200 && status <= 299) {
    return true;
  }
  return false;
}
