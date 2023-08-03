import { createSlice } from "@reduxjs/toolkit";

interface IProductState {
  productId: string;
}

const initialState: IProductState = {
  productId: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export const {} = productSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;
