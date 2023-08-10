import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import icons from "../../../utils/icons";
import usePagination from "../../../hooks/usePagination";
import clsx from "clsx";
import { useQueryString } from "../../../hooks/useQueryString";

const { BsArrowRight } = icons;

interface IPaginationProps {
  name: string | undefined;
  sort: string | undefined;
  price_filter_gte: string | undefined;
  price_filter_lte: string | undefined;
  totalCount: number;
}

const Pagination = (props: IPaginationProps) => {
  const { name, sort, price_filter_gte, price_filter_lte, totalCount } = props;
  const navigate = useNavigate();
  const pagination = usePagination(totalCount, 1);
  const queryString = useQueryString();
  const page = Number(queryString.page) || 1;

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
      {pagination?.map((item) => {
        const isActive = page === item;
        return (
          <div
            className={clsx(
              "hover:text-[#ee3131] w-5 h-5 p-4 rounded-full hover:bg-[rgba(0,0,0,0.4)] text-black flex justify-center cursor-pointer",
              !Number(item) && "items-end",
              Number(item) && "items-center",
              isActive && "text-[#ee3131]"
            )}
            key={item as number}
            onClick={() => handlePaginationUrl(item as number)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
