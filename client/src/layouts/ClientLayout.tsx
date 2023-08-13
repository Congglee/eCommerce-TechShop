import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components/guest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const UserLayout = (props: Props) => {
  return (
    <div className="font-Inter w-full max-w-[1520px]">
      <Header />
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
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
