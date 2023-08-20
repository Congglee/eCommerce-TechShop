import React from "react";
import { Outlet } from "react-router-dom";
import icons from "../utils/icons";

const { BiChevronRight } = icons;

type Props = {};

const ProfileLayout = (props: Props) => {
  return (
    <>
      <div className="bg-[#f7f7f7] py-[15px] mb-[35px]">
        <div className="px-[170px]">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              Tài khoản cá nhân
            </div>
            <div className="flex items-center text-sm text-[#1c1d1d]">
              <span>Trang chủ</span>
              <BiChevronRight size={18} />
              <span>Tài khoản cá nhân</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1220px] mx-auto px-5 flex gap-x-6 mb-10">
        <Outlet />
      </div>
    </>
  );
};

export default ProfileLayout;
