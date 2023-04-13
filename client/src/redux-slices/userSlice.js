import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { email: null, userName: null, id: null },
  email: { email: null },
  value: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user.email = action.payload.email;
    },
    removeUserInfo: (state, action) => {
      state.user.email = null;
      state.user.userName = null;
      state.user.id = null;
      state.email = null;
    },
    setUser: (state, action) => {
      state.user.email = action.payload.email;
      state.user.userName = action.payload.userName;
      state.user.id = action.payload.id;
    },
  },
});

export const { setUserInfo, removeUserInfo, setUser } = userSlice.actions;

export default userSlice.reducer;
