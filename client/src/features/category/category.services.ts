import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory } from "../../interfaces/category.interface";
import { RootState } from "../../store/store";

interface IGetCategoriesResponse {
  success: boolean;
  totalPages: number;
  totalCategory: number;
  categories: ICategory[];
}

interface IGetCategoryResponse {
  success: boolean;
  productCategory: ICategory;
}

interface IDeleteCategoryResponse {
  success: boolean;
  message: string;
  category: ICategory;
}

interface ICreateCategoryResponse {
  success: boolean;
  createdCategory: ICategory;
}

interface IUpdateCategoryResponse {
  success: boolean;
  updatedCategory: ICategory;
}

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  tagTypes: ["Categories"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getCategories: build.query<
      IGetCategoriesResponse,
      {
        name?: string;
        sort?: string;
        limit?: string | number;
        page?: string | number;
      }
    >({
      query: ({ name, sort, limit, page }) => {
        let queryString = "categories";
        const params = [];

        if (name) params.push(`name=${encodeURIComponent(name)}`);
        if (sort) params.push(`sort=${sort}`);
        if (limit) params.push(`limit=${limit}`);
        if (page) params.push(`page=${page}`);

        if (params.length > 0) queryString += `?${params.join("&")}`;

        return queryString;
      },
      providesTags(result) {
        if (result) {
          const final = [
            ...result.categories.map(({ _id }) => ({
              type: "Categories" as const,
              id: _id,
            })),
            { type: "Categories" as const, id: "LIST" },
          ];
          return final;
        }
        return [{ type: "Categories", id: "LIST" }];
      },
    }),

    getCategory: build.query<IGetCategoryResponse, string>({
      query: (id) => `/categories/${id}`,
    }),

    createCategory: build.mutation<
      ICreateCategoryResponse,
      Omit<ICategory, "_id">
    >({
      query: (body) => {
        return {
          url: "/categories",
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result, error, body) =>
        error ? [] : [{ type: "Categories", id: "LIST" }],
    }),

    updateCategory: build.mutation<
      IUpdateCategoryResponse,
      { id: string; body: ICategory }
    >({
      query: (data) => {
        return {
          url: `/categories/${data.id}`,
          method: "PUT",
          body: data.body,
        };
      },
      invalidatesTags: (result, error, data) =>
        error ? [] : [{ type: "Categories", id: data.id }],
    }),

    deleteCategory: build.mutation<IDeleteCategoryResponse, string>({
      query(id) {
        return {
          url: `/categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Categories", id }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApi;
