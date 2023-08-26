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
  response: IOrder[];
}

interface IGetOrderDetailResponse {
  success: true;
  response: IOrder;
}

interface IUpdateStatusOrderClientResponse {
  success: boolean;
  response: IOrder;
}

export const orderApi = createApi({
  reducerPath: "orderApi",
  tagTypes: ["Orders"],
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
        date: string;
      }
    >({
      query: (body) => {
        return {
          url: "/orders/",
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result, error, body) =>
        error ? [] : [{ type: "Orders", id: "LIST" }],
    }),

    createCheckoutSession: build.mutation({
      query: (body: { cartProducts: IProduct[]; userId: string }) => {
        return {
          url: "/stripe/create-checkout-session",
          method: "POST",
          mode: "no-cors",
          body,
        };
      },
    }),

    getUserOrder: build.query<IGetUserOrderResponse, void>({
      query: () => "/orders/user",
      providesTags(result) {
        if (result) {
          const final = [
            ...result.response.map(({ _id }) => ({
              type: "Orders" as const,
              id: _id,
            })),
            { type: "Orders" as const, id: "LIST" },
          ];
          return final;
        }
        return [{ type: "Orders" as const, id: "LIST" }];
      },
    }),

    getOrderDetail: build.query<IGetOrderDetailResponse, string>({
      query: (id) => `orders/user/${id}`,
    }),

    updateStatusOrderClient: build.mutation<
      IUpdateStatusOrderClientResponse,
      { id: string; body: IOrder }
    >({
      query: (data) => {
        return {
          url: `/orders/user/status/${data.id}`,
          method: "PUT",
          body: data.body,
        };
      },
      invalidatesTags: (result, error, data) =>
        error ? [] : [{ type: "Orders", id: data.id }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrderQuery,
  useGetOrderDetailQuery,
  useUpdateStatusOrderClientMutation,
  useCreateCheckoutSessionMutation,
} = orderApi;
