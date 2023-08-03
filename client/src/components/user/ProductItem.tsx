import React, { useState } from "react";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import { IProduct } from "../../@types/product.interface";

const { AiTwotoneStar, LiaBarsSolid, FaEye, BsFillHeartFill } = icons;

interface ProductItemProps {
  product: IProduct;
}

type Props = {};

const ProductItem = (props: ProductItemProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { product } = props;

  const formattedProductDesc = product.description.replace(/\n/g, "<br/>");

  return (
    <div
      className="w-[calc(calc(100%_/_3)_-_22px)] mx-[11px] border border-[#ebebeb] p-[15px] relative cursor-pointer flex flex-col"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="mb-5 w-full h-[250px] flex-shrink-0">
        <img
          src={product.thumb}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-[6px] text-base text-main-500 line-clamp-2">
          <Link to={"/products"}>{product.name}</Link>
        </div>

        <div className="flex items-center text-[#f1b400] gap-x-[2px] mb-[10px]">
          <AiTwotoneStar size={14} />
          <AiTwotoneStar size={14} />
          <AiTwotoneStar size={14} />
          <AiTwotoneStar size={14} />
          <AiTwotoneStar size={14} />
        </div>

        <div className="text-base">{product.price.toLocaleString()} VND</div>
      </div>

      <div
        className={`absolute w-full h-full top-0 left-0 py-[10px] bg-white z-10 transition-all duration-400 ease-out ${
          isHover ? "opacity-1 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="w-full flex items-center justify-between pl-4 pr-1 pb-[10px] mb-[10px] border-b border-[#ebebeb]">
          <div className="mb-[6px] text-base text-[#2b3743] leading-[18px] hover:text-main-200 line-clamp-4">
            <Link to={"/products"}>{product.name}</Link>
          </div>

          <div className="text-base text-right leading-[18px]">
            {product.price.toLocaleString()} VND
          </div>
        </div>

        <div className="py-[10px] px-5 w-full">
          <div
            dangerouslySetInnerHTML={{ __html: formattedProductDesc }}
            className="text-[13px] leading-[18px] text-main-500 mb-[15px] line-clamp-[12]"
          ></div>

          <div className="flex items-center gap-x-2 ">
            <div className="w-10 h-10 border border-[#c5cfd6] bg-white text-[#2a2a2a] rounded-full flex items-center justify-center cursor-pointer hover:border-transparent hover:bg-[#2a2a2a] hover:text-white transition-all duration-500 ease-out">
              <LiaBarsSolid size={17} />
            </div>

            <div className="w-10 h-10 border border-[#c5cfd6] bg-white text-[#2a2a2a] rounded-full flex items-center justify-center cursor-pointer hover:border-transparent hover:bg-[#2a2a2a] hover:text-white transition-all duration-500 ease-out">
              <FaEye size={17} />
            </div>

            <div className="w-10 h-10 border border-[#c5cfd6] bg-white text-[#2a2a2a] rounded-full flex items-center justify-center cursor-pointer hover:border-transparent hover:bg-[#2a2a2a] hover:text-white transition-all duration-500 ease-out">
              <BsFillHeartFill size={17} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
