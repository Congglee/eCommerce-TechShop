import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import icons from "../../utils/icons";
import { useGetProductsQuery } from "../../features/product/product.services";
import { IProduct } from "../../interfaces/product.interface";
import {
  CategorySideMenu,
  Pagination,
  ProductFilter,
  ProductFilterMobile,
  ProductItem,
} from "../../components/guest";
import { useQueryString } from "../../hooks/useQueryString";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setBrandFilter,
  setFilterPriceGte,
  setFilterPriceLte,
  setSeletedSort,
  toggleShowProductFilter,
} from "../../features/product/product.slice";
import { formatCurrency, generateSearchParamsURL } from "../../utils/fn";
import Breadcrumb from "../../components/guest/Breadcrumb/Breadcrumb";
import { useGetBrandsQuery } from "../../features/brand/brand.services";

const { FiFilter } = icons;

type Props = {};

const ProductPage = (props: Props) => {
  const { brandFilter, showProductFilterMobile } = useSelector(
    (state: RootState) => state.product
  );
  const [filterPriceUrl, setFilterPriceUrl] = useState("");
  const queryString: {
    name?: string;
    sort?: string;
    brand?: string;
    page?: string;
    price_filter_gte?: string;
    price_filter_lte?: string;
  } = useQueryString();
  const { name, sort, price_filter_gte, price_filter_lte, brand, page } =
    queryString;
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isFetching } = useGetProductsQuery({
    name: name || "",
    sort: sort || "",
    filterPriceGte: price_filter_gte || "",
    filterPriceLte: price_filter_lte || "",
    brand: brand || "",
    category: category,
    page: page || 1,
    limit: import.meta.env.VITE_APP_LIMIT_PRODUCT_PER_PAGE || 6,
  });
  const { data: brandsData } = useGetBrandsQuery();

  const highestPriceProduct = data?.products.reduce(
    (prevProduct, currentProduct) => {
      if (currentProduct.price > prevProduct.price) {
        return currentProduct;
      }
      return prevProduct;
    },
    data?.products[0]
  );

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setSeletedSort(value));
    const isCategoryUrl: boolean = category ? true : false;
    const sortUrl = generateSearchParamsURL({
      name,
      sort: value,
      price_filter_gte,
      price_filter_lte,
      brand,
      page,
      isCategory: isCategoryUrl,
      categoryUrlValue: category,
      isAdmin: false,
      adminUrlValue: "",
    });
    navigate(sortUrl);
  };

  const handleChangeFilterPriceGte = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const numbericValue = value.replace(/[^\d]/g, "");
    const formattedValue = formatCurrency(numbericValue);
    dispatch(setFilterPriceGte(formattedValue));
    const isCategoryUrl: boolean = category ? true : false;

    const filterPriceGteUrl = generateSearchParamsURL({
      name,
      sort,
      price_filter_gte: numbericValue,
      price_filter_lte,
      brand,
      page,
      isCategory: isCategoryUrl,
      categoryUrlValue: category,
      isAdmin: false,
      adminUrlValue: "",
    });
    setFilterPriceUrl(filterPriceGteUrl);
  };

  const handleChangeFilterPriceLte = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const numbericValue = value.replace(/[^\d]/g, "");
    const formattedValue = formatCurrency(numbericValue);
    dispatch(setFilterPriceLte(formattedValue));
    const isCategoryUrl: boolean = category ? true : false;

    const filterPriceLteUrl = generateSearchParamsURL({
      name,
      sort,
      price_filter_gte,
      price_filter_lte: numbericValue,
      brand,
      page,
      isCategory: isCategoryUrl,
      categoryUrlValue: category,
      isAdmin: false,
      adminUrlValue: "",
    });

    setFilterPriceUrl(filterPriceLteUrl);
  };

  const handleSubmitFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(filterPriceUrl);
  };

  const handleChangeFilterBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let updatedBrands = [...brandFilter];

    if (checked) updatedBrands.push(value);
    else updatedBrands = updatedBrands.filter((brand) => brand !== value);
    dispatch(setBrandFilter(updatedBrands));
    const isCategoryUrl: boolean = category ? true : false;

    const brandFilterUrl = generateSearchParamsURL({
      name,
      sort,
      price_filter_gte,
      price_filter_lte,
      brand: updatedBrands.join(",").toLowerCase(),
      page,
      isCategory: isCategoryUrl,
      categoryUrlValue: category,
      isAdmin: false,
      adminUrlValue: "",
    });

    navigate(brandFilterUrl);
  };

  useEffect(() => {
    if (!brand) dispatch(setBrandFilter([]));
  }, [brand]);

  return (
    <>
      <div className="bg-[#f7f7f7] py-[15px] mb-[35px] md:mb-5">
        <div className="max-w-[1220px] mx-auto px-5">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              SẢN PHẨM
            </div>
            <Breadcrumb />
          </div>
        </div>
      </div>

      <ProductFilterMobile
        productLength={data?.products.length}
        totalProduct={data?.totalProduct}
        handleChangeSort={handleChangeSort}
        highestPriceProduct={highestPriceProduct}
        handleChangeFilterPriceGte={handleChangeFilterPriceGte}
        handleChangeFilterPriceLte={handleChangeFilterPriceLte}
        handleSubmitFilter={handleSubmitFilter}
        brandsData={brandsData?.brands}
        handleChangeFilterBrand={handleChangeFilterBrand}
      />

      <div
        className={`mb-10 ${
          showProductFilterMobile && "opacity-60 pointer-events-none"
        }`}
      >
        <div className="max-w-[1220px] mx-auto px-5 flex gap-x-[22px] md:flex-col">
          <div className="flex justify-end sm:justify-center md:mb-5 769:hidden">
            <button
              className="px-5 py-2 flex flex-col sm:flex-row sm:w-full items-center sm:justify-center sm:gap-x-2 text-sm border border-main-500"
              onClick={() => dispatch(toggleShowProductFilter(true))}
            >
              <div className="mb-2 sm:mb-0">
                <FiFilter size={20} />
              </div>
              <div className="text-main-500 text-sm">Lọc và sắp xếp</div>
            </button>
          </div>

          <div className="w-[25%] md:w-full flex-shrink-0 flex flex-col gap-y-5 md:order-2">
            <div>
              <div className="border border-solid border-[#ccc]">
                <CategorySideMenu />
              </div>
            </div>

            <ProductFilter
              handleChangeSort={handleChangeSort}
              highestPriceProduct={highestPriceProduct}
              handleChangeFilterPriceGte={handleChangeFilterPriceGte}
              handleChangeFilterPriceLte={handleChangeFilterPriceLte}
              handleSubmitFilter={handleSubmitFilter}
              handleChangeFilterBrand={handleChangeFilterBrand}
              brandsData={brandsData?.brands}
            />
          </div>

          <div className="w-[75%] flex-1 md:w-full md:order-1 md:mb-2">
            <div className="flex mx-[-11px] gap-y-5 flex-wrap mb-10">
              {isFetching &&
                [...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    role="status"
                    className="w-[calc(calc(100%_/_3)_-_20px)] sm:w-[calc(calc(100%_/_2)_-_20px)] mx-[10px] p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700 "
                  >
                    <div className="flex items-center justify-center h-48 sm:h-32 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                      <svg
                        className="w-10 h-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                      >
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                      </svg>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                    <div className="flex items-center mt-4 space-x-3">
                      <div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                      </div>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                ))}

              {!isFetching &&
                data?.products.map((product: IProduct) => (
                  <ProductItem
                    key={product._id}
                    product={product}
                    isProductsPage={true}
                  />
                ))}
            </div>

            <Pagination
              name={name}
              sort={sort}
              brand={brand}
              price_filter_gte={price_filter_gte}
              price_filter_lte={price_filter_lte}
              totalCount={data?.totalProduct as number}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
