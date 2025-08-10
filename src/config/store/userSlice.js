import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user");
const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: token || null,
  refreshToken: refreshToken || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { user, token, refreshToken } = action.payload || {};
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (token) localStorage.setItem("token", token);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

        state.user = user;
        state.token = token || null;
        state.refreshToken = refreshToken || null;
      } else {
        console.warn("setUserDetails: payload.user is null or undefined");
      }
    },

    logoutUser: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },

    setAvatar: (state, action) => {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
  },
});

export const { setUserDetails, logoutUser, setAvatar } = userSlice.actions;

export default userSlice.reducer;
