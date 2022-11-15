import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "development" ? "https://sk.amics-tech.ru/api" : "/api";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use(
  config => {
    return {
      ...config,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
  },
  error => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}
