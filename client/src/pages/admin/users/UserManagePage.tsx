import React, { useEffect } from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../features/user/user.services";
import { formatDate, generateSearchParamsURL } from "../../../utils/fn";
import { useQueryString } from "../../../hooks/useQueryString";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AdminPagination,
  AdminSearch,
  AdminSortFilter,
  UserLoadingRow,
} from "../../../components/admin";
import { useDispatch } from "react-redux";
import {
  setUserDetail,
  showUpdateUserDrawer,
} from "../../../features/user/user.slice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { setSeletedSort } from "../../../features/product/product.slice";
import icons from "../../../utils/icons";

const { PiCircleFill } = icons;

type Props = {};

const UserManagePage = (props: Props) => {
  const queryString: { name?: string; sort?: string; page?: string } =
    useQueryString();
  const { name, sort, page } = queryString;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/");
  const usersPath = path[path.length - 1];

  const userOptionsSort = [
    {
      label: "Theo tên, A - Z",
      value: "name",
    },
    {
      label: "Theo tên, Z - A",
      value: "-name",
    },
    {
      label: "Ngày cập nhật, xa nhất",
      value: "updatedAt",
    },
    {
      label: "Ngày cập nhật, gần nhất",
      value: "-updatedAt",
    },
  ];

  const { data, isFetching } = useGetUsersQuery({
    name: name || "",
    page: page || 1,
    sort: sort || "",
    limit: import.meta.env.VITE_APP_LIMIT_ADMIN_PER_PAGE || 8,
  });
  const [deleteUser, deleteUserResult] = useDeleteUserMutation();

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
      adminUrlValue: usersPath,
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
      adminUrlValue: usersPath,
    });
    navigate(sortUrl);
  };

  const handleDeleteUser = async (id: string) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa tài khoản này",
      text: "Bạn có chắc là muốn xóa tài khoản này không ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Không",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận",
    });

    if (result.isConfirmed) {
      deleteUser(id);
    }
  };

  useEffect(() => {
    if (deleteUserResult.isSuccess) {
      toast.success(deleteUserResult.data.deletedUser);
    }
  }, [deleteUserResult.isSuccess]);

  useEffect(() => {
    if (deleteUserResult.isError) {
      toast.error((deleteUserResult.error as any).data.message);
    }
  }, [deleteUserResult.isError]);

  return (
    <div className="relative overflow-hidden shadow-md tablet:rounded-lg">
      <div className="flex flex-col ipad:flex-row items-center justify-between space-y-3 ipad:space-y-0 ipad:space-x-4 p-4 bg-white dark:bg-gray-900">
        <div className="w-full ipad:w-auto flex flex-col ipad:flex-row space-y-2 ipad:space-y-0 items-stretch ipad:items-center justify-end ipad:space-x-3 flex-shrink-0">
          <AdminSortFilter
            handleChangeSort={handleChangeSort}
            options={userOptionsSort}
          />
        </div>

        <AdminSearch
          handleSearchSubmit={handleSearchSubmit}
          placeHolder="Tìm kiếm tài khoản"
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
                Họ và tên
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>
              <th scope="col" className="px-4 py-3">
                Avatar
              </th>
              <th scope="col" className="px-4 py-3">
                Địa chỉ
              </th>
              <th scope="col" className="px-4 py-3">
                SĐT
              </th>
              <th scope="col" className="px-4 py-3">
                Vai trò
              </th>
              <th scope="col" className="px-4 py-3">
                Trạng thái
              </th>
              <th scope="col" className="px-4 py-3">
                Được tạo vào
              </th>
              <th scope="col" className="px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isFetching &&
              [...Array(3)].map((_, index) => <UserLoadingRow key={index} />)}

            {!isFetching &&
              data?.users.map((user, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={user._id}
                >
                  <td className="px-4 py-3 text-base font-semibold text-white">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 text-white">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.avatar as string}
                      alt="Jese image"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium whitespace-normal break-words">
                    {user.address}
                  </td>
                  <td className="px-4 py-3">{user.mobile}</td>
                  <td className="px-4 py-3">
                    {user.isAdmin ? "Admin" : "Khách"}
                  </td>
                  <td className="px-4 py-3">
                    {user.isBlocked ? (
                      <div className="flex items-start gap-x-3 gap-y-2 flex-col desktop2xl:flex-row desktop2xl:items-center">
                        <div className="text-red-600">
                          <PiCircleFill size={14} />
                        </div>
                        <span>Bị khóa</span>
                      </div>
                    ) : (
                      <div className="flex items-start gap-x-3 gap-y-2 flex-col desktop2xl:flex-row desktop2xl:items-center">
                        <div className="text-green-600">
                          <PiCircleFill size={14} />
                        </div>
                        <span>Đang hoạt động</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">{formatDate(user.createdAt)}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-x-2">
                      <button
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm  text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                        onClick={() => {
                          dispatch(showUpdateUserDrawer(true));
                          dispatch(setUserDetail({ id: user._id }));
                        }}
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Sửa
                        </span>
                      </button>

                      <button
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Xóa
                        </span>
                      </button>
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
        totalData={data?.users.length as number}
        totalCount={data?.totalUser as number}
        adminPath={usersPath}
      />
    </div>
  );
};

export default UserManagePage;
