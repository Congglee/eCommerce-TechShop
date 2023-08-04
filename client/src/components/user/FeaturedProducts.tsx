import React from "react";
import { IProduct } from "../../@types/product.interface";
import icons from "../../utils/icons";
import { formatCurrency } from "../../utils/fn";

const { AiTwotoneStar } = icons;

interface FeaturedProducts {
  products: IProduct[] | undefined;
}

const FeaturedProducts = (props: FeaturedProducts) => {
  const { products } = props;
  return (
    <div className="mb-5">
      <div className="mb-5 text-[#151515] border-b-2 border-main-200 py-[15px] uppercase text-xl font-semibold">
        SẢN PHẨM NỔI BẬT
      </div>
      <div className="flex flex-wrap ml-[-20px]">
        {products?.slice(0, 9).map((product) => (
          <div
            className="w-[calc(calc(100%_/_3)_-_20px)] ml-5 mb-5 p-[15px] border border-main-700 flex items-start gap-x-5"
            key={product._id}
          >
            <div className="mb-5 w-[85px] h-[90px] flex-shrink-0">
              <img src={product.thumb} alt="" className="w-full h-full" />
            </div>

            <div className="flex-1">
              <h3 className="mb-[3px] text-[#2b3743] text-sm line-clamp-3">
                {product.name}
              </h3>
              <div className="flex items-center text-[#f1b400] gap-x-[2px] mb-[10px]">
                <AiTwotoneStar size={14} />
                <AiTwotoneStar size={14} />
                <AiTwotoneStar size={14} />
                <AiTwotoneStar size={14} />
                <AiTwotoneStar size={14} />
              </div>
              <div className="text-xs">{formatCurrency(product.price)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-5 h-[680px]">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt=""
        />

        <div className="flex flex-col gap-y-5">
          <div className="w-full h-[340px]">
            <img
              src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="w-full h-[340px]">
            <img
              src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>

        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt=""
        />
      </div>
    </div>
  );
};

export default FeaturedProducts;
