import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CheckoutProducts } from "../components/guest";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotals } from "../features/cart/cart.slice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import icons from "../utils/icons";
import { RootState } from "../store/store";
import { IProduct } from "../interfaces/product.interface";
import { formatCurrency } from "../utils/fn";
import useAccessDeniedHandler from "../hooks/useHandleAccess";

const { PiShoppingCartFill, FiChevronDown, FiChevronUp } = icons;

type Props = {};

const CheckoutLayout = (props: Props) => {
  const dispatch = useDispatch();
  const { cartProducts, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [isShowSummary, setIsShowSummary] = useState(false);
  const handleAccessDenied = useAccessDeniedHandler();

  useEffect(() => {
    dispatch(getCartTotals());
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      handleAccessDenied();
    }
  }, [isLoggedIn]);

  return (
    <div className="font-Inter">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="text-[15px]"
      />
      <div className="max-w-[1220px] mx-auto px-5 mt-[55px]">
        <div className="flex gap-x-10">
          <div className="w-1/2 flex-1 pr-12 border-r border-main-100 md:border-r-0 md:pr-0">
            <h2 className="text-2xl font-medium mb-[17px]">Digital World 2</h2>
            <div className="bg-main-700 mb-5 769:hidden">
              <div className="flex items-center justify-between p-5 mb-5 border-y border-main-100 xs:gap-x-2">
                <div
                  className="flex items-center gap-x-[6px] text-[#349fe2] text-sm xs:flex-col xs:items-start xs:gap-y-1"
                  onClick={() => setIsShowSummary(!isShowSummary)}
                >
                  <PiShoppingCartFill size={20} />
                  <span>
                    {!isShowSummary
                      ? "Hiển thị tóm tắt đơn hàng"
                      : "Ẩn tóm tắt đơn hàng"}
                  </span>
                  {isShowSummary ? (
                    <FiChevronUp size={16} />
                  ) : (
                    <FiChevronDown size={16} />
                  )}
                </div>

                <div>{formatCurrency(totalAmount)} VND</div>
              </div>

              {isShowSummary && (
                <div className="px-5 pb-5 border-b border-main-100">
                  {cartProducts.map((cartItem: IProduct) => (
                    <div
                      className="flex items-center gap-x-[14px] mb-5"
                      key={cartItem._id}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-[60px] h-[60px] bg-white border border-[#dadada] rounded-[10px] overflow-hidden">
                          <img src={cartItem.thumb} alt="" />
                        </div>

                        <div className="absolute top-[-8px] right-[-8px] w-5 h-5 bg-[rgba(115,115,115,0.9)] rounded-full flex items-center justify-center text-xs text-white">
                          <span>{cartItem.quantity}</span>
                        </div>
                      </div>

                      <div className="text-sm font-medium flex-1 xs:text-xs">
                        <span>{cartItem.name}</span>
                      </div>

                      <div className="text-sm flex-1 text-right xs:text-xs">
                        <span>{formatCurrency(cartItem.price)} VND</span>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center justify-between text-sm xs:text-xs">
                      <span>Tổng phụ</span>
                      <span>{formatCurrency(totalAmount)} VND</span>
                    </div>

                    <div className="flex items-center justify-between text-sm xs:text-xs">
                      <span>Vận chuyển</span>
                      <span>{formatCurrency(0)} VND</span>
                    </div>

                    <div className="flex items-center justify-between text-[17px] font-semibold xs:text-sm">
                      <span>Total</span>
                      <span>
                        <span className="text-xs text-[#6c6c6c] pr-2">VND</span>
                        <span>{formatCurrency(totalAmount)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isLoggedIn && <Outlet />}

            <div className="border-t border-[#e9e9e9]">
              <span className="pt-[14px] inline-block text-xs text-[#707070]">
                All rights reserved Digital World 2
              </span>
            </div>
          </div>

          <div className="w-1/2 flex-1 md:hidden">
            <CheckoutProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
