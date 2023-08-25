import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, Header } from "../components/guest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setCurrentScreenWidth } from "../features/app.slice";

type Props = {};

const UserLayout = (props: Props) => {
  const { pathname } = useLocation();
  const [currentWidth, setCurrentWidth] = useState(screen.width);
  const dispatch = useDispatch();

  const setWidth = (e: any) => {
    setCurrentWidth(e.target.screen.width);
  };

  useEffect(() => {
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  useEffect(() => {
    dispatch(setCurrentScreenWidth({ width: currentWidth }));
  }, [currentWidth]);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <div className="font-Inter w-full max-w-full">
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
