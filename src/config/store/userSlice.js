import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { user, token, refreshToken } = action.payload || {};
      if (user) {
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
    }
  },
});

export const { setUserDetails, logoutUser, setAvatar } = userSlice.actions;

export default userSlice.reducer;
