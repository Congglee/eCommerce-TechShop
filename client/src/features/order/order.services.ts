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

interface IUpdateStatusOrderResponse {
  success: boolean;
  response: IOrder;
}

interface IGetOrdersResponse {
  success: boolean;
  totalPages: number;
  totalOrder: number;
  orders: IOrder[];
}

interface IGetOrdersStatResponse {
  success: boolean;
  orders: { _id: number; total: number }[];
}

interface IGetOrdersIncomeResponse {
  success: boolean;
  ordersIncome: { _id: number; total: number }[];
}

interface IGetMonthlySalesResponse {
  success: boolean;
  monthlySalesOrders: { _id: number; total: number }[];
}

export const orderApi = createApi({
  reducerPath: "orderApi",
  tagTypes: ["Orders", "AdminOrders"],
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

    getOrdersByAdmin: build.query<
      IGetOrdersResponse,
      {
        orderCode?: string;
        sort?: string;
        orderStatus?: string;
        limit?: string | number;
        page?: string | number;
      }
    >({
      query: ({ orderCode, sort, orderStatus, limit, page }) => {
        let queryString = "/orders/admin";
        const params = [];

        if (orderCode)
          params.push(`orderCode=${encodeURIComponent(orderCode)}`);
        if (sort) params.push(`sort=${encodeURIComponent(sort)}`);

        if (orderStatus)
          params.push(`orderStatus=${encodeURIComponent(orderStatus)}`);
        if (limit) params.push(`limit=${encodeURIComponent(limit)}`);
        if (page) params.push(`page=${encodeURIComponent(page)}`);

        if (params.length > 0) queryString += `?${params.join("&")}`;

        return queryString;
      },
      providesTags(result, error, params) {
        if (error || !result) {
          return [{ type: "AdminOrders", id: "LIST" }];
        }

        const hasFilter = Object.keys(params).some((key) =>
          ["name", "sort", "limit", "page"].includes(key)
        );

        if (hasFilter) {
          return [
            ...result.orders.map(({ _id }) => ({
              type: "AdminOrders" as const,
              id: _id,
            })),
            { type: "AdminOrders" as const, id: "LIST" },
          ];
        }

        return [{ type: "AdminOrders" as const, id: "LIST" }];
      },
    }),

    getOrderDetail: build.query<IGetOrderDetailResponse, string>({
      query: (id) => `/orders/user/${id}`,
    }),

    getOrdersStats: build.query<IGetOrdersStatResponse, void>({
      query: () => "/orders/stats",
      providesTags(result) {
        return [{ type: "Orders" as const, id: "LIST" }];
      },
    }),

    getOrdersIncome: build.query<IGetOrdersIncomeResponse, void>({
      query: () => "/orders/income/stats",
      providesTags(result) {
        return [{ type: "Orders" as const, id: "LIST" }];
      },
    }),

    updateStatusOrderClient: build.mutation<
      IUpdateStatusOrderResponse,
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

    getMonthlySale: build.query<IGetMonthlySalesResponse, void>({
      query: () => "/orders/monthlysales",
      providesTags(result) {
        return [{ type: "Orders" as const, id: "LIST" }];
      },
    }),

    updateOrderAdmin: build.mutation<
      IUpdateStatusOrderResponse,
      { id: string; body: IOrder }
    >({
      query: (data) => {
        return {
          url: `/orders/admin/status/${data.id}`,
          method: "PUT",
          body: data.body,
        };
      },
      invalidatesTags: (result, error, data) =>
        error ? [] : [{ type: "AdminOrders", id: data.id }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrderQuery,
  useGetOrderDetailQuery,
  useUpdateStatusOrderClientMutation,
  useCreateCheckoutSessionMutation,
  useGetOrdersByAdminQuery,
  useUpdateOrderAdminMutation,
  useGetOrdersStatsQuery,
  useGetOrdersIncomeQuery,
  useGetMonthlySaleQuery,
} = orderApi;
