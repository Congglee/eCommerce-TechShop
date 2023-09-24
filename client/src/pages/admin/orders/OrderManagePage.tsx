import React from "react";
import {
  AdminPagination,
  AdminSearch,
  AdminSortFilter,
} from "../../../components/admin";
import { useQueryString } from "../../../hooks/useQueryString";
import { useGetOrdersByAdminQuery } from "../../../features/order/order.services";
import { IUser } from "../../../interfaces/user.interface";
import {
  formatCurrency,
  formatDate,
  generateSearchParamsURL,
} from "../../../utils/fn";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSeletedSort } from "../../../features/product/product.slice";

const OrderManagePage = () => {
  const queryString: {
    name?: string;
    sort?: string;
    orderStatus?: string;
    page?: string;
  } = useQueryString();
  const { name, sort, orderStatus, page } = queryString;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = location.pathname.split("/");
  const ordersPath = path[path.length - 1];

  const orderOptionsSort = [
    {
      label: "Theo mã đơn hàng, A - Z",
      value: "orderCode",
    },
    {
      label: "Theo mã đơn hàng, Z - A",
      value: "-orderCode",
    },
    {
      label: "Tổng tiền, tăng dần",
      value: "total",
    },
    {
      label: "Tổng tiền, tăng dần",
      value: "-total",
    },
    {
      label: "Ngày đặt, xa nhất",
      value: "date",
    },
    {
      label: "Ngày đặt, gần nhất",
      value: "-date",
    },
  ];

  const { data: ordersData, isFetching } = useGetOrdersByAdminQuery({
    orderCode: name || "",
    orderStatus:
      orderStatus === "1"
        ? "Đang xử lý"
        : orderStatus === "2"
        ? "Đã hủy"
        : orderStatus === "3"
        ? "Thành công"
        : "",
    sort: sort || "",
    page: page || 1,
    limit: import.meta.env.VITE_APP_LIMIT_ADMIN_PER_PAGE || 8,
  });

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (e.target as HTMLFormElement).searchInput.value;
    const searchUrl = generateSearchParamsURL({
      name: inputValue,
      sort,
      price_filter_gte: "",
      price_filter_lte: "",
      brand: "",
      page,
      isCategory: false,
      categoryUrlValue: "",
      isAdmin: true,
      adminUrlValue: ordersPath,
      orderStatus,
    });

    navigate(searchUrl);
  };

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(setSeletedSort(value));
    const sortUrl = generateSearchParamsURL({
      name,
      sort: value,
      price_filter_gte: "",
      price_filter_lte: "",
      brand: "",
      page,
      isCategory: false,
      categoryUrlValue: "",
      isAdmin: true,
      adminUrlValue: ordersPath,
      orderStatus,
    });
    navigate(sortUrl);
  };

  const handleChangeOrderStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const orderStatusUrl = generateSearchParamsURL({
      name,
      sort,
      price_filter_gte: "",
      price_filter_lte: "",
      brand: "",
      page,
      isCategory: false,
      categoryUrlValue: "",
      isAdmin: true,
      adminUrlValue: ordersPath,
      orderStatus: value,
    });
    navigate(orderStatusUrl);
  };

  return (
    <div className="relative overflow-hidden shadow-md tablet:rounded-lg">
      <div className="flex flex-col laptop:flex-row items-center gap-y-3 justify-between space-y-3 ipad:space-y-0 ipad:space-x-4 p-4 bg-white dark:bg-gray-900">
        <div className="w-full ipad:w-auto flex flex-col ipad:flex-row space-y-2 ipad:space-y-0 items-center ipad:items-stretch justify-end ipad:space-x-2 flex-shrink-0">
          <AdminSortFilter
            handleChangeSort={handleChangeSort}
            options={orderOptionsSort}
          />

          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChangeOrderStatus}
          >
            <option value="">Trạng thái</option>
            <option value="1">Đang xử lý</option>
            <option value="2">Đã hủy</option>
            <option value="3">Thành công</option>
          </select>
        </div>

        <AdminSearch
          placeHolder="Tìm kiếm đơn hàng theo mã"
          handleSearchSubmit={handleSearchSubmit}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                #
              </th>
              <th scope="col" className="px-4 py-3">
                Mã đơn hàng
              </th>
              <th scope="col" className="px-4 py-3">
                Khách
              </th>
              <th scope="col" className="px-4 py-3">
                Số lượng
              </th>
              <th scope="col" className="px-4 py-3">
                Tổng
              </th>
              <th scope="col" className="px-4 py-3">
                Trạng thái
              </th>
              <th scope="col" className="px-4 py-3">
                Ngày đặt
              </th>
              <th scope="col" className="px-4 py-3">
                Cập nhật vào
              </th>
              <th scope="col" className="px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isFetching &&
              [...Array(3)].map((_, index) => (
                <tr
                  className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                  key={index}
                >
                  <td className="px-4 py-3">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-5">
                      <svg
                        className="w-12 h-12 text-gray-200 dark:text-gray-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>

                      <div className="w-2/5 h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-x-2">
                      <button
                        type="button"
                        className="px-5 py-2.5 mb-2 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Xem
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {!isFetching &&
              ordersData?.orders.map((order, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={order._id}
                >
                  <td className="px-4 py-3 text-base font-semibold text-white">
                    {page
                      ? (Number(page) - 1) *
                          import.meta.env.VITE_APP_LIMIT_ADMIN_PER_PAGE +
                        index +
                        1
                      : index + 1}
                  </td>

                  <td className="px-4 py-3 text-white">{order.orderCode}</td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    <div className="flex items-center space-x-5">
                      <img
                        className="w-12 h-12 rounded-full flex-shrink-0"
                        src={(order.orderBy as IUser).avatar as string}
                        alt="Jese image"
                      />

                      <span className="font-medium transition flex-1 min-w-[200px] whitespace-normal">
                        {(order.orderBy as IUser).name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white">
                    {order.products.reduce((acc, item) => acc + item.count, 0)}
                  </td>
                  <td className="px-4 py-3 text-white">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-4 py-3 text-white">{order.status}</td>

                  <td className="px-4 py-3 text-white">{order.date}</td>
                  <td className="px-4 py-3 text-white">
                    {formatDate(order.updatedAt)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-x-2">
                      <Link to={`update/${order._id}`}>
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm  text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Xem
                          </span>
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <AdminPagination
        name={name}
        sort={sort}
        orderStatus={orderStatus}
        totalData={ordersData?.orders.length as number}
        totalCount={ordersData?.totalOrder as number}
        adminPath={ordersPath}
      />
    </div>
  );
};

export default OrderManagePage;
