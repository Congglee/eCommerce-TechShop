import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";
import { IOrder } from "../../interfaces/order.interface";
import { IProduct } from "../../interfaces/product.interface";

interface ICreateOrderResponse {
  success: true;
  response: IOrder;
}

interface IGetUserOrderResponse {
  success: true;
  response: IOrder;
}

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    createOrder: build.mutation<
      ICreateOrderResponse,
      {
        cart: IProduct[];
        payment: string;
        address: string;
        mobile: string;
      }
    >({
      query: (body: {
        cart: IProduct[];
        payment: string;
        address: string;
        mobile: string;
      }) => {
        return {
          url: "/orders/",
          method: "POST",
          body,
        };
      },
    }),

    getUserOrder: build.query<IGetUserOrderResponse, void>({
      query: () => "/orders/",
    }),
  }),
});

export const { useCreateOrderMutation, useGetUserOrderQuery } = orderApi;
