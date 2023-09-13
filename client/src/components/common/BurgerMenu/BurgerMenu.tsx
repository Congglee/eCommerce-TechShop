import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icons from "../../../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { logOut } from "../../../features/auth/auth.slice";
import jwt_decode from "jwt-decode";
import { useGetCurrentUserQuery } from "../../../features/auth/auth.service";

const { AiOutlineUser, BiSolidUserAccount, AiOutlineClose } = icons;

interface burgerMenuProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerMenu = (props: burgerMenuProps) => {
  const { handleSubmit, isActive, setIsActive } = props;
  const { isLoggedIn, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isError } = useGetCurrentUserQuery();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token) as { isAdmin: boolean };
      setIsAdmin(decodedToken.isAdmin);
    }
  }, [token]);

  useEffect(() => {
    if (isError) {
      dispatch(logOut());
    }
  }, [isError]);

  return (
    <div
      className={`769:hidden fixed top-0 bottom-0 left-0 bg-main-600 px-[10px] w-[40%] z-[50] ${
        isActive ? "block animate-show-left-up" : "animate-show-left-down"
      }`}
    >
      <div className="flex items-center py-[15px] text-white h-[80px] border-b border-[#343535] mb-1">
        <button onClick={() => setIsActive(false)}>
          <AiOutlineClose size={26} />
        </button>
      </div>

      <ul>
        <li className="text-white uppercase py-[10px] border-b border-[#343535] mb-[10px]">
          <Link to="/">Trang chủ</Link>
        </li>
        <li className="text-white uppercase py-[10px] border-b border-[#343535] mb-[10px]">
          <Link to="/products">Sản phẩm</Link>
        </li>
        <li className="text-white uppercase py-[10px] border-b border-[#343535] mb-[10px]">
          Blog
        </li>
        <li className="text-white uppercase py-[10px] border-b border-[#343535] mb-[10px]">
          Liên hệ
        </li>
      </ul>

      <div className="mb-5">
        {!isLoggedIn && (
          <>
            <Link to="/login">
              <div className="flex items-center text-white py-[10px]">
                <AiOutlineUser size={20} />
                <span className="pl-2 uppercase">Đăng nhập</span>
              </div>
            </Link>

            <Link to="/register">
              <div className="flex items-center text-white py-[10px]">
                <BiSolidUserAccount size={20} />
                <span className="pl-2 uppercase">Tạo tài khoản</span>
              </div>
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/profile">
              <div className="flex items-center text-white py-[10px]">
                <span className="pl-2 uppercase">Tài khoản</span>
              </div>
            </Link>

            {data?.userData && isAdmin && (
              <Link to="/admin">
                <div className="flex items-center text-white py-[10px]">
                  <span className="pl-2 uppercase">Quản lý website</span>
                </div>
              </Link>
            )}

            <Link to="/forgotpassword">
              <div className="flex items-center text-white py-[10px]">
                <span className="pl-2 uppercase">Đổi mật khẩu</span>
              </div>
            </Link>
          </>
        )}

        {isLoggedIn && (
          <button
            className="flex items-center text-white py-[10px]"
            onClick={() => {
              dispatch(logOut());
              navigate("/login");
            }}
          >
            <span className="pl-2 uppercase">Đăng xuất</span>
          </button>
        )}
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Tìm kiếm
          </label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tìm kiếm"
              name="searchInput"
            />
            <button
              type="submit"
              className="text-white absolute inset-y-0 right-0 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              <div className="flex justify-center items-center pointer-events-none">
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
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BurgerMenu;
