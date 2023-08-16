import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";

interface IUpdateUserOrder {
  success: boolean;
  message: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    updateUserOrder: build.mutation<
      IUpdateUserOrder,
      { address: string; mobile: string }
    >({
      query: (body: { address: string; mobile: string }) => {
        return {
          url: "/users/updateUserOrder",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const { useUpdateUserOrderMutation } = userApi;
