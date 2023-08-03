import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../../@types/product.interface";

interface IGetAllApiResponse {
  success: boolean;
  totalPages: number;
  totalProduct: number;
  products: IProduct[];
}
interface IGetOneApiResponse {
  success: boolean;
  productData: IProduct;
}

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_URL }),
  endpoints: (build) => ({
    getProducts: build.query<
      IGetAllApiResponse,
      {
        name?: string;
        sort?: string;
        filterPriceGte?: string;
        filterPriceLte?: string;
        category?: string;
        limit?: string | number;
        page?: string;
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
        if (name) {
          params.push(`name=${encodeURIComponent(name)}`);
        }
        if (sort) {
          params.push(`sort=${encodeURIComponent(sort)}`);
        }
        if (filterPriceGte) {
          params.push(`price[gte]=${encodeURIComponent(filterPriceGte)}`);
        }
        if (filterPriceLte) {
          params.push(`price[lte]=${encodeURIComponent(filterPriceLte)}`);
        }
        if (category) {
          params.push(`category=${encodeURIComponent(category)}`);
        }
        if (limit) {
          params.push(`limit=${encodeURIComponent(limit)}`);
        }
        if (page) {
          params.push(`page=${encodeURIComponent(page)}`);
        }
        if (params.length > 0) {
          queryString += `?${params.join("&")}`;
        }
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
              _id,
            })),
            { type: "Products" as const, id: "LIST" },
          ];
        }

        return [{ type: "Products", id: "LIST" }];
      },
    }),
    getProduct: build.query<IGetOneApiResponse, string>({
      query: (id) => `products/id/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
