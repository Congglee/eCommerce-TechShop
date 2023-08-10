import React from "react";
import { IProduct } from "../../../interfaces/product.interface";
import icons from "../../../utils/icons";
import { formatCurrency } from "../../../utils/fn";

const {
  AiTwotoneStar,
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoPinterest,
  BsShieldShaded,
  FaTruck,
  HiGift,
  FaReply,
  FaTty,
} = icons;

interface productDetailContentProps {
  product: IProduct | undefined;
}

const ProductDetailContent = (props: productDetailContentProps) => {
  const { product } = props;
  return (
    <>
      <div className="w-[40%] flex-shrink-0 flex flex-col gap-y-[30px]">
        <div className="border border-main-700 bg-[#f7f7f7]">
          <img src={product?.thumb} alt="" />
        </div>

        <div className="flex flex-wrap mx-[-5px] gap-y-[10px]">
          {product?.images.map((image) => (
            <div
              className="w-[calc(calc(100%_/_3)_-_10px)] mx-[5px] border border-main-700 p-[10px]"
              key={image}
            >
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="w-[60%] flex-1 flex">
        <div className="w-[62.5%] flex-shrink-0">
          <div className="text-[#333] text-3xl font-semibold mb-5">
            <span>{formatCurrency(product?.price)} VND</span>
          </div>

          <div className="flex items-start gap-x-[3px] mb-3">
            <div className="flex items-center text-[#f1b400] mb-[10px]">
              <AiTwotoneStar size={18} />
              <AiTwotoneStar size={18} />
              <AiTwotoneStar size={18} />
              <AiTwotoneStar size={18} />
              <AiTwotoneStar size={18} />
            </div>
            <span className="text-main-500 text-sm">1 review</span>
          </div>

          <div className="mb-5">
            <ul className="flex flex-col gap-y-[5px] w-[90%]">
              {product?.description.split("\n").map((item) => (
                <li
                  className="text-sm text-main-500 list-[square] list-inside list-image-[initial]"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-x-5 mb-5">
            <span className="text-main-800 font-semibold text-sm">
              Quantity
            </span>

            <div className="flex items-center">
              <div className="flex items-center border border-gray-200 rounded-sm bg-[#f6f6f6] text-main-600 h-[35px]">
                <button
                  type="button"
                  className="w-full h-full px-2 transition-all duration-200 ease-out border-r border-[#343535] hover:bg-main-600"
                >
                  -
                </button>

                <input
                  type="number"
                  id="Quantity"
                  defaultValue="1"
                  className="w-[50px] border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none bg-[#f6f6f6] focus:border-transparent focus:ring-0"
                />

                <button
                  type="button"
                  className="w-full h-full px-2 border-l border-[#343535] hover:bg-main-600 transition-all duration-200 ease-out"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button className="w-full bg-main-200 text-white font-bold py-[11px] px-[15px] uppercase text-sm hover:bg-[#333] transition-all duration-150 ease-out mb-5">
            Add To Cart
          </button>

          <div className="flex items-center gap-x-3">
            <div className="w-[35px] h-[35px] rounded-full text-white bg-black flex items-center justify-center hover:opacity-80 cursor-pointer">
              <BiLogoFacebook size={21} />
            </div>

            <div className="w-[35px] h-[35px] rounded-full text-white bg-black flex items-center justify-center hover:opacity-80 cursor-pointer">
              <BiLogoTwitter size={21} />
            </div>

            <div className="w-[35px] h-[35px] rounded-full text-white bg-black flex items-center justify-center hover:opacity-80 cursor-pointer">
              <BiLogoPinterest size={21} />
            </div>
          </div>
        </div>
        <div className="w-[37.5%] flex-1 flex flex-col gap-y-[10px]">
          <div className="p-[10px] border border-main-700 flex items-center gap-x-[10px]">
            <div className="p-[10px] bg-main-500 rounded-full flex items-center justify-center text-white">
              <BsShieldShaded size={18} />
            </div>

            <div className="flex flex-col capitalize">
              <span className="text-main-500 text-sm">Guarantee</span>
              <span className="text-xs text-[#999]">Quality checked</span>
            </div>
          </div>

          <div className="p-[10px] border border-main-700 flex items-center gap-x-[10px]">
            <div className="p-[10px] bg-main-500 rounded-full flex items-center justify-center text-white">
              <FaTruck size={18} />
            </div>

            <div className="flex flex-col capitalize">
              <span className="text-main-500 text-sm">Free Shipping</span>
              <span className="text-xs text-[#999]">Free On All Products</span>
            </div>
          </div>

          <div className="p-[10px] border border-main-700 flex items-center gap-x-[10px]">
            <div className="p-[10px] bg-main-500 rounded-full flex items-center justify-center text-white">
              <HiGift size={18} />
            </div>

            <div className="flex flex-col capitalize">
              <span className="text-main-500 text-sm">Special Gift Cards</span>
              <span className="text-xs text-[#999]">Special Gift Cards</span>
            </div>
          </div>

          <div className="p-[10px] border border-main-700 flex items-center gap-x-[10px]">
            <div className="p-[10px] bg-main-500 rounded-full flex items-center justify-center text-white">
              <FaReply size={18} />
            </div>

            <div className="flex flex-col capitalize">
              <span className="text-main-500 text-sm">Free Return</span>
              <span className="text-xs text-[#999]">Within 7 Days</span>
            </div>
          </div>

          <div className="p-[10px] border border-main-700 flex items-center gap-x-[10px]">
            <div className="p-[10px] bg-main-500 rounded-full flex items-center justify-center text-white">
              <FaTty size={18} />
            </div>

            <div className="flex flex-col capitalize">
              <span className="text-main-500 text-sm">Consultancy</span>
              <span className="text-xs text-[#999]">Lifetime 24/7/356</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailContent;
