import React from "react";
import { Outlet, useParams } from "react-router-dom";
import icons from "../utils/icons";
import Breadcrumb from "../components/guest/Breadcrumb/Breadcrumb";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetOrderDetailQuery } from "../features/order/order.services";

const { BiChevronRight } = icons;

type Props = {};

const ProfileLayout = (props: Props) => {
  const { orderId } = useSelector((state: RootState) => state.order);
  const { id } = useParams();
  const { data } = useGetOrderDetailQuery(orderId ? orderId : (id as string));

  return (
    <>
      <div className="bg-[#f7f7f7] py-[15px] mb-[35px]">
        <div className="max-w-[1220px] mx-auto px-5">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              Tài khoản cá nhân
            </div>
            <Breadcrumb order={data?.response} />
          </div>
        </div>
      </div>

      <div className="max-w-[1220px] mx-auto px-5 flex mb-10 md:flex-col">
        <Outlet />
      </div>
    </>
  );
};

export default ProfileLayout;
