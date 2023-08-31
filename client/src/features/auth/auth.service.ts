import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../interfaces/user.interface";
import { RootState } from "../../store/store";

interface ILoginResponse {
  success: boolean;
  accessToken: string;
  userData: IUser;
}

interface IRegisterResponse {
  succces: boolean;
  message: string;
}

interface ICurrentUserResponse {
  success: boolean;
  userData: IUser;
}

interface IFinalRegister {
  success: boolean;
  message: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);

      return headers;
    },
    credentials: "include",
  }),
  endpoints: (build) => ({
    login: build.mutation<ILoginResponse, { email: string; password: string }>({
      query: (body) => {
        return {
          url: "/users/login",
          method: "POST",
          body,
        };
      },
    }),

    register: build.mutation<
      IRegisterResponse,
      { name: string; email: string; password: string; confirmPassword: string }
    >({
      query: (body) => {
        return {
          url: "/users/register",
          method: "POST",
          body,
        };
      },
    }),

    finalRegister: build.mutation<IFinalRegister, { token: string }>({
      query: (body) => {
        return {
          url: `/users/finalRegister/${body.token}`,
          method: "PUT",
          body,
        };
      },
    }),

    getCurrentUser: build.query<ICurrentUserResponse, void>({
      query: () => "/users/currentUser",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useFinalRegisterMutation,
} = authApi;
