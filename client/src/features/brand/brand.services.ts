import { IBrand } from "./../../interfaces/brand.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";

interface IGetBrandsResponse {
  success: boolean;
  totalPages: number;
  totalBrand: number;
  brands: IBrand[];
}

interface IGetBrandResponse {
  success: boolean;
  brand: IBrand;
}
interface ICreateBrandResponse {
  success: boolean;
  createdBrand: IBrand;
}

interface IUpdateBrandResponse {
  success: boolean;
  updatedBrand: IBrand;
}

interface IDeleteBrandResponse {
  success: boolean;
  message: string;
  deletedBrand: IBrand;
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
    getBrands: build.query<
      IGetBrandsResponse,
      {
        title?: string;
        sort?: string;
        limit?: string | number;
        page?: string | number;
      }
    >({
      query: ({ title, sort, limit, page }) => {
        let queryString = "brands";
        const params = [];

        if (title) params.push(`title=${encodeURIComponent(title)}`);
        if (sort) params.push(`sort=${sort}`);
        if (limit) params.push(`limit=${limit}`);
        if (page) params.push(`page=${page}`);

        if (params.length > 0) queryString += `?${params.join("&")}`;

        return queryString;
      },
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

    getBrand: build.query<IGetBrandResponse, string>({
      query: (id) => `/brands/${id}`,
    }),

    createBrand: build.mutation<ICreateBrandResponse, Omit<IBrand, "_id">>({
      query: (body) => {
        return {
          url: "/brands",
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result, error, body) =>
        error ? [] : [{ type: "Brands", id: "LIST" }],
    }),

    updateBrand: build.mutation<
      IUpdateBrandResponse,
      { id: string; body: IBrand }
    >({
      query: (data) => {
        return {
          url: `/brands/${data.id}`,
          method: "PUT",
          body: data.body,
        };
      },
      invalidatesTags: (result, error, data) =>
        error ? [] : [{ type: "Brands", id: data.id }],
    }),

    deleteBrand: build.mutation<IDeleteBrandResponse, string>({
      query(id) {
        return {
          url: `/brands/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Brands", id }],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useDeleteBrandMutation,
  useCreateBrandMutation,
  useGetBrandQuery,
  useUpdateBrandMutation,
} = brandApi;
