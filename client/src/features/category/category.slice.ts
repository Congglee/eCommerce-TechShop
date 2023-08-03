import { createSlice } from "@reduxjs/toolkit";

export const initialState = [];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
});

export const {} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
export default categoryReducer;
