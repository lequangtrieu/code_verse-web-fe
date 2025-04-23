import axios from "axios";
import { message } from "antd";
import store from "./store/store";
import commonApi from "../common/api";

const axiosInstance = axios.create({
  baseURL: commonApi.default,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        message.error("Unauthorized. Please login again.");
      } else if (status === 403) {
        message.warning("You don’t have permission to perform this action.");
      } else if (status >= 500) {
        message.error("Server error. Try again later.");
      }
    } else {
      message.error("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
