import React, { useEffect, useState } from "react";
import icons from "../../../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useGetCurrentUserQuery } from "../../../features/auth/auth.service";
import { logOut } from "../../../features/auth/auth.slice";

const {
  FaRegMoneyBillAlt,
  FiChevronDown,
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoInstagramAlt,
  BiLogoGoogle,
  BiLogoPinterest,
} = icons;

type Props = {};

const HeaderTop = (props: Props) => {
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const { data, isFetching, refetch, isError } = useGetCurrentUserQuery();
  const { isLoggedIn, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);

  useEffect(() => {
    if (isError) {
      dispatch(logOut());
    }
  }, [isError]);

  return (
    <div className="bg-main-200 w-full py-[10px] md:hidden">
      <div className="max-w-[1220px] mx-auto px-5 900:gap-x-10 flex justify-between items-center">
        <div className="flex items-center gap-x-[10px] 900:gap-x-[5px] text-white text-xs">
          <span>
            ĐẶT HÀNG TRỰC TUYẾN HOẶC GỌI CHO CHÚNG TÔI (+1800) 000 8808
          </span>
          <div className="flex items-start border-l border-[rgba(255,255,255,0.3)] pl-[10px] 900:pl-5 cursor-pointer">
            <FaRegMoneyBillAlt size={16} />
            <span className="pl-[6px] pr-[2px]">VND</span>
            <FiChevronDown size={15} />
          </div>
        </div>

        <div className="flex items-center text-white text-xs cursor-pointer gap-x-[10px] 900:gap-x-[5px]">
          <div className="hover:text-[#151515] transition-all duration-200 ease-linear">
            {isLoggedIn ? (
              <div
                className="flex items-center gap-x-2 relative"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                  <img
                    src={data?.userData.avatar as string}
                    alt=""
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <Link to="/profile">{`Hello ${
                    isFetching ? "....." : `${data?.userData.name}`
                  }`}</Link>
                </div>

                <div
                  className={`z-10 absolute top-[35px] right-0 left-0 bg-main-500 divide-y divide-gray-100 rounded-lg shadow w-[165px] after:content-[''] after:absolute after:w-full after:h-1 after:top-0 after:left-0 after:bg-transparent after:translate-y-[-100%] transition-all duration-200 ease-linear ${
                    isHover ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <div className="px-4 py-3 text-[13px] text-gray-900 dark:text-white">
                    <div>{data?.userData.name}</div>
                    <div className="font-medium truncate">
                      {data?.userData?.email}
                    </div>
                  </div>
                  <ul className="py-2 text-[13px] text-gray-700 dark:text-gray-200">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Tài khoản
                      </Link>
                    </li>

                    {data?.userData.isAdmin && (
                      <li>
                        <Link
                          to="/admin"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Quản lý website
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link
                        to="/cart"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Giỏ hàng
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/forgotpassword"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Đổi mật khẩu
                      </Link>
                    </li>
                  </ul>
                  <div className="py-2">
                    <span
                      className="block px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={() => {
                        dispatch(logOut());
                        navigate("/login");
                      }}
                    >
                      Đăng xuất
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="login">Đăng nhập hoặc Tạo tài khoản</Link>
            )}
          </div>

          <div className="border-l border-[rgba(255,255,255,0.3)] pl-[10px] 900:pl-[5px]">
            <BiLogoFacebook size={15} />
          </div>
          <div className="border-l border-[rgba(255,255,255,0.3)] pl-[10px] 900:pl-[5px]">
            <BiLogoTwitter size={15} />
          </div>
          <div className="border-l border-[rgba(255,255,255,0.3)] pl-[10px] 900:pl-[5px]">
            <BiLogoInstagramAlt size={15} />
          </div>
          <div className="border-l border-[rgba(255,255,255,0.3)] pl-[10px] 900:pl-[5px]">
            <BiLogoGoogle size={15} />
          </div>
          <div className="border-l border-[rgba(255,255,255,0.3)] pl-[10px] 900:pl-[5px]">
            <BiLogoPinterest size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
