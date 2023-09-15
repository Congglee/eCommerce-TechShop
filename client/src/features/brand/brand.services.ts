import { IBrand } from "./../../interfaces/brand.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";

interface IGetBrandsResponse {
  success: boolean;
  brands: IBrand[];
}

export const brandApi = createApi({
  reducerPath: "brandApi",
  tagTypes: ["Brands"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getBrands: build.query<IGetBrandsResponse, void>({
      query: () => "/brands",
      providesTags(result) {
        if (result) {
          const final = [
            ...result.brands.map(({ _id }) => ({
              type: "Brands" as const,
              id: _id,
            })),
            { type: "Brands" as const, id: "LIST" },
          ];
          return final;
        }

        return [{ type: "Brands" as const, id: "LIST" }];
      },
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
