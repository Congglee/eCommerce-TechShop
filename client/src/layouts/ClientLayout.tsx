import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components/guest";

type Props = {};

const UserLayout = (props: Props) => {
  return (
    <div className="font-Inter w-full max-w-[1520px]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
