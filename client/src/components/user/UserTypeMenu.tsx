import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type Props = {
  handleChangeType: (type: string) => void;
};

const UserTypeMenu = ({ handleChangeType }: Props) => {
  return (
    <div>
      <div className="flex items-center space-x-[20px] ">
        <button
          className="focus:underline"
          onClick={() => handleChangeType("best_seller")}
        >
          <h2 className="text-[20px] text-[#171717]">BEST SELLER</h2>
        </button>
        <button
          className="focus:underline"
          onClick={() => handleChangeType("new_arrivals")}
        >
          <h2 className="text-[20px] text-[#171717] border border-1 border-y-0 px-[20px]">
            NEW ARRIVALS
          </h2>
        </button>
      </div>
    </div>
  );
};

export default UserTypeMenu;
