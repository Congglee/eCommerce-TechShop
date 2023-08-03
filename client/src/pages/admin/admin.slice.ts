import { createSlice } from "@reduxjs/toolkit";

export const initialState = [];

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
});

export const {} = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
