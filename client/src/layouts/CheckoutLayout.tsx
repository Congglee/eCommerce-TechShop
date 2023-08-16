import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { CheckoutProducts } from "../components/guest";
import { useDispatch } from "react-redux";
import { getCartTotals } from "../features/cart/cart.slice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const CheckoutLayout = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotals());
  }, []);

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
          <div className="w-1/2 flex-1 pr-12 border-r border-main-100">
            <h2 className="text-2xl font-medium mb-[17px]">Digital World 2</h2>
            <Outlet />

            <div className="border-t border-[#e9e9e9]">
              <span className="pt-[14px] inline-block text-xs text-[#707070]">
                All rights reserved Digital World 2
              </span>
            </div>
          </div>

          <div className="w-1/2 flex-1">
            <CheckoutProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
