import React, { useState } from "react";
import HeaderTop from "../HeaderTop/HeaderTop";
import HeaderSection from "../HeaderSection/HeaderSection";
import Navigation from "../Navigation/Navigation";

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
