// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError, AxiosHeaders } from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config) => {
    // Handle token here ...
    // const token = localStorage.getItem("token");

    // if (token)
    //   (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => {
    // if (response && response.data) {
    //   return response.data;
    // }
    return response;
  },
  (error) => {
    // Handle errors
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log(error);
      localStorage.removeItem("token");
      axiosClient.defaults.headers.common["Authorization"] = `Bearer`;
      window.location.replace("/login");
      return Promise.reject(error);
    } else {
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
