import { configureStore } from "@reduxjs/toolkit";

import productReducer, {
  IProductState,
} from "../features/product/product.slice";
import { productApi } from "../features/product/product.services";

import categoryReducer from "../features/category/category.slice";
import { categoryApi } from "../features/category/category.services";

import { brandApi } from "../features/brand/brand.services";

import authReducer, { IAuthState } from "../features/auth/auth.slice";
import { authApi } from "../features/auth/auth.service";

import cartReducer, { ICartState } from "../features/cart/cart.slice";
import { cartApi } from "../features/cart/cart.services";

import userReducer from "../features/user/user.slice";
import { userApi } from "../features/user/user.services";

import { orderReducer } from "../features/order/order.slice";
import { orderApi } from "../features/order/order.services";

import appReducer from "../features/app.slice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const commonConfig = {
  key: "tech-shop/user",
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token", "cartProducts", "brandFilter"],
};

const persistedAuthReducer = persistReducer<IAuthState>(
  userConfig,
  authReducer
);

const persistedCartReducer = persistReducer<ICartState>(
  userConfig,
  cartReducer
);

const persistedProductReducer = persistReducer<IProductState>(
  userConfig,
  productReducer
);

export const store = configureStore({
  reducer: {
    product: persistedProductReducer,
    [productApi.reducerPath]: productApi.reducer,

    category: categoryReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,

    auth: persistedAuthReducer,
    [authApi.reducerPath]: authApi.reducer,

    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,

    cart: persistedCartReducer,
    [cartApi.reducerPath]: cartApi.reducer,

    order: orderReducer,
    [orderApi.reducerPath]: orderApi.reducer,

    [brandApi.reducerPath]: brandApi.reducer,

    app: appReducer,
  },

  devTools: import.meta.env.VITE_APP_REDUX_DEVTOOL !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(authApi.middleware)
      .concat(cartApi.middleware)
      .concat(userApi.middleware)
      .concat(orderApi.middleware)
      .concat(brandApi.middleware),
});

// store.dispatch(getCartTotals());

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
