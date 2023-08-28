import React, { useEffect } from "react";
import { formatCurrency } from "../../utils/fn";
import { Link } from "react-router-dom";
import {
  useGetUserOrderQuery,
  useUpdateStatusOrderClientMutation,
} from "../../features/order/order.services";
import { IOrder } from "../../interfaces/order.interface";
import { useGetCurrentUserQuery } from "../../features/auth/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { setOrderDetail } from "../../features/order/order.slice";
import { RootState } from "../../store/store";
import Swal from "sweetalert2";

type Props = {};

const ProfilePage = (props: Props) => {
  const {
    data: userOrders,
    refetch,
    isFetching: isFetchingUserOrder,
  } = useGetUserOrderQuery();
  const { token } = useSelector((state: RootState) => state.auth);
  const { data: userProfile, isFetching: isFetchingCurrentUser } =
    useGetCurrentUserQuery();
  const [updateStatusOrderClient, updateStatusOrderClientResult] =
    useUpdateStatusOrderClientMutation();
  const dispatch = useDispatch();

  const handleCancelOrder = async (order: IOrder, status: string) => {
    const result = await Swal.fire({
      title: "Xác nhận hủy đơn hàng",
      text: "Bạn có chắc là muốn hủy đơn hàng này không ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Không",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Có, hủy đơn hàng",
    });

    if (result.isConfirmed) {
      await updateStatusOrderClient({
        id: order._id,
        body: { ...order, status },
      });
    }
  };

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);

  useEffect(() => {
    const updateStatusOrderMessage = async () => {
      await Swal.fire({
        title: "Hủy đơn hàng thành công",
        icon: "success",
      });
    };
    if (updateStatusOrderClientResult.isSuccess) {
      updateStatusOrderMessage();
    }
  }, [updateStatusOrderClientResult.isSuccess]);

  return (
    <>
      <div className="w-[70%] md:w-full md:mb-5 flex-shrink-0 flex flex-col pr-6">
        <div className="text-white bg-main-200 py-[14px] px-[15px] uppercase font-semibold text-lg">
          Lịch sử đặt hàng
        </div>
        <div className="flex items-start uppercase text-[13px] py-[15px] px-3 border border-[#f1f1f1] font-medium sm:hidden">
          <div className="w-[calc(calc(100%_/_6))] mx-4">Mã đơn hàng</div>
          <div className="w-[calc(calc(100%_/_6))] mx-4">Ngày đặt hàng</div>
          <div className="w-[calc(calc(100%_/_6))] mx-4">
            Phương thức thanh toán
          </div>
          <div className="w-[calc(calc(100%_/_6))] mx-4">
            Tình trạng đơn hàng
          </div>
          <div className="w-[calc(calc(100%_/_6))] mx-4">Tổng cộng</div>
          <div className="w-[calc(calc(100%_/_6))] mx-4"></div>
        </div>

        {isFetchingUserOrder &&
          [...Array(2)].map((_, index) => (
            <div
              role="status"
              className="w-full p-4 space-y-4 border border-[#f1f1f1] divide-y divide-gray-200 rounded shadow animate-pulse md:p-6"
              key={index}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ))}

        {!isFetchingUserOrder &&
          userOrders?.response.map((order: IOrder) => (
            <div
              className="flex items-start text-[13px] 900:text-[11px] py-[15px] px-2 border border-[#f1f1f1] sm:flex-col sm:gap-y-2 sm:text-sm xs:text-xs"
              key={order._id}
            >
              <div
                className="w-[calc(calc(100%_/_6))] sm:w-full mx-4 hover:text-main-200 line-clamp-2 whitespace-normal break-words md:line-clamp-3 900:line-clamp-4"
                onClick={() => dispatch(setOrderDetail({ id: order._id }))}
              >
                <Link to={`order/${order._id}`}>DW2{order._id}</Link>
              </div>

              <div className="w-[calc(calc(100%_/_6))] sm:w-full mx-4">
                {order.date}
              </div>
              <div className="w-[calc(calc(100%_/_6))] sm:w-full mx-4">
                {order.payment}
              </div>
              <div className="w-[calc(calc(100%_/_6))] sm:w-full mx-4">
                {order.status}
              </div>
              <div className="w-[calc(calc(100%_/_6))] sm:w-full mx-4">
                {formatCurrency(order.total)}
              </div>
              <div className="w-[calc(calc(100%_/_6))] sm:w-full mx-4">
                {order.status === "Đã hủy" ||
                order.status === "Thành công" ||
                order.delivery_status === "Giao thành công" ||
                order.delivery_status === "Đang giao" ? (
                  <button
                    type="button"
                    className="border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-600 text-white dark:hover:bg-gray-700 dark:hover:border-gray-600"
                  >
                    Hủy
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg uppercase px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => handleCancelOrder(order, "Đã hủy")}
                  >
                    Hủy
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="w-[30%] flex-1 md:w-full">
        <div className="text-white bg-main-200 py-[14px] px-[15px] uppercase font-semibold text-lg mb-5">
          CHI TIẾT TÀI KHOẢN
        </div>
        <div className="flex flex-col gap-y-1 text-sm text-main-500 mb-2 px-[15px]">
          {isFetchingCurrentUser && (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
              <span className="sr-only">Loading...</span>
            </div>
          )}

          {!isFetchingCurrentUser && (
            <>
              <span>{userProfile?.userData.name}</span>
              <span>{userProfile?.userData.email}</span>
              <span>{userProfile?.userData.address}</span>
              <span>{userProfile?.userData.mobile}</span>
            </>
          )}
        </div>

        <div className="px-[15px] text-main-200 text-sm">
          <Link to="edit">Sửa thông tin cá nhân</Link>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
