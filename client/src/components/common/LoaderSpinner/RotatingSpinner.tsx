import React from "react";
import { RotatingLines } from "react-loader-spinner";

type Props = {};

const RotatingSpinner = (props: Props) => {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.85"
      width="25"
      visible={true}
    />
  );
};

export default RotatingSpinner;
