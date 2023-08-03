import React from "react";
import { IProduct } from "../../@types/product.interface";

type Props = {
  item: IProduct | undefined;
  index: number;
};

const UserItem = ({ item, index }: Props) => {
  function formatCurrency(amount: number | undefined) {
    return ((amount as number) / 100).toLocaleString("vi-VN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return (
    <div>
      <div key={index} className="p-[15px] focus:outline-none">
        <img src={item?.images[0]} alt={`Image ${index + 1}`} />
        <p className="text-[#2B3743] text-[16px] font-extralight mb-[5px]">
          {item?.name}
        </p>
        <p className="text-[#2B3743] text-[16px] font-extralight">
          {formatCurrency(item?.price)} VND
        </p>
      </div>
    </div>
  );
};

export default UserItem;
