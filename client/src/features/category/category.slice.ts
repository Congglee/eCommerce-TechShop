import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICategoryState {
  categorySearchValue: string;
  categorySeletedSort: string;
}

export const initialState: ICategoryState = {
  categorySearchValue: "",
  categorySeletedSort: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategorySearchValue: (
      state,
      action: PayloadAction<{ searchValue: string }>
    ) => {
      state.categorySearchValue = action.payload.searchValue;
    },

    setCategorySelectedSort: (
      state,
      action: PayloadAction<{ selectSort: string }>
    ) => {
      state.categorySeletedSort = action.payload.selectSort;
    },
  },
});

export const { setCategorySearchValue, setCategorySelectedSort } =
  categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
export default categoryReducer;
