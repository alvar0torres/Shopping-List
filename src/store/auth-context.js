import { createSlice } from "@reduxjs/toolkit";

let initialToken = localStorage.getItem("token");
let logged = false;

if (initialToken) {
  logged = true;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { token: initialToken, isLoggedIn: logged },
  reducers: {
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;

      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      console.log("logged out");
    },
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;

      const expiration = Date.now() + 3600000; 

      localStorage.setItem("token", action.payload);
      localStorage.setItem("expiration", expiration);
      console.log("state updated, logged in");
    },
  },
});

export default authSlice;

export const authActions = authSlice.actions;
