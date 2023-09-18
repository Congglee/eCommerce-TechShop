import { createSlice } from "@reduxjs/toolkit";

export interface IProductState {
  productId: string;
  productSlug: string;
  seletedSort: string;
  filterPriceGte: string;
  filterPriceLte: string;
  brandFilter: string[];
  showProductFilterMobile: boolean;
}

const initialState: IProductState = {
  productId: "",
  productSlug: "",
  seletedSort: "",
  filterPriceGte: "",
  filterPriceLte: "",
  brandFilter: [],
  showProductFilterMobile: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSeletedSort: (state, action) => {
      state.seletedSort = action.payload;
    },

    setFilterPriceGte: (state, action) => {
      state.filterPriceGte = action.payload;
    },

    setFilterPriceLte: (state, action) => {
      state.filterPriceLte = action.payload;
    },

    setBrandFilter: (state, action) => {
      state.brandFilter = action.payload;
    },

    toggleShowProductFilter: (state, action) => {
      state.showProductFilterMobile = action.payload;
    },
  },
});

export const {
  setSeletedSort,
  setFilterPriceGte,
  setFilterPriceLte,
  setBrandFilter,
  toggleShowProductFilter,
} = productSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;
