import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/product.slice";
import { productApi } from "../features/product/product.services";
import categoryReducer from "../features/category/category.slice";
import { categoryApi } from "../features/category/category.services";
import authReducer from "../features/auth/auth.slice";
import { authApi } from "../features/auth/auth.service";
import cartReducer from "../features/cart/cart.slice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,

    category: categoryReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,

    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,

    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
