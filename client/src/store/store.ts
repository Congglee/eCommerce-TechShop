import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/product.slice";
import { productApi } from "../features/product/product.services";
import categoryReducer from "../features/category/category.slice";
import { categoryApi } from "../features/category/category.services";
import authReducer, { IAuthState } from "../features/auth/auth.slice";
import { authApi } from "../features/auth/auth.service";
import cartReducer from "../features/cart/cart.slice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const commonConfig = {
  key: "tech-shop/user",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token"],
};

const persistedAuthReducer = persistReducer<IAuthState>(
  userConfig,
  authReducer
);

export const store = configureStore({
  reducer: {
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,

    category: categoryReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,

    auth: persistedAuthReducer,
    [authApi.reducerPath]: authApi.reducer,

    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(authApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
