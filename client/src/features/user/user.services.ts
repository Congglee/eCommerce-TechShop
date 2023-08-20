import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";
import { IUser } from "../../interfaces/user.interface";

interface IUpdateUserOrderResponse {
  success: boolean;
  message: string;
}

interface IGetUserResponse {
  success: boolean;
  userData: IUser;
}

interface IUpdateUserByClient {
  success: boolean;
  updatedUser: IUser;
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
      IUpdateUserOrderResponse,
      { address: string; mobile: string }
    >({
      query: (body) => {
        return {
          url: "/users/updateUserOrder",
          method: "PUT",
          body,
        };
      },
    }),

    getUser: build.query<IGetUserResponse, string>({
      query: (id) => `/users/id/${id}`,
    }),

    updateUserByClient: build.mutation<IUpdateUserByClient, IUser | FormData>({
      query: (body) => {
        return {
          url: "/users/updateClient",
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useUpdateUserOrderMutation,
  useGetUserQuery,
  useUpdateUserByClientMutation,
} = userApi;
