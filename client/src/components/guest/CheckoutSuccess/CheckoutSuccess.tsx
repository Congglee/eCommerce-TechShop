import icons from "../../../utils/icons";
import { formatCurrency } from "../../../utils/fn";
import { Link } from "react-router-dom";

const { BsArrowLeft } = icons;

interface checkoutSuccessProps {
  createOrderResult: any;
  decryptedUserData: any;
}

const CheckoutSuccess = (props: checkoutSuccessProps) => {
  const { createOrderResult, decryptedUserData } = props;

  return (
    <div className="mb-[65px]">
      <div>
        <div className="mb-[15px]">
          <h2 className="text-[17px] font-medium mb-2 text-lg">
            Cảm ơn quý khách đã mua hàng
          </h2>
          <span className="text-sm">
            Quý khách vui lòng theo dõi tình trạng đơn hàng trong mục đơn hàng
            của tài khoản cá nhân
          </span>
        </div>

        <div className="flex flex-col border border-gray-200 rounded mb-[27px] py-4 px-5">
          <h2 className="mb-5 font-medium">Thông tin đơn hàng của quý khách</h2>
          <div className="flex items-center xs:flex-col border border-gray-200 border-b-0 p-3">
            <div className="text-sm flex-shrink-0 w-[30%] xs:w-full text-[#707070]">
              Mã đơn hàng
            </div>
            <div className="text-sm w-[70%] flex-shrink-0 pl-2 xs:w-full xs:pl-0 xs:flex-1 xs:break-all">
              {createOrderResult.data?.response.orderCode}
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
  );
};

export default CheckoutSuccess;
