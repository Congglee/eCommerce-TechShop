import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";
import { IUser } from "../../interfaces/user.interface";

interface IUpdateUserCartResponse {
  success: boolean;
  updatedUser: IUser;
  message: string;
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (build) => ({
    addToCart: build.mutation({
      query: (body: { id: string; quantity: number }) => {
        return {
          url: "/users/updateCart",
          method: "PUT",
          body,
        };
      },
    }),

    updateCarts: build.mutation<
      IUpdateUserCartResponse,
      { cart: { product: string; quantity: number }[] }
    >({
      query: (body: { cart: { product: string; quantity: number }[] }) => {
        return {
          url: "/users/updateCarts",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const { useUpdateCartsMutation, useAddToCartMutation } = cartApi;
