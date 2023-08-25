import React from "react";
import { IProduct } from "../../../interfaces/product.interface";
import icons from "../../../utils/icons";
import { formatCurrency } from "../../../utils/fn";
import { Link } from "react-router-dom";
import { StarRating } from "..";

const { AiTwotoneStar } = icons;

interface FeaturedProducts {
  products: IProduct[] | undefined;
  isFetching: boolean;
}

const FeaturedProducts = (props: FeaturedProducts) => {
  const { products, isFetching } = props;
  return (
    <div className="mb-5">
      <div className="mb-5 text-[#151515] border-b-2 border-main-200 py-[15px] uppercase text-xl font-semibold">
        SẢN PHẨM NỔI BẬT
      </div>
      <div className="flex flex-wrap ml-[-20px]">
        {isFetching &&
          [...Array(9)].map((_, index) => (
            <div
              role="status"
              className="w-[calc(calc(100%_/_3)_-_20px)] ml-5 mb-5 space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
              key={index}
            >
              <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div className="w-full">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ))}

        {products?.slice(0, 9).map((product) => (
          <div
            className="w-[calc(calc(100%_/_3)_-_20px)] ml-5 mb-5 p-[15px] border border-main-700 flex items-start gap-x-5"
            key={product._id}
          >
            <div className="mb-5 w-[85px] h-[90px] flex-shrink-0">
              <Link to={`/products/${product.slug}`}>
                <img src={product.thumb} alt="" className="w-full h-full" />
              </Link>
            </div>

            <div className="flex-1">
              <h3 className="mb-[3px] text-[#2b3743] text-sm line-clamp-3">
                <Link to={`/products/${product.slug}`}>{product.name}</Link>
              </h3>
              <div className="flex items-center text-[#f1b400] gap-x-[2px] mb-[10px]">
                <StarRating
                  totalRatings={product.totalRatings as number}
                  size={14}
                />
              </div>
              <div className="text-xs">{formatCurrency(product.price)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-5 md:h-auto">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt=""
          className="md:w-[50%] md:h-auto object-cover"
        />

        <div className="flex flex-col gap-y-5 md:w-[25%]">
          <div className="w-full h-auto">
            <img
              src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="w-full h-auto">
            <img
              src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt=""
          className="md:w-[25%] md:h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default FeaturedProducts;
