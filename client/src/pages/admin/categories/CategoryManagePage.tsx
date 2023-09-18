import React, { useEffect } from "react";
import { AdminPagination } from "../../../components/admin";
import icons from "../../../utils/icons";
import { useQueryString } from "../../../hooks/useQueryString";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../features/category/category.services";
import { formatDate, generateSearchParamsURL } from "../../../utils/fn";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSeletedSort } from "../../../features/product/product.slice";

const { BiBookAdd } = icons;

type Props = {};

const CategoryManagePage = (props: Props) => {
  const queryString: {
    name?: string;
    sort?: string;
    page?: string;
  } = useQueryString();
  const { name, sort, page } = queryString;
  const { data, isFetching } = useGetCategoriesQuery({
    name: name || "",
    sort: sort || "",
    page: page || 1,
    limit: import.meta.env.VITE_APP_LIMIT_ADMIN_PER_PAGE || 8,
  });
  const [deleteCategory, deleteCategoryResult] = useDeleteCategoryMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");
  const categoriesPath = path[path.length - 1];

  const handleDeleteCategory = async (id: string) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa danh mục này",
      text: "Bạn có chắc là muốn xóa danh mục này không ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Không",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận",
    });

    if (result.isConfirmed) {
      deleteCategory(id);
    }
  };

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
      adminUrlValue: categoriesPath,
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
      adminUrlValue: categoriesPath,
    });
    navigate(sortUrl);
  };

  useEffect(() => {
    if (deleteCategoryResult.isSuccess) {
      toast.success(deleteCategoryResult.data.message);
    }
  }, [deleteCategoryResult.isSuccess]);

  useEffect(() => {
    if (deleteCategoryResult.isError) {
      toast.error((deleteCategoryResult.error as any).data.message);
    }
  }, [deleteCategoryResult.isError]);

  return (
    <div className="relative overflow-hidden shadow-md tablet:rounded-lg">
      <div className="flex flex-col ipad:flex-row items-center justify-between space-y-3 ipad:space-y-0 ipad:space-x-4 p-4 bg-white dark:bg-gray-900">
        <div className="w-full ipad:w-auto flex flex-col ipad:flex-row space-y-2 ipad:space-y-0 items-center ipad:items-stretch justify-end ipad:space-x-2 flex-shrink-0">
          <Link
            to="create"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center inline-flex items-center justify-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 p-2.5 gap-x-2"
          >
            <BiBookAdd size={20} />
            <span>Thêm mới</span>
          </Link>

          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChangeSort}
          >
            <option>Sắp xếp</option>
            <option value="name">Theo tên, A - Z</option>
            <option value="-name">Theo tên, Z - A</option>
            <option value="createdAt">Ngày tạo, xa nhất</option>
            <option value="-createdAt">Ngày tạo, gần nhất</option>
          </select>
        </div>

        <div className="w-full ipad:w-1/2">
          <form className="flex items-center" onSubmit={handleSearchSubmit}>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>

            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                name="searchInput"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tìm kiếm danh mục"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                #
              </th>
              <th scope="col" className="px-4 py-3">
                Danh mục
              </th>
              <th scope="col" className="px-4 py-3">
                Thương hiệu
              </th>
              <th scope="col" className="px-4 py-3">
                Ngày tạo
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
                    <div className="flex items-center justify-between">
                      <div className="w-full h-5 bg-gray-300 rounded-full dark:bg-gray-700" />
                    </div>
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
                        Sửa
                      </button>

                      <button
                        type="button"
                        className="px-5 py-2.5 mb-2 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {!isFetching &&
              data?.categories.map((category, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={category._id}
                >
                  <td className="px-4 py-3 text-base font-semibold text-white">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 text-white">{category.name}</td>
                  <td className="px-4 py-3 text-white">
                    {category.brand.map((item, index) => (
                      <span key={index}>
                        {index > 0 && " - "} {item}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-white">
                    {formatDate(category.createdAt)}
                  </td>

                  <td className="px-4 py-3">
                    {category.name !== "uncategorized" && (
                      <div className="flex items-center gap-x-2">
                        <Link to={`update/${category._id}`}>
                          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm  text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                              Sửa
                            </span>
                          </button>
                        </Link>

                        <button
                          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                          onClick={() => handleDeleteCategory(category._id)}
                        >
                          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Xóa
                          </span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <AdminPagination
        name={name}
        sort={sort}
        totalData={data?.categories.length as number}
        totalCount={data?.totalCategory as number}
        adminPath={categoriesPath}
      />
    </div>
  );
};

export default CategoryManagePage;
