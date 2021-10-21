import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-context";
import listSlice from "./listSlice";

const store = configureStore({
  reducer: { list: listSlice.reducer, auth: authSlice.reducer },
});

export default store;
