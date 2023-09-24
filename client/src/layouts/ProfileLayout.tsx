import { Outlet, useParams } from "react-router-dom";
import Breadcrumb from "../components/guest/Breadcrumb/Breadcrumb";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetOrderDetailQuery } from "../features/order/order.services";

const ProfileLayout = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { id } = useParams();
  const { data } = useGetOrderDetailQuery(id || "");

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
        {isLoggedIn && <Outlet />}
      </div>
    </>
  );
};

export default ProfileLayout;
