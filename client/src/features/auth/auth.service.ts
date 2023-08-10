import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_URL }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/users/login",
          method: "POST",
          body,
        };
      },
    }),
    register: build.mutation({
      query: (body: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
      }) => {
        return {
          url: "/users/register",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
