import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { formatCurrency } from "../../../utils/fn";
import { ICartItem } from "../../../interfaces/product.interface";

type Props = {};

const CheckoutProducts = (props: Props) => {
  const { cartProducts, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <>
      {cartProducts.map((cartItem: ICartItem) => (
        <div className="flex items-center gap-x-[14px] mb-5" key={cartItem._id}>
          <div className="relative flex-shrink-0">
            <div className="w-[60px] h-[60px] bg-white border border-[#dadada] rounded-[10px] overflow-hidden">
              <img src={cartItem.thumb} alt="" />
            </div>

            <div className="absolute top-[-8px] right-[-8px] w-5 h-5 bg-[rgba(115,115,115,0.9)] rounded-full flex items-center justify-center text-xs text-white">
              <span>{cartItem.cartQuantity}</span>
            </div>
          </div>

          <div className="text-sm font-medium flex-1">
            <span>{cartItem.name}</span>
          </div>

          <div className="text-sm flex-1 text-right">
            <span>
              {formatCurrency(cartItem.price * cartItem.cartQuantity)} VND
            </span>
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Tổng phụ</span>
          <span>{formatCurrency(totalAmount)} VND</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span>Vận chuyển</span>
          <span>{formatCurrency(0)} VND</span>
        </div>

        <div className="flex items-center justify-between text-[17px] font-semibold">
          <span>Total</span>
          <span>
            <span className="text-xs text-[#6c6c6c] pr-2">VND</span>
            <span>{formatCurrency(totalAmount)}</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default CheckoutProducts;
