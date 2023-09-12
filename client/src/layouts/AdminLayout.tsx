import React, { useEffect } from "react";
import { AdminHeader, Sidebar } from "../components/admin";
import { Outlet } from "react-router-dom";
import { UpdateUserPage } from "../pages/admin";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRoleAccessDeniedHandler } from "../hooks/useHandleAccess";
import jwt_decode from "jwt-decode";
import useIsMounted from "../hooks/useMounted";

type Props = {};

const AdminLayout = (props: Props) => {
  const { isShowUpdateUserDrawer } = useSelector(
    (state: RootState) => state.user
  );
  const { isLoggedIn, token } = useSelector((state: RootState) => state.auth);
  const handleAccessDenied = useRoleAccessDeniedHandler();

  useEffect(() => {
    if (token) {
      const { isAdmin } = jwt_decode(token) as { isAdmin: boolean };
      if (!isLoggedIn || !isAdmin) handleAccessDenied();
    }
  }, [isLoggedIn, token]);

  return (
    <div className="font-Inter relative h-screen overflow-x-hidden">
      <AdminHeader />

      <Sidebar />

      <div className="p-2 tablet:ml-64">
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 max-w-screen-desktop2xl mx-auto">
          <Outlet />
        </div>
      </div>

      <div
        className={`absolute top-0 right-0 w-[250px] tablet:w-[320px] ipad:w-[360px] laptop:w-[450px] h-full bg-gray-800 z-[60] p-5 
        ${
          isShowUpdateUserDrawer
            ? "animate-show-right-up"
            : "animate-show-right-down"
        }`}
      >
        <div className="scroll">
          <UpdateUserPage />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="text-[15px]"
      />
    </div>
  );
};

export default AdminLayout;
