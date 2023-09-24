import { RotatingLines } from "react-loader-spinner";

const RotatingSpinner = () => {
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
