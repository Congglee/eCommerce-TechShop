import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components/user";

type Props = {};

const UserLayout = (props: Props) => {
  return (
    <div className="font-Poppins w-full max-w-[1920px]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
