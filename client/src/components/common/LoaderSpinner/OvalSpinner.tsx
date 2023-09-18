import React from "react";
import { Oval } from "react-loader-spinner";

interface ovalSpinnerProps {
  width?: string | number;
  height?: string | number;
}

const OvalSpinner = ({ width = 24, height = 24 }: ovalSpinnerProps) => {
  return (
    <Oval
      height={width}
      width={height}
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
