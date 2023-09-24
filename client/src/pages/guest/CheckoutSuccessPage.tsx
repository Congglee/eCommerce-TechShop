import { Link } from "react-router-dom";
import icons from "../../utils/icons";

const { BsArrowLeft } = icons;

const CheckoutSuccessPage = () => {
  return (
    <div className="mb-[65px]">
      <div className="mb-6 p-3">
        <h2 className="text-lg italic text-main-500 font-medium mb-2">
          Cảm ơn quý khách đã mua hàng 🤩q(≧▽≦q)
        </h2>

        <div className="flex items-center text-sm border border-gray-200 border-b-0 p-3">
          Quý khách vui lòng theo dõi tình trạng đơn hàng trong mục đơn hàng của
          tài khoản cá nhân và email cá nhân
        </div>

        <div className="flex items-center text-sm border border-gray-200 p-3">
          Đơn hàng của quý khách có thể mất một ít thời gian để xử lý
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
  );
};

export default CheckoutSuccessPage;
