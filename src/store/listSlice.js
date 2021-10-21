import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "lista",
  initialState: { list: []},
  reducers: {
    toggleList(state, action) {
      state.list = action.payload;
    },
    addItem(state, action) {
      state.list.push(action.payload);
    }
  },
});

export default listSlice;

export const listActions = listSlice.actions;
