import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces/product.interface";

export interface ICartState {
  cartProducts: IProduct[];
  totalQuantity: number;
  totalAmount: number;
}

export const initialState: ICartState = {
  cartProducts: localStorage.getItem("cartProducts")
    ? JSON.parse(localStorage.getItem("cartProducts")!)
    : [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: IProduct; productQuantity: number }>
    ) => {
      const itemIndex = state.cartProducts.findIndex(
        (item) => item._id === action.payload.product._id
      );

      if (itemIndex >= 0) {
        if (action.payload.productQuantity === 1) {
          state.cartProducts[itemIndex].quantity += 1;
        } else {
          state.cartProducts[itemIndex].quantity +=
            action.payload.productQuantity;
        }
      } else {
        const tempProduct = {
          ...action.payload.product,
          quantity: action.payload.productQuantity,
        };
        state.cartProducts.push(tempProduct);
      }
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const nextCartItems = state.cartProducts.filter(
        (cartItem) => cartItem._id !== action.payload.id
      );

      state.cartProducts = nextCartItems;
    },

    setDecreaseCart: (state, action: PayloadAction<{ id: string }>) => {
      const itemIndex = state.cartProducts.findIndex(
        (cartItem) => cartItem._id === action.payload.id
      );

      if (itemIndex !== -1) {
        const currentQuantity = state.cartProducts[itemIndex].quantity;

        if (currentQuantity > 1) {
          state.cartProducts[itemIndex].quantity = currentQuantity - 1;
        } else if (currentQuantity === 1) {
          state.cartProducts[itemIndex].quantity = 1;
        }
      }
    },

    setIncreaseCart: (state, action: PayloadAction<{ id: string }>) => {
      const itemIndex = state.cartProducts.findIndex(
        (cartItem) => cartItem._id === action.payload.id
      );

      if (itemIndex !== -1) {
        const currentQuantity = state.cartProducts[itemIndex].quantity;

        if (currentQuantity >= 1) {
          state.cartProducts[itemIndex].quantity = currentQuantity + 1;
        }
      }
    },

    setCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const itemIndex = state.cartProducts.findIndex(
        (cartItem) => cartItem._id === action.payload.id
      );

      if (itemIndex !== -1) {
        const currentQuantity = state.cartProducts[itemIndex].quantity;

        if (currentQuantity >= 1) {
          state.cartProducts[itemIndex].quantity = action.payload.quantity;
        }
      }
    },

    clearCart: (state) => {
      state.cartProducts = [];
    },

    getCartTotals: (state) => {
      let { total, quantity } = state.cartProducts.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );

      state.totalQuantity = quantity;
      state.totalAmount = total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setDecreaseCart,
  setIncreaseCart,
  setCartQuantity,
  clearCart,
  getCartTotals,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartReducer;
