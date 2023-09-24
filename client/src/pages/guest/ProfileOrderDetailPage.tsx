import icons from "../../utils/icons";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetOrderDetailQuery } from "../../features/order/order.services";
import { formatCurrency } from "../../utils/fn";
import { IUser } from "../../interfaces/user.interface";

const { BsArrowLeft, GrMail, BsFillTelephoneFill } = icons;

const ProfileOrderDetailPage = () => {
  const { orderId } = useSelector((state: RootState) => state.order);
  const { id } = useParams();
  const { data, isFetching } = useGetOrderDetailQuery(
    orderId ? orderId : (id as string)
  );

  return (
    <>
      <div className="w-[20%] lg:w-[25%] md:w-full md:text-center flex-shrink-0 md:mb-10">
        <div className="mb-[50px] lg:text-sm 900:text-xs">
          <span className="bg-main-200 py-[11px] px-[15px] 900:text-[13px] uppercase text-white">
            Chi tiết đơn hàng
          </span>
        </div>

        <Link to="/profile">
          <div className="flex items-end md:justify-center gap-x-[6px] text-sm uppercase hover:text-main-200">
            <BsArrowLeft size={14} />
            <span>Quay lại tài khoản</span>
          </div>
        </Link>
      </div>

      <div className="w-[80%] lg:w-[75%] md:w-full flex-1">
        <div className="flex flex-col gap-y-1 mb-10">
          {isFetching && (
            <div role="status" className="w-full animate-pulse">
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[550px] mb-4" />
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-4" />
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-4" />
              <span className="sr-only">Loading...</span>
            </div>
          )}

          {!isFetching && (
            <>
              <h2 className="text-2xl font-semibold text-main-500 whitespace-normal break-words xs:text-xl">
                Mã đơn hàng: {data?.response.orderCode}
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
            </>
          )}
        </div>

        <div className="flex gap-x-6 xl:flex-col xl:gap-y-5">
          <div className="flex flex-col gap-y-6 p-6 bg-main-700 w-[70%] xl:w-full">
            <h3 className="text-main-500 text-xl font-semibold capitalize">
              Sản phẩm đơn hàng
            </h3>

            {isFetching && (
              <div
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex"
              >
                <div className="flex items-center justify-center w-full h-40 bg-gray-300 rounded sm:w-72 dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="w-full gap-y-2 flex flex-col">
                  <div className="flex w-full space-x-2">
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-20" />
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
                  </div>
                  <div className="flex w-full space-x-2">
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-20" />
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
                  </div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            )}

            {!isFetching &&
              data?.response.products.map((orderProductItem: any) => (
                <div
                  className="flex items-start gap-x-8"
                  key={orderProductItem._id}
                >
                  <div className="w-[180px] sm:w-full sm:h-full">
                    <img
                      src={orderProductItem.product.thumb}
                      alt=""
                      className="w-full h-full"
                    />
                  </div>

                  <div className="flex-grow w-[calc(100%_-_180px)] flex items-start justify-between gap-x-6 text-main-300 900:flex-col 900:gap-y-2 900:w-full">
                    <h3 className="text-[15px] font-semibold">
                      {orderProductItem.product.name}
                    </h3>
                    <span className="text-sm">
                      {formatCurrency(orderProductItem.product.price)}VND
                    </span>
                    <span className="text-sm">{orderProductItem.count}</span>
                    <h5 className="text-sm">
                      {formatCurrency(
                        orderProductItem.product.price * orderProductItem.count
                      )}
                      VND
                    </h5>
                  </div>
                </div>
              ))}

            <div className="flex flex-col text-main-300">
              <h3 className="text-main-500 capitalize text-xl font-semibold mb-4">
                Tổng cộng
              </h3>

              <div className="border-b border-main-100 pb-4 text-base text-main-500 mb-4">
                {isFetching && (
                  <div
                    role="status"
                    className="w-full space-y-4 rounded animate-pulse"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                      </div>
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12 mb-2.5" />
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
                      </div>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}

                {!isFetching && (
                  <>
                    <div className="flex justify-between mb-1">
                      <span>Tổng phụ</span>
                      <span>{formatCurrency(data?.response.total)} VND</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Phí vận chuyển</span>
                      <span>0,00 VND</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-between text-lg font-semibold">
                {isFetching && (
                  <div
                    role="status"
                    className="w-full space-y-4 rounded animate-pulse"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-28 mb-2.5" />
                      </div>
                      <div>
                        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-16 mb-2.5" />
                      </div>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}

                {!isFetching && (
                  <>
                    <span>Tổng tiền</span>
                    <span>{formatCurrency(data?.response.total)} VND</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-6 w-[30%] bg-main-700 p-6 xl:w-full">
            <h3 className="text-main-500 text-xl font-semibold">
              Thông tin đơn hàng
            </h3>

            {isFetching && (
              <div
                role="status"
                className="max-w-sm border border-gray-200 rounded animate-pulse"
              >
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5" />
                <div className="flex items-baseline mt-4 space-x-6">
                  <div className="flex items-center w-full space-x-2">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-14" />
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
                  </div>
                </div>
                <div className="flex items-baseline mt-4 space-x-6">
                  <div>
                    <div className="h-2 w-24 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2.5" />
                  </div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            )}

            {!isFetching && (
              <>
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
                      <span>{data?.response.delivery_status}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold mb-[10px]">
                      Địa chỉ thanh toán
                    </h3>
                    <div className="flex flex-col text-sm gap-y-[2px]">
                      <span>{data?.response.address}</span>
                      <span>{data?.response.payment_status}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileOrderDetailPage;
