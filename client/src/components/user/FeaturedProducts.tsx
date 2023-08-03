import React from "react";
import { IProduct } from "../../@types/product.interface";

type Props = {
  products: IProduct[] | undefined;
};

const UserFeaturedProducts = ({ products }: Props) => {
  function formatCurrency(amount: number | undefined) {
    return ((amount as number) / 100).toLocaleString("vi-VN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return (
    <div className="px-[15px]">
      <h2 className="text-[20px] py-[15px] border border-x-0 border-t-0 border-b-2 border-[#EE3131]">
        Featured Products
      </h2>
      <div className="grid grid-cols-3 gap-[15px] py-[20px]">
        {products?.map((item, index) => {
          return (
            <a href={`products/id/${item._id}`} key={index}>
              <div className="grid grid-cols-5 items-center p-[20px] space-x-[20px] border border-1">
                <div>
                  <img src={item.images[0]} alt="" />
                </div>
                <div className="col-span-4">
                  <p className="text-[14.4px] text-[#2B3747] font-extralight">
                    {item.name}
                  </p>
                  <p className="text-[14.4px] text-[#2B3747] font-extralight">
                    {formatCurrency(item.price)}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default UserFeaturedProducts;
