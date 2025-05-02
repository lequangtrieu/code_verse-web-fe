import axios from "axios";
import { message } from "antd";
import store from "./store/store";
import commonApi from "../common/api";
import { logoutUser, setUserDetails } from "./store/userSlice";
import getAuthInfo from "./getAuthInfo";
import setAuthInfo from "./setAuthInfo";

const axiosInstance = axios.create({
  baseURL: commonApi.default,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const {token } = getAuthInfo();
    if (token && token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshToken, username } = getAuthInfo();
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          commonApi.refreshToken.url,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const newAccessToken = refreshResponse.data.token;
        const newRefreshToken = refreshResponse.data.refreshToken;
        const userResponse = await axios.post(commonApi.userDetail.url, {
          username,
        });

        store.dispatch(
          setUserDetails({
            user: userResponse.data.result,
            token: newAccessToken,
            refreshToken: newRefreshToken,
          })
        );

        setAuthInfo({
          username,
          token: newAccessToken,
          refreshToken: newRefreshToken,
        });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutUser());
        message.error("Session expired. Please login again.");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
