import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/product.interface";

export interface ICartState {
  isDisplay: boolean;
  cartProducts: IProduct[];
}

export const initialState: ICartState = {
  isDisplay: false,
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    displayCart: (state) => {
      state.isDisplay = !state.isDisplay;
    },
    addToCart: (state, action) => {
      state.cartProducts.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
  },
});

export const { displayCart, addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartReducer;
