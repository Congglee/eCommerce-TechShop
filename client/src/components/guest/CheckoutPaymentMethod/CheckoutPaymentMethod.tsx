import React, { useEffect } from "react";
import icons from "../../../utils/icons";
import { Link } from "react-router-dom";
import { IProduct } from "../../../interfaces/product.interface";
import { useCreateCheckoutSessionMutation } from "../../../features/order/order.services";
import { useGetCurrentUserQuery } from "../../../features/auth/auth.service";

const { BsArrowLeft, FaCcStripe } = icons;

interface checkoutOutPaymentMethodProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  decryptedUserData: any;
  cartProducts: IProduct[];
}

const CheckoutPaymentMethod = (props: checkoutOutPaymentMethodProps) => {
  const {
    handleSubmit,
    paymentMethod,
    setPaymentMethod,
    decryptedUserData,
    cartProducts,
  } = props;
  const { data } = useGetCurrentUserQuery();

  const [createCheckoutSession, createCheckoutSessionResult] =
    useCreateCheckoutSessionMutation();

  const handleCheckoutPaypal = async () => {
    await createCheckoutSession({
      cartProducts: cartProducts,
      userId: data?.userData._id as string,
    });
  };

  useEffect(() => {
    if (createCheckoutSessionResult.isSuccess) {
      window.location.href = createCheckoutSessionResult.data.url;
    }
  }, [createCheckoutSessionResult.isSuccess]);

  useEffect(() => {
    if (createCheckoutSessionResult.isError) {
      console.log(createCheckoutSessionResult.error);
    }
  }, [createCheckoutSessionResult.isError]);

  return (
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
              Thanh toán qua STK ngân hàng
            </label>
          </div>

          {paymentMethod === "bank" && (
            <div className="border border-[#e9e9e9] rounded px-[17px] flex flex-col">
              <div className="flex items-center py-[11px]">
                <div className="flex items-center text-sm flex-grow xs:flex-col">
                  <div className="text-sm flex-shrink-0 w-[30%] text-[#707070] xs:w-full">
                    Ngân hàng
                  </div>
                  <div className="flex-1 w-[70%] xs:w-full">
                    MB-BANK - Ngân hàng quân đội
                  </div>
                </div>
              </div>

              <div className="flex items-center py-[11px]">
                <div className="flex items-center text-sm flex-grow xs:flex-col">
                  <div className="text-sm flex-shrink-0 w-[30%] text-[#707070] xs:w-full">
                    Tài khoản
                  </div>
                  <div className="flex-1 w-[70%] xs:w-full">
                    0953018062003 - LE THANH CONG
                  </div>
                </div>
              </div>

              <div className="flex items-center py-[11px]">
                <div className="flex items-center text-sm flex-grow xs:flex-col">
                  <div className="text-sm flex-shrink-0 w-[30%] text-[#707070] xs:w-full">
                    Nội dung chuyển khoản
                  </div>
                  <div className="flex-1 w-[70%] xs:w-full">
                    PAYDW2 - {decryptedUserData.email.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={`flex items-center pl-4 border border-gray-200 ${
              paymentMethod === "paypal" && " bg-[#f1f7fe]"
            }`}
            onClick={() => {
              setPaymentMethod("paypal");
            }}
          >
            <input
              id="bordered-radio-3"
              type="radio"
              name="bordered-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer"
            />
            <label
              htmlFor="bordered-radio-3"
              className="w-full py-4 ml-[14px] text-sm font-medium text-gray-900 cursor-pointer flex items-center gap-x-3 xs:pr-3"
            >
              Thanh toán qua cổng Stripe
              <FaCcStripe size={30} />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link to="/products">
            <div className="flex items-center text-[#349fe2] gap-x-2 text-sm">
              <BsArrowLeft />
              <span>Quay trở lại cửa hàng</span>
            </div>
          </Link>

          <div>
            {paymentMethod === "paypal" ? (
              <button
                type="button"
                className="p-5 bg-[#333333] opacity-90 text-white text-sm rounded-md hover:opacity-100"
                onClick={() => handleCheckoutPaypal()}
              >
                Thanh toán ngay
              </button>
            ) : (
              <button className="p-5 bg-[#333333] opacity-90 text-white text-sm rounded-md hover:opacity-100">
                Thanh toán ngay
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPaymentMethod;
