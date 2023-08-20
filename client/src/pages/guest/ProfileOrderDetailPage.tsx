import React from "react";
import icons from "../../utils/icons";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetOrderDetailQuery } from "../../features/order/order.services";
import { formatCurrency } from "../../utils/fn";
import { IUser } from "../../interfaces/user.interface";

const { BsArrowLeft, GrMail, BsFillTelephoneFill } = icons;

type Props = {};

const ProfileOrderDetailPage = (props: Props) => {
  const { orderId } = useSelector((state: RootState) => state.order);
  const { id } = useParams();
  const { data } = useGetOrderDetailQuery(orderId ? orderId : (id as string));

  return (
    <>
      <div className="w-[20%] flex-shrink-0">
        <div className="mb-[50px]">
          <span className="bg-main-200 py-[11px] px-[15px] uppercase text-white">
            Chi tiết đơn hàng
          </span>
        </div>

        <Link to="/profile">
          <div className="flex items-end gap-x-[6px] text-sm uppercase hover:text-main-200">
            <BsArrowLeft size={14} />
            <span>Quay lại tài khoản</span>
          </div>
        </Link>
      </div>

      <div className="w-[80%] flex-1">
        <div className="flex flex-col gap-y-1 mb-10">
          <h2 className="text-2xl font-semibold text-main-500">
            Đơn hàng DW2{data?.response._id}
          </h2>
          <span className="text-base font-medium text-gray-600">
            Đặt hàng vào {data?.response.date}
          </span>

          {data?.response.status === "Đã hủy" && (
            <span className="text-base font-bold text-gray-600">
              Đơn hàng đã bị hủy
            </span>
          )}

          {data?.response.status === "Thành công" && (
            <span className="text-base font-bold text-gray-600">
              Đơn hàng được đặt thành công
            </span>
          )}
        </div>

        <div className="flex gap-x-6">
          <div className="flex flex-col gap-y-6 p-6 bg-main-700 w-[70%]">
            <h3 className="text-main-500 text-xl font-semibold capitalize">
              Sản phẩm đơn hàng
            </h3>

            {data?.response.products.map((orderProductItem: any) => (
              <div
                className="flex items-start gap-x-6"
                key={orderProductItem._id}
              >
                <div className="w-[180px]">
                  <img src={orderProductItem.product.thumb} alt="" />
                </div>

                <div className="flex-grow w-[calc(100%_-_180px)] flex items-start justify-between gap-x-8 text-main-300">
                  <h3 className="text-[15px] font-semibold">
                    {orderProductItem.product.name}
                  </h3>
                  <span className="text-sm">
                    {formatCurrency(orderProductItem.product.price)}VND
                  </span>
                  <span className="text-sm">{orderProductItem.count}</span>
                  <span className="text-sm">
                    {formatCurrency(
                      orderProductItem.product.price * orderProductItem.count
                    )}
                    VND
                  </span>
                </div>
              </div>
            ))}

            <div className="flex flex-col text-main-300">
              <h3 className="text-main-500 capitalize text-xl font-semibold mb-4">
                Tổng cộng
              </h3>

              <div className="border-b border-main-100 pb-4 text-base text-main-500 mb-4">
                <div className="flex justify-between mb-1">
                  <span>Tổng phụ</span>
                  <span>{formatCurrency(data?.response.total)} VND</span>
                </div>

                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>0,00 VND</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold">
                <span>Tổng tiền</span>
                <span>{formatCurrency(data?.response.total)} VND</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-6 w-[30%] bg-main-700 p-6">
            <h3 className="text-main-500 text-xl font-semibold">
              Thông tin đơn hàng
            </h3>

            <div className="flex flex-col">
              <h3 className="text-base font-semibold mb-2">Người đặt</h3>
              <div className="flex items-center gap-x-5 text-[13px] text-main-300 mb-4">
                <GrMail size={20} />
                <span>{(data?.response?.orderBy as IUser)?.email}</span>
              </div>
              <div className="flex items-center gap-x-5 text-[13px] text-main-300 pb-4 border-b border-main-100">
                <BsFillTelephoneFill size={20} />
                <span>{data?.response.mobile}</span>
              </div>
            </div>

            <div className="flex flex-col gap-y-5">
              <div>
                <h3 className="text-base font-semibold mb-[10px]">
                  Địa chỉ giao hàng
                </h3>
                <div className="flex flex-col text-sm gap-y-[2px]">
                  <span>{data?.response.address}</span>
                  <span>
                    {data?.response.status === "Đang xử lý"
                      ? data?.response.status
                      : data?.response.status === "Thành công"
                      ? "Đang giao"
                      : data?.response.status === "Đã hủy"
                      ? data?.response.status
                      : ""}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-[10px]">
                  Địa chỉ thanh toán
                </h3>
                <div className="flex flex-col text-sm gap-y-[2px]">
                  <span>{data?.response.address}</span>
                  <span>
                    {data?.response.status === "Đang xử lý"
                      ? "Chưa thanh toán"
                      : data?.response.status === "Thành công"
                      ? "Đã thanh toán"
                      : data?.response.status === "Đã hủy"
                      ? "Đã hủy"
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileOrderDetailPage;
