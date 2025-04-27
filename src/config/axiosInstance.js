import axios from "axios";
import { message } from "antd";
import store from "./store/store";
import commonApi from "../common/api";
import { logoutUser, setUserDetails } from "./store/userSlice";
import getAuthInfo from "./getAuthInfo";

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
  async (error) => {
    const { refreshToken, username } = getAuthInfo();
    const originalRequest = error.config;

    if (refreshToken && !originalRequest._retry) {
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
        const userResponse = await axios.post(commonApi.userDetail.url, { username });

        store.dispatch(
          setUserDetails({
            user: userResponse.data.result,
            token: newAccessToken,
            refreshToken: newRefreshToken,
          })
        );

        localStorage.setItem("token", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        message.success("Session refreshed successfully. Please try again."); 
        return Promise.reject(error);

      } catch (refreshError) {
        store.dispatch(logoutUser());
        message.error("Session expired. Please login again.");
        return Promise.reject(refreshError);
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
