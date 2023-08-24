import { createSlice } from "@reduxjs/toolkit";

interface IProductState {
  productId: string;
  productSlug: string;
  seletedSort: string;
  filterPriceGte: string;
  filterPriceLte: string;
}

const initialState: IProductState = {
  productId: "",
  productSlug: "",
  seletedSort: "",
  filterPriceGte: "",
  filterPriceLte: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSeletedSort(state, action) {
      state.seletedSort = action.payload;
    },

    setFilterPriceGte(state, action) {
      state.filterPriceGte = action.payload;
    },

    setFilterPriceLte(state, action) {
      state.filterPriceLte = action.payload;
    },
  },
});

export const { setSeletedSort, setFilterPriceGte, setFilterPriceLte } =
  productSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;
