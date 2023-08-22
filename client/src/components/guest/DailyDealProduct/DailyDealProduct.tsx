import React from "react";
import icons from "../../../utils/icons";
import { IProduct } from "../../../interfaces/product.interface";
import { formatCurrency } from "../../../utils/fn";

const { AiFillStar, AiTwotoneStar, PiListBold } = icons;

interface DailyDealProps {
  dailyDealProduct?: IProduct;
}

const DailyDealProduct = (props: DailyDealProps) => {
  const { dailyDealProduct } = props;

  return (
    <div className="p-5 border border-main-700 text-center">
      <div className="flex items-center">
        <div className="text-main-200">
          <AiFillStar size={22} />
        </div>
        <h2 className="mx-auto text-xl uppercase font-semibold text-main-500">
          Ưu đãi hàng ngày
        </h2>
      </div>

      <div>
        <div className="mb-[15px]">
          <img src={dailyDealProduct?.thumb} alt="" />
        </div>

        <div>
          <h2 className="text-base mb-2 text-main-500 line-clamp-2">
            {dailyDealProduct?.name}
          </h2>
          <div className="flex items-center justify-center text-[#f1b400] gap-x-[1px] mb-3">
            <AiTwotoneStar size={18} />
            <AiTwotoneStar size={18} />
            <AiTwotoneStar size={18} />
            <AiTwotoneStar size={18} />
            <AiTwotoneStar size={18} />
          </div>
          <div className="text-main-500 text-base mb-3">
            <span>{formatCurrency(dailyDealProduct?.price)} VND</span>
          </div>

          <div className="flex items-center justify-center gap-x-1 mb-3">
            <div className="w-[32.5%] py-[10px] px-[5px] flex flex-col bg-[#f4f4f4]">
              <span className="text-[#151515] font-semibold text-lg">0</span>
              <span className="text-xs text-[#8b8b8b]">Giờ</span>
            </div>

            <div className="w-[32.5%] py-[10px] px-[5px] flex flex-col bg-[#f4f4f4]">
              <span className="text-[#151515] font-semibold text-lg">0</span>
              <span className="text-xs text-[#8b8b8b]">Phút</span>
            </div>

            <div className="w-[32.5%] py-[10px] px-[5px] flex flex-col bg-[#f4f4f4]">
              <span className="text-[#151515] font-semibold text-lg">0</span>
              <span className="text-xs text-[#8b8b8b]">Giây</span>
            </div>
          </div>

          <button className="flex items-center justify-center bg-main-200 py-[11px] px-[15px] uppercase text-white text-sm w-full gap-x-2 hover:bg-[#1c1d1d] transition-all duration-200 ease-linear">
            <PiListBold size={17} />
            <span>Tùy chọn</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyDealProduct;
