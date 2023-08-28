import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import { decryptData } from "../../utils/fn";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useCreateOrderMutation } from "../../features/order/order.services";
import { toast } from "react-toastify";
import moment from "moment";
import Swal from "sweetalert2";
import { CheckoutPaymentMethod, CheckoutSuccess } from "../../components/guest";

const { BiChevronRight } = icons;

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
            <div className="flex items-center text-sm flex-grow xs:flex-col xs:items-start">
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
            <div className="flex items-center text-sm flex-grow xs:flex-col xs:items-start">
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
            <div className="flex items-center text-sm flex-grow xs:flex-col xs:items-start">
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
        <CheckoutPaymentMethod
          handleSubmit={handleSubmit}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          decryptedUserData={decryptedUserData}
          cartProducts={cartProducts}
        />
      )}

      {createOrderResult.isSuccess && (
        <CheckoutSuccess
          createOrderResult={createOrderResult}
          decryptedUserData={decryptedUserData}
        />
      )}
    </>
  );
};

export default CheckoutPaymentPage;
