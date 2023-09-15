import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../../interfaces/product.interface";
import { RootState } from "../../store/store";

interface IGetProductsApiResponse {
  success: boolean;
  totalPages: number;
  totalProduct: number;
  products: IProduct[];
}
interface IGetProductApiResponse {
  success: boolean;
  productData: IProduct;
}

interface ICreateProductApiResponse {
  success: boolean;
  createdProduct: IProduct;
}

interface IRatingProductResponse {
  success: boolean;
  updatedProduct: IProduct;
}

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getProducts: build.query<
      IGetProductsApiResponse,
      {
        name?: string;
        sort?: string;
        filterPriceGte?: string;
        filterPriceLte?: string;
        category?: string;
        limit?: string | number;
        page?: string | number;
      }
    >({
      query: ({
        name,
        sort,
        filterPriceGte,
        filterPriceLte,
        category,
        limit,
        page,
      }) => {
        let queryString = "products";
        const params = [];

        if (name) params.push(`name=${name}`);
        if (sort) params.push(`sort=${sort}`);
        if (filterPriceGte) params.push(`price[gte]=${filterPriceGte}`);
        if (filterPriceLte) params.push(`price[lte]=${filterPriceLte}`);
        if (category) params.push(`category=${category}`);
        if (limit) params.push(`limit=${limit}`);
        if (page) params.push(`page=${page}`);

        if (params.length > 0) queryString += `?${params.join("&")}`;

        return queryString;
      },
      providesTags(result, error, params) {
        if (error || !result) {
          return [{ type: "Products", id: "LIST" }];
        }

        // Kiểm tra params gửi lên có chứa key ở dưới không
        const hasFilter = Object.keys(params).some((key) =>
          ["name", "sort", "limit", "page"].includes(key)
        );

        if (hasFilter) {
          return [
            ...result.products.map(({ _id }) => ({
              type: "Products" as const,
              id: _id,
            })),
            { type: "Products" as const, id: "LIST" },
          ];
        }

        return [{ type: "Products" as const, id: "LIST" }];
      },
    }),

    createProduct: build.mutation<
      ICreateProductApiResponse,
      Omit<IProduct, "_id"> | FormData
    >({
      query: (body) => {
        return {
          url: "/products",
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result, error, body) =>
        error ? [] : [{ type: "Products", id: "LIST" }],
    }),

    getProduct: build.query<IGetProductApiResponse, string>({
      query: (slug) => `products/slug/${slug}`,
    }),

    ratingProduct: build.mutation<
      IRatingProductResponse,
      { star: number; id: string; comment: string; date: string }
    >({
      query: (body) => {
        return {
          url: "products/ratings",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, body) =>
        error ? [] : [{ type: "Products", id: body.id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useRatingProductMutation,
  useCreateProductMutation,
} = productApi;
