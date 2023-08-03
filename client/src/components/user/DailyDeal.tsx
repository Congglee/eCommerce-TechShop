import React from "react";
import { IProduct } from "../../@types/product.interface";
import { AiFillNotification } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserItem } from "..";

type Props = {
  item: IProduct | undefined;
};

const UserDailyDeal = ({ item }: Props) => {
  function formatCurrency(amount: number | undefined) {
    return ((amount as number) / 100).toLocaleString("vi-VN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return (
    <div>
      <div className="p-[20px]">
        <div className="flex flex-col space-y-[20px]">
          <div className="flex items-center justify-between pr-[50px]">
            <div className="text-[#EE3131]">
              <AiFillNotification />
            </div>
            <h2 className="text-[20px text-[#505050] font-semibold">
              DAILY DEALS
            </h2>
          </div>
          <UserItem item={item} index={0} />
          <div className="grid grid-cols-3 gap-x-[3px] py-[10px] px-[5px]">
            <div className="flex flex-col items-center bg-[#F4F4F4] px-[10px] py-[5px] w-full">
              <p className="text-[18px] font-semibold">0</p>
              <p className="text-[12px] text-[#8B8B8B]">Hours</p>
            </div>
            <div className="flex flex-col items-center bg-[#F4F4F4] px-[10px] py-[5px] w-full">
              <p className="text-[18px] font-semibold">0</p>
              <p className="text-[12px] text-[#8B8B8B]">Minutes</p>
            </div>
            <div className="flex flex-col items-center bg-[#F4F4F4] px-[10px] py-[5px] w-full">
              <p className="text-[18px] font-semibold">0</p>
              <p className="text-[12px] text-[#8B8B8B]">Seconds</p>
            </div>
          </div>
          <div className="bg-[#EE3131] text-white flex justify-center items-center py-[11px] px-[15px] space-x-[8px]">
            <div>
              <GiHamburgerMenu />
            </div>
            <p className="text-[14px] font-light">OPTIONS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDailyDeal;
