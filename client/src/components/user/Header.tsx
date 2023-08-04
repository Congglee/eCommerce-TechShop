import React, { useState } from "react";
import HeaderTop from "./HeaderTop";
import HeaderSection from "./HeaderSection";
import Navigation from "./Navigation";

type Props = {};

const UserHeader = (props: Props) => {
  return (
    <div>
      <HeaderTop />
      <HeaderSection />
      <Navigation />
    </div>
  );
};

export default UserHeader;
