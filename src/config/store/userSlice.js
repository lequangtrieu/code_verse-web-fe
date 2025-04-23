import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { user, token } = action.payload || {};
      if (user) {
        state.user = user;
        state.token = token || null;
      } else {
        console.warn("setUserDetails: payload.user is null or undefined");
      }
    },

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUserDetails, logoutUser } = userSlice.actions;

export default userSlice.reducer;
