import React from "react";
import { useNavigate } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";
import { useQueryString } from "../../../hooks/useQueryString";
import { generateSearchParamsURL } from "../../../utils/fn";

type Props = {};

interface IAdminPaginationProps {
  name?: string;
  totalCount: number;
  totalData: number;
  sort?: string;
  brand?: string;
  orderStatus?: string;
  adminPath?: string;
}

const AdminPagination = (props: IAdminPaginationProps) => {
  const { name, totalCount, totalData, sort, brand, orderStatus, adminPath } =
    props;
  const navigate = useNavigate();
  const pagination = usePagination(
    totalCount,
    1,
    import.meta.env.VITE_APP_LIMIT_ADMIN_PER_PAGE
  );

  const queryString = useQueryString();
  const page = Number(queryString.page) || 1;

  const handlePaginationUrl = (value: string | number) => {
    const paginationUrl = generateSearchParamsURL({
      name,
      sort,
      price_filter_gte: "",
      price_filter_lte: "",
      brand,
      page: value as string,
      isCategory: false,
      categoryUrlValue: "",
      isAdmin: true,
      adminUrlValue: adminPath,
      orderStatus,
    });

    navigate(paginationUrl);
  };

  return (
    <nav
      className="flex flex-col items-start justify-between p-4 space-y-3 ipad:flex-row ipad:items-center ipad:space-y-0 bg-gray-800"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Hiển thị{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalData}{" "}
        </span>
        trên{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalCount}
        </span>
      </span>
      <ul className="inline-flex -space-x-px text-sm h-8">
        {pagination?.map((item) => {
          const isActive = page === item;
          return (
            <li key={item as number}>
              <button
                className={`flex items-center justify-center px-3 h-8 border   bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white ${
                  isActive &&
                  "hover:bg-blue-100 hover:text-blue-500 border-gray-700 bg-gray-700 text-white"
                }`}
                onClick={() => handlePaginationUrl(item as number)}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AdminPagination;
