import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import icons from "../../utils/icons";
import usePagination from "../../hooks/usePagination";
import clsx from "clsx";

const { BsArrowRight } = icons;

interface IPaginationProps {
  name: string;
  sort: string;
  price_filter_gte: string;
  price_filter_lte: string;
  totalCount: number;
}

const Pagination = (props: IPaginationProps) => {
  const { name, sort, price_filter_gte, price_filter_lte, totalCount } = props;
  const navigate = useNavigate();
  const pagination = usePagination(totalCount, 1);

  const handlePaginationUrl = (value: string | number) => {
    const paginationUrl = `?page=${value}${
      name || price_filter_gte || price_filter_lte || sort
        ? `&name=${name === null ? "" : name}&sort=${
            sort === null ? "" : sort
          }&price_filter_gte=${
            price_filter_gte === null ? "" : price_filter_gte
          }&price_filter_lte=${
            price_filter_lte === null ? "" : price_filter_lte
          }`
        : ""
    }`;

    navigate(paginationUrl);
  };

  return (
    <div className="flex justify-center gap-x-[6px] font-medium text-base uppercase">
      {pagination?.map((item) => (
        <div
          className={clsx(
            "hover:text-[#ee3131] w-5 h-5 p-4 rounded-full hover:bg-[rgba(0,0,0,0.4)] text-black flex justify-center cursor-pointer",
            !Number(item) && "items-end",
            Number(item) && "items-center"
          )}
          key={item as number}
          onClick={() => handlePaginationUrl(item as number)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
