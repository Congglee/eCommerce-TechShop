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

interface IUpdateUserResponse {
  success: boolean;
  updatedUser: IUser;
}

interface IForgotPasswordResponse {
  success: boolean;
  message: string;
}

interface IResetPasswordResponse {
  success: boolean;
  message: string;
}

interface IGetUsersStatResponse {
  success: boolean;
  users: { _id: number; total: number }[];
}

interface IGetUsersResponse {
  success: boolean;
  totalPages: number;
  totalUser: number;
  users: IUser[];
}

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Users"],
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

    getUsers: build.query<
      IGetUsersResponse,
      {
        name?: string;
        sort?: string;
        limit?: string | number;
        page?: string | number;
      }
    >({
      query: ({ name, sort, limit, page }) => {
        let queryString = "users";
        const params = [];

        if (name) params.push(`name=${name}`);
        if (sort) params.push(`sort=${sort}`);
        if (limit) params.push(`limit=${limit}`);
        if (page) params.push(`page=${page}`);

        if (params.length > 0) queryString += `?${params.join("&")}`;

        return queryString;
      },
      providesTags(result, error, params) {
        if (error || !result) {
          return [{ type: "Users", id: "LIST" }];
        }

        const hasFilter = Object.keys(params).some((key) =>
          ["name", "sort", "limit", "page"].includes(key)
        );

        if (hasFilter) {
          return [
            ...result.users.map(({ _id }) => ({
              type: "Users" as const,
              id: _id,
            })),
            { type: "Users" as const, id: "LIST" },
          ];
        }

        return [{ type: "Users" as const, id: "LIST" }];
      },
    }),

    getUser: build.query<IGetUserResponse, string>({
      query: (id) => `/users/id/${id}`,
    }),

    getUsersStats: build.query<IGetUsersStatResponse, void>({
      query: () => `/users/stats`,
      providesTags(result) {
        if (result) {
          const final = [
            ...result.users.map(({ _id }) => ({
              type: "Users" as const,
              id: _id,
            })),
            { type: "Users" as const, id: "LIST" },
          ];
          return final;
        }
        return [{ type: "Users" as const, id: "LIST" }];
      },
    }),

    forgotPassword: build.mutation<IForgotPasswordResponse, { email: string }>({
      query: (body) => {
        return {
          url: "/users/forgotPassword",
          method: "POST",
          body,
        };
      },
    }),

    resetPassword: build.mutation<
      IResetPasswordResponse,
      { password: string; confirmPassword: string; token: string }
    >({
      query: (body) => {
        return {
          url: "/users/resetPassword",
          method: "PUT",
          body,
        };
      },
    }),

    updateUserByClient: build.mutation<IUpdateUserResponse, IUser | FormData>({
      query: (body) => {
        return {
          url: "/users/updateClient",
          method: "PUT",
          body,
        };
      },
    }),

    updateUserByAdmin: build.mutation<
      IUpdateUserResponse,
      { id: string; body: IUser }
    >({
      query: (data) => {
        return {
          url: `/users/updateAdmin/${data.id}`,
          method: "PUT",
          body: data.body,
        };
      },
      invalidatesTags: (result, error, data) =>
        error ? [] : [{ type: "Users", id: data.id }],
    }),

    deleteUser: build.mutation({
      query(id) {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Users", id }],
    }),
  }),
});

export const {
  useUpdateUserOrderMutation,
  useGetUserQuery,
  useUpdateUserByClientMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUsersQuery,
  useUpdateUserByAdminMutation,
  useDeleteUserMutation,
  useGetUsersStatsQuery,
} = userApi;
