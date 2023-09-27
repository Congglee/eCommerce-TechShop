import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IBrandState {
  brandSearchValue: string;
}

export const initialState: IBrandState = {
  brandSearchValue: "",
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrandSearchValue: (
      state,
      action: PayloadAction<{ searchValue: string }>
    ) => {
      state.brandSearchValue = action.payload.searchValue;
    },
  },
});

export const { setBrandSearchValue } = brandSlice.actions;
export const brandReducer = brandSlice.reducer;
export default brandReducer;
