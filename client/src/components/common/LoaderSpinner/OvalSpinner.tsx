import React from "react";
import { Oval } from "react-loader-spinner";

type Props = {};

const OvalSpinner = (props: Props) => {
  return (
    <Oval
      height={24}
      width={24}
      color="#75b9ed"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#75b9ed"
      strokeWidth={5}
      strokeWidthSecondary={5}
    />
  );
};

export default OvalSpinner;
