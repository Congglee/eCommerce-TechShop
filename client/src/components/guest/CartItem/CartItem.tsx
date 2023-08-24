import React from "react";
import { IProduct } from "../../../interfaces/product.interface";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../../utils/fn";
import { setCartQuantity } from "../../../features/cart/cart.slice";

interface cartItemProps {
  cartItem: IProduct;
  handleDecreaseCart: (cartItem: IProduct) => void;
  handleIncreaseCart: (cartItem: IProduct) => void;
  handleRemoveFromCart: (cartItem: IProduct) => void;
  quantity?: number;
  isLoggedIn?: boolean;
}

const CartItem = (props: cartItemProps) => {
  const dispatch = useDispatch();
  const {
    cartItem,
    handleDecreaseCart,
    handleIncreaseCart,
    handleRemoveFromCart,
    quantity,
    isLoggedIn,
  } = props;

  return (
    <div
      className="py-[15px] px-5 border-b border-main-700 flex justify-between"
      key={cartItem._id}
    >
      <div className="flex items-center w-[60%] flex-shrink-0 gap-x-5">
        <div className="w-[215px] h-[215px]">
          <img src={cartItem.thumb} alt="" className="w-full h-full" />
        </div>

        <div className="flex flex-col text-base text-main-600">
          <span className="hover:text-main-200 cursor-pointer">
            {cartItem.name}
          </span>
          <button
            type="button"
            className="text-sm text-main-500 text-left hover:text-main-200"
            onClick={() => handleRemoveFromCart(cartItem)}
          >
            <span>Remove</span>
          </button>
        </div>
      </div>

      <div className="w-[40%] flex-1 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center border border-gray-200 rounded-sm bg-[#f6f6f6] text-main-600 h-[35px]">
            <button
              type="button"
              className="w-full h-full px-2 transition-all duration-200 ease-out border-r border-[#343535] hover:bg-main-600"
              onClick={() => handleDecreaseCart(cartItem)}
            >
              -
            </button>

            <input
              type="number"
              id="Quantity"
              value={cartItem.quantity}
              onChange={(e) =>
                dispatch(
                  setCartQuantity({
                    id: cartItem._id,
                    quantity: +e.target.value === 0 ? 1 : +e.target.value,
                  })
                )
              }
              className="w-[50px] border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none bg-[#f6f6f6] focus:border-transparent focus:ring-0"
            />

            <button
              type="button"
              className="w-full h-full px-2 border-l border-[#343535] hover:bg-main-600 transition-all duration-200 ease-out"
              onClick={() => handleIncreaseCart(cartItem)}
            >
              +
            </button>
          </div>
        </div>

        <div className="text-xl font-semibold text-[#333]">
          {formatCurrency(cartItem.price * cartItem.quantity)} VND
        </div>
      </div>
    </div>
  );
};

export default CartItem;
