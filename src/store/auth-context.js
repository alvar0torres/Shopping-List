import { createSlice } from "@reduxjs/toolkit";

let initialToken = localStorage.getItem("token");
let logged = false;

if (initialToken) {
  logged = true;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { token: initialToken, isLoggedIn: logged, userId: ""},
  reducers: {
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
      state.userId = "";

      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      localStorage.removeItem("userId");
      console.log("logged out");
    },
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.userId = action.payload.userId;

      const expiration = Date.now() + 3600000; 

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("expiration", expiration);
      localStorage.setItem("userId", action.payload.userId);
      console.log("state updated, logged in");
    },
  },
});

export default authSlice;

export const authActions = authSlice.actions;
