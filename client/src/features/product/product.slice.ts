import { createSlice } from "@reduxjs/toolkit";

interface IProductState {
  productId: string;
  productSlug: string;
}

const initialState: IProductState = {
  productId: "",
  productSlug: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export const {} = productSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;
