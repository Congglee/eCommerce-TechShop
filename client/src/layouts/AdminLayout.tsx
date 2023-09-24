import { AdminHeader, Sidebar } from "../components/admin";
import { Outlet } from "react-router-dom";
import { UpdateUserPage } from "../pages/admin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import useOutsideClickHandler from "../hooks/useOutsiteClickHandle";
import { showUpdateUserDrawer } from "../features/user/user.slice";

const AdminLayout = () => {
  const { isShowUpdateUserDrawer } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const currentUserRef = useRef<HTMLDivElement | null>(null);
  const updateUserDrawerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClickHandler(updateUserDrawerRef, () => {
    dispatch(showUpdateUserDrawer(false));
  });

  return (
    <div className="font-Inter relative overflow-x-hidden">
      <AdminHeader
        toggleButtonRef={toggleButtonRef}
        currentUserRef={currentUserRef}
      />

      <Sidebar
        toggleButtonRef={toggleButtonRef}
        currentUserRef={currentUserRef}
      />

      <div className="p-2 tablet:ml-64">
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 max-w-screen-desktop2xl mx-auto">
          <Outlet />
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 w-[250px] tablet:w-[320px] ipad:w-[360px] laptop:w-[450px] h-full bg-gray-800 z-[60] p-5 
        ${
          isShowUpdateUserDrawer
            ? "animate-show-right-up"
            : "animate-show-right-down"
        }`}
        ref={updateUserDrawerRef}
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
