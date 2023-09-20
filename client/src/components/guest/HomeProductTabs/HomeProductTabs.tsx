import React, { useState } from "react";
import { IProduct } from "../../../interfaces/product.interface";
import ProductItem from "../ProductItem/ProductItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface HomeProductTabs {
  products: IProduct[] | undefined;
  isFetching: boolean;
}

const HomeProductTabs = (props: HomeProductTabs) => {
  const { products, isFetching } = props;
  const [isBestSeller, setIsBestSeller] = useState<boolean>(true);
  const [isNewArrivals, setIsNewArrivals] = useState<boolean>(false);
  const [isMackbook, setIsMackbook] = useState<boolean>(false);
  const { currentWidth } = useSelector((state: RootState) => state.app);

  let numItemsToShow = 3;

  if (currentWidth <= 768 && currentWidth > 640) numItemsToShow = 2;
  else if (currentWidth <= 640) numItemsToShow = 1;

  return (
    <>
      <div className="flex sm:flex-col sm:gap-x-0 sm:gap-y-[10px] gap-x-5 mb-5 border-b-[2px] border-main-200 pb-[15px]">
        <button
          className={`text-[#151515] text-xl md:text-lg uppercase font-semibold transition-all duration-200 ease-linear sm:w-full sm:border-b sm:border-main-700 sm:text-left sm:pl-5 sm:py-[5px] ${
            isBestSeller ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => {
            setIsBestSeller(true);
            setIsMackbook(false);
            setIsNewArrivals(false);
          }}
        >
          <span>Bán chạy nhất</span>
        </button>

        <button
          className={`text-[#151515] text-xl md:text-lg uppercase font-semibold border-l border-main-700 pl-5 transition-all duration-200 ease-linear sm:border-l-0 sm:border-b sm:border-main-700 sm:text-left sm:py-[5px] ${
            isNewArrivals ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => {
            setIsBestSeller(false);
            setIsMackbook(false);
            setIsNewArrivals(true);
          }}
        >
          <span>Hàng mới</span>
        </button>

        <button
          className={`text-[#151515] text-xl md:text-lg uppercase font-semibold border-l border-main-700 pl-5 transition-all duration-200 ease-linear sm:border-l-0 sm:border-b sm:border-main-700 sm:text-left sm:py-[5px] ${
            isMackbook ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => {
            setIsBestSeller(false);
            setIsMackbook(true);
            setIsNewArrivals(false);
          }}
        >
          <span>Macbook</span>
        </button>
      </div>

      <div className="flex mx-[-10px] gap-y-[18px] mb-5">
        {isFetching &&
          [...Array(3)].map((_, index) => (
            <div
              key={index}
              role="status"
              className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
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
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              <div className="flex items-center mt-4 space-x-3">
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
                  <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ))}

        {isBestSeller &&
          products
            ?.slice(0, numItemsToShow)
            .map((product: IProduct) => (
              <ProductItem
                key={product._id}
                product={product}
                isHoverHomePage={true}
              />
            ))}

        {isNewArrivals &&
          products
            ?.slice()
            .reverse()
            .slice(0, numItemsToShow)
            .map((product: IProduct) => (
              <ProductItem
                key={product._id}
                product={product}
                isHoverHomePage={true}
              />
            ))}

        {isMackbook &&
          products
            ?.filter((product) => product.name.toLowerCase().includes("apple"))
            .slice(0, numItemsToShow)
            .map((product: IProduct) => (
              <ProductItem
                key={product._id}
                product={product}
                isHoverHomePage={true}
              />
            ))}
      </div>

      <div className="flex items-center gap-x-5 sm:flex-col sm:items-stretch sm:gap-y-5">
        <div>
          <img
            src="https://res.cloudinary.com/di3eto0bg/image/upload/v1695207846/ecommerce-techshop/banner1-home2_jswako.png"
            alt=""
            className="w-full h-full"
          />
        </div>

        <div>
          <img
            src="https://res.cloudinary.com/di3eto0bg/image/upload/v1695207845/ecommerce-techshop/banner2-home2_scej7r.png"
            alt=""
            className="w-full h-full"
          />
        </div>
      </div>
    </>
  );
};

export default HomeProductTabs;
