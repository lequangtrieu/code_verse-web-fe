import axios from "axios";
import { message } from "antd";
import store from "./store/store";
import { logoutUser, setUserDetails } from "./store/userSlice";
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

const refreshToken = async () => {
  const refreshToken = store.getState().user.refreshToken;
  if (!refreshToken) throw new Error("No refresh token");

  const response = await axios.post(commonApi.refreshToken.url, {
    refreshToken,
  });

  return response.data;
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && originalRequest.url.includes('/auth/refresh')) {
      store.dispatch(logoutUser());
      message.error("Session expired. Please login again.");
      // window.location.href = "/";
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const data = await refreshToken();
        const newAccessToken = data.accessToken;

        store.dispatch(setUserDetails({ 
          user: store.getState().user.user,
          token: newAccessToken,
          refreshToken: store.getState().user.refreshToken,
        }));

        axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;
        originalRequest.headers.Authorization = "Bearer " + newAccessToken;
        
        processQueue(null, newAccessToken);

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        store.dispatch(logoutUser());
        message.error("Session expired. Please login again.");
        // window.location.href = "/";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      const { status } = error.response;
      if (status === 403) {
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
