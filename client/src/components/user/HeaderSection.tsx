import React from "react";
import icons from "../../utils/icons";
import logo from "../../assets/logo_digital_new_250x.png";

const { BsFillTelephoneFill, BsFillHeartFill, GrMail, HiShoppingBag } = icons;

type Props = {};

const HeaderSection = (props: Props) => {
  return (
    <div>
      <div className="bg-white py-[35px] max-w-[1220px] px-[20px] mx-auto flex items-center justify-between">
        <div className="w-[25%] flex-shrink-0">
          <img src={logo} alt="" />
        </div>

        <div className="flex gap-x-5">
          <div className="pl-5 flex flex-col items-center">
            <div className="flex items-center gap-x-[10px]">
              <div className="text-main-200">
                <BsFillTelephoneFill size={12} />
              </div>
              <span className="font-semibold uppercase text-[13px] text-main-500">
                (+1800) 000 8808
              </span>
            </div>
            <div className="text-xs text-center text-main-500">
              Thứ Hai-Thứ Bảy 9:00AM - 8:00PM
            </div>
          </div>

          <div className="pl-5 border-l border-[rgba(0,0,0,0.1)] flex flex-col items-center">
            <div className="flex items-center gap-x-[10px]">
              <div className="text-main-200">
                <GrMail size={12} />
              </div>
              <span className="font-semibold uppercase text-[13px] text-main-500">
                support@tadathemes.com
              </span>
            </div>
            <div className="text-xs text-center text-main-500">
              Hỗ trợ trực tuyến 24/7
            </div>
          </div>

          <div className="pl-5 border-l border-[rgba(0,0,0,0.1)]">
            <div className="flex justify-center items-center gap-x-[10px] text-main-200 cursor-pointer py-[10px] h-[40px]">
              <BsFillHeartFill size={19} />
            </div>
          </div>

          <div className="pl-5 border-l border-[rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-x-[10px] py-[10px] h-[40px] cursor-pointer">
              <div className=" text-main-200">
                <HiShoppingBag size={25} />
              </div>
              <span className="text-sm hover:text-main-200">1 sản phẩm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
