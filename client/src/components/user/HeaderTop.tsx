import React from "react";
import icons from "../../utils/icons";

const {
  FaRegMoneyBillAlt,
  FiChevronDown,
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagramAlt,
  BiLogoGoogle,
  BiLogoPinterest,
} = icons;

type Props = {};

const HeaderTop = (props: Props) => {
  return (
    <div className="bg-main-200 w-full py-[10px]">
      <div className="max-w-[1220px] mx-auto px-5 flex justify-between items-center">
        <div className="flex items-center gap-x-[10px] text-white text-xs">
          <span>
            ĐẶT HÀNG TRỰC TUYẾN HOẶC GỌI CHO CHÚNG TÔI (+1800) 000 8808
          </span>
          <div className="flex items-start border-l border-[rgba(255,255,255,0.3)] pl-[10px] cursor-pointer">
            <FaRegMoneyBillAlt size={16} />
            <span className="pl-[6px] pr-[2px]">VND</span>
            <FiChevronDown size={15} />
          </div>
        </div>

        <div className="flex items-center text-white text-xs cursor-pointer gap-x-[10px]">
          <div className="hover:text-[#151515] transition-all duration-200 ease-linear">
            Đăng nhập hoặc Tạo tài khoản
          </div>
          <div className="border-l border-[rgba(255,255,255,0.3)] pl-[10px]">
            <BiLogoFacebook size={15} />
          </div>
          <div className="border-l border-[rgba(255,255,255,0.3)] pl-[10px]">
            <BiLogoTwitter size={15} />
          </div>
          <div className="border-l border-[rgba(255,255,255,0.3)] pl-[10px]">
            <BiLogoInstagramAlt size={15} />
          </div>
          <div className="border-l border-[rgba(255,255,255,0.3)] pl-[10px]">
            <BiLogoGoogle size={15} />
          </div>
          <div className="border-l border-[rgba(255,255,255,0.3)] pl-[10px]">
            <BiLogoPinterest size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
