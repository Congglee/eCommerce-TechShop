import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IProductState {
  productId: string;
  productSlug: string;
  productSearchValue: string;
  productSeletedSort: string;
  filterPriceGte: string;
  filterPriceLte: string;
  brandFilter: string[];
  showProductFilterMobile: boolean;
}

const initialState: IProductState = {
  productId: "",
  productSlug: "",
  productSearchValue: "",
  productSeletedSort: "",
  filterPriceGte: "",
  filterPriceLte: "",
  brandFilter: [],
  showProductFilterMobile: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductSearchValue: (
      state,
      action: PayloadAction<{ searchValue: string }>
    ) => {
      state.productSearchValue = action.payload.searchValue;
    },

    setProductSeletedSort: (
      state,
      action: PayloadAction<{ selectSort: string }>
    ) => {
      state.productSeletedSort = action.payload.selectSort;
    },

    setFilterPriceGte: (state, action: PayloadAction<{ priceGte: string }>) => {
      state.filterPriceGte = action.payload.priceGte;
    },

    setFilterPriceLte: (state, action: PayloadAction<{ priceLte: string }>) => {
      state.filterPriceLte = action.payload.priceLte;
    },

    setBrandFilter: (state, action: PayloadAction<{ brands: string[] }>) => {
      state.brandFilter = action.payload.brands;
    },

    toggleShowProductFilter: (state, action) => {
      state.showProductFilterMobile = action.payload;
    },
  },
});

export const {
  setProductSeletedSort,
  setFilterPriceGte,
  setFilterPriceLte,
  setBrandFilter,
  toggleShowProductFilter,
  setProductSearchValue,
} = productSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;
