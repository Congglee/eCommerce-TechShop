import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import { decryptData, formatCurrency } from "../../utils/fn";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useCreateOrderMutation } from "../../features/order/order.services";
import { toast } from "react-toastify";
import moment from "moment";
import Swal from "sweetalert2";

const { BiChevronRight, BsArrowLeft } = icons;

type Props = {};

const CheckoutPaymentPage = (props: Props) => {
  const encryptedData = localStorage.getItem("orderInfo");
  const decryptedUserData = decryptData(
    encryptedData,
    import.meta.env.VITE_APP_SECRET_KEY
  );
  const [createOrder, createOrderResult] = useCreateOrderMutation();
  const [paymentMethod, setPaymentMethod] = useState("directly");
  const { cartProducts } = useSelector((state: RootState) => state.cart);

  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("DD/MM/YYYY");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payment;
    if (paymentMethod === "directly") {
      payment = "Thanh toán khi nhận hàng";
    } else if (paymentMethod === "bank") {
      payment = "Thanh toán qua STK ngân hàng";
    }
    await createOrder({
      cart: cartProducts,
      payment: payment as string,
      address: decryptedUserData.address,
      mobile: decryptedUserData.mobile,
      date: formattedDate,
    });
  };

  useEffect(() => {
    const createOrderMessage = async () => {
      await Swal.fire({
        title: "Tạo mới đơn hàng thành công",
        text: "Cảm ơn quý khách đã đặt hàng",
        color: "#2f302f",
        icon: "success",
      });
    };
    if (createOrderResult.isSuccess) {
      createOrderMessage();
      localStorage.removeItem("orderInfo");
    }
  }, [createOrderResult.isSuccess]);

  useEffect(() => {
    if (createOrderResult.isError) {
      toast.error((createOrderResult.error as any).data.message);
    }
  }, [createOrderResult.isError]);

  return (
    <>
      <div className="flex items-center gap-x-1 mb-7">
        <div className="flex items-center gap-x-1">
          <Link to="/cart">
            <span className="text-sm text-[#349fe2]">Giỏ hàng</span>
          </Link>
          <span>
            <BiChevronRight size={18} />
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <Link to="/checkout/info">
            <span className="text-sm text-[#349fe2]">Thông tin</span>
          </Link>
          <span>
            <BiChevronRight size={18} />
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <Link to="/checkout/payment">
            <span className="text-sm">Thanh toán</span>
          </Link>
        </div>
      </div>

      {!createOrderResult.isSuccess && (
        <div className="border border-[#e9e9e9] rounded px-[17px] flex flex-col mb-10">
          <div className="flex items-center py-[11px]">
            <div className="flex items-center text-sm flex-grow">
              <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                Liên hệ
              </div>
              <div className="flex-1 w-[60%]">{decryptedUserData?.email}</div>
            </div>
            <div className="text-xs text-[#349fe2] underline text-right w-[10%] flex-shrink-0">
              <Link to="/profile">Thay đổi</Link>
            </div>
          </div>

          <div className="flex items-center py-[11px]">
            <div className="flex items-center text-sm flex-grow">
              <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                Gửi đến
              </div>
              <div className="flex-1 w-[60%]">{decryptedUserData?.address}</div>
            </div>
            <div className="text-xs text-[#349fe2] underline text-right w-[10%] flex-shrink-0">
              <Link to="/checkout/info">Thay đổi</Link>
            </div>
          </div>

          <div className="flex items-center py-[11px]">
            <div className="flex items-center text-sm flex-grow">
              <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                Phương thức
              </div>
              <div className="flex-1 w-[60%]">
                Vận chuyển tiêu chuẩn · 0,00 VND
              </div>
            </div>

            <div className="text-sm text-[#349fe2] underline text-right w-[10%] flex-shrink-0"></div>
          </div>
        </div>
      )}

      {!createOrderResult.isSuccess && (
        <div className="mb-[65px]">
          <form onSubmit={handleSubmit}>
            <div className="mb-[15px]">
              <h2 className="text-[17px] font-medium mb-2">Thanh toán</h2>
              <span className="text-sm">
                Tất cả các giao dịch đều được bảo mật và mã hóa.
              </span>
            </div>

            <div className="flex flex-col border border-gray-200 rounded mb-[27px]">
              <div
                className={`flex items-center pl-4 border border-gray-200 ${
                  paymentMethod === "directly" && " bg-[#f1f7fe]"
                }`}
                onClick={() => {
                  setPaymentMethod("directly");
                }}
              >
                <input
                  defaultChecked
                  id="bordered-radio-1"
                  type="radio"
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="w-full py-4 ml-[14px] text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Thanh toán khi nhận hàng
                </label>
              </div>
              <div
                className={`flex items-center pl-4 border border-gray-200 ${
                  paymentMethod === "bank" && " bg-[#f1f7fe]"
                }`}
                onClick={() => {
                  setPaymentMethod("bank");
                }}
              >
                <input
                  id="bordered-radio-2"
                  type="radio"
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <label
                  htmlFor="bordered-radio-2"
                  className="w-full py-4 ml-[14px] text-sm font-medium text-gray-900 cursor-pointer"
                >
                  Thanh toán qua ngân hàng
                </label>
              </div>

              {paymentMethod === "bank" && (
                <div className="border border-[#e9e9e9] rounded px-[17px] flex flex-col">
                  <div className="flex items-center py-[11px]">
                    <div className="flex items-center text-sm flex-grow">
                      <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                        Ngân hàng
                      </div>
                      <div className="flex-1 w-[70%]">
                        MB-BANK - Ngân hàng quân đội
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center py-[11px]">
                    <div className="flex items-center text-sm flex-grow">
                      <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                        Tài khoản
                      </div>
                      <div className="flex-1 w-[70%]">
                        0953018062003 - LE THANH CONG
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center py-[11px]">
                    <div className="flex items-center text-sm flex-grow">
                      <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                        Nội dung chuyển khoản
                      </div>
                      <div className="flex-1 w-[70%]">
                        PAYDW2 - {decryptedUserData.email.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Link to="/products">
                <div className="flex items-center text-[#349fe2] gap-x-2 text-sm">
                  <BsArrowLeft />
                  <span>Quay trở lại cửa hàng</span>
                </div>
              </Link>

              <div>
                <button className="p-5 bg-[#333333] opacity-90 text-white text-sm rounded-md hover:opacity-100">
                  Thanh toán ngay
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {createOrderResult.isSuccess && (
        <div className="mb-[65px]">
          <div>
            <div className="mb-[15px]">
              <h2 className="text-[17px] font-medium mb-2 text-lg">
                Cảm ơn quý khách đã mua hàng
              </h2>
              <span className="text-sm">
                Quý khách vui lòng theo dõi tình trạng đơn hàng trong mục đơn
                hàng của tài khoản cá nhân
              </span>
            </div>

            <div className="flex flex-col border border-gray-200 rounded mb-[27px] py-4 px-5">
              <h2 className="mb-5 font-medium">
                Thông tin đơn hàng của quý khách
              </h2>
              <div className="flex items-center border border-gray-200 border-b-0 p-3">
                <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                  Mã đơn hàng
                </div>
                <div className="text-sm w-[70%] flex-shrink-0 pl-2">
                  DW2{createOrderResult.data?.response._id}
                </div>
              </div>

              <div className="flex items-center border border-gray-200 border-b-0 p-3">
                <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                  Họ và tên
                </div>
                <div className="text-sm w-[70%] flex-shrink-0 pl-2">
                  {decryptedUserData?.name}
                </div>
              </div>

              <div className="flex items-center border border-gray-200 border-b-0 p-3">
                <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                  Địa chỉ nhận hàng
                </div>
                <div className="text-sm w-[70%] flex-shrink-0 pl-2">
                  {createOrderResult.data?.response.address}
                </div>
              </div>

              <div className="flex items-center border border-gray-200 border-b-0 p-3">
                <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                  Số điện thoại
                </div>
                <div className="text-sm w-[70%] flex-shrink-0 pl-2">
                  {createOrderResult.data?.response.mobile}
                </div>
              </div>

              <div className="flex items-center border border-gray-200 border-b-0 p-3">
                <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                  Phương thức thanh toán
                </div>
                <div className="text-sm w-[70%] flex-shrink-0 pl-2">
                  {createOrderResult.data?.response.payment}
                </div>
              </div>

              <div className="flex items-center border border-gray-200 border-b-0 p-3">
                <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                  Tình trạng đơn hàng
                </div>
                <div className="text-sm w-[70%] flex-shrink-0 pl-2">
                  {createOrderResult.data?.response.status}
                </div>
              </div>

              <div className="flex items-center border border-gray-200 p-3">
                <div className="text-sm flex-shrink-0 w-[30%] text-[#707070]">
                  Tổng giá tiền đơn hàng
                </div>
                <div className="text-sm w-[70%] flex-shrink-0 pl-2">
                  {formatCurrency(createOrderResult.data?.response.total)} VND
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Link to="/products">
                  <div className="flex items-center text-[#349fe2] gap-x-2 text-sm">
                    <BsArrowLeft />
                    <span>Quay trở lại cửa hàng</span>
                  </div>
                </Link>
              </div>

              <div>
                <Link to="/profile">
                  <button className="p-5 bg-[#333333] opacity-90 text-white text-sm rounded-md hover:opacity-100">
                    Kiểm tra đơn hàng
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPaymentPage;
