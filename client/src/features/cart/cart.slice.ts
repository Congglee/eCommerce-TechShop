import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "../../interfaces/product.interface";

export interface ICartState {
  cartProducts: ICartItem[];
  totalQuantity: number;
  totalAmount: number;
}

export const initialState: ICartState = {
  cartProducts: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: ICartItem; productQuantity: number }>
    ) => {
      const itemIndex = state.cartProducts.findIndex(
        (item) => item._id === action.payload.product._id
      );

      if (itemIndex >= 0) {
        if (action.payload.productQuantity === 1) {
          state.cartProducts[itemIndex].cartQuantity += 1;
        } else {
          state.cartProducts[itemIndex].cartQuantity +=
            action.payload.productQuantity;
        }
      } else {
        const tempProduct = {
          ...action.payload.product,
          cartQuantity: action.payload.productQuantity,
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
        const currentQuantity = state.cartProducts[itemIndex].cartQuantity;
        if (currentQuantity > 1) {
          state.cartProducts[itemIndex].cartQuantity = currentQuantity - 1;
        } else if (currentQuantity === 1) {
          state.cartProducts[itemIndex].cartQuantity = 1;
        }
      }
    },

    setIncreaseCart: (state, action: PayloadAction<{ id: string }>) => {
      const itemIndex = state.cartProducts.findIndex(
        (cartItem) => cartItem._id === action.payload.id
      );

      if (itemIndex !== -1) {
        const currentQuantity = state.cartProducts[itemIndex].cartQuantity;
        if (currentQuantity < state.cartProducts[itemIndex].quantity) {
          if (currentQuantity >= 1) {
            state.cartProducts[itemIndex].cartQuantity = currentQuantity + 1;
          }
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
        const currentQuantity = state.cartProducts[itemIndex].cartQuantity;

        if (currentQuantity >= 1) {
          state.cartProducts[itemIndex].cartQuantity = action.payload.quantity;
        }
      }
    },

    clearCart: (state) => {
      state.cartProducts = [];
    },

    getCartTotals: (state) => {
      let { total, quantity } = state.cartProducts.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

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
