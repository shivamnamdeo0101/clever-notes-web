// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
      };
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
