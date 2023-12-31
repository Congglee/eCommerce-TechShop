import React, { useState } from "react";
import logo from "../../../assets/logo_digital_new_250x.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowSidebar } from "../../../features/app.slice";
import { RootState } from "../../../store/store";
import { logOut } from "../../../features/auth/auth.slice";
import useOutsideClickHandler from "../../../hooks/useOutsiteClickHandle";

interface adminHeader {
  toggleButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
  currentUserRef: React.MutableRefObject<HTMLDivElement | null>;
}

const AdminHeader = (props: adminHeader) => {
  const { toggleButtonRef, currentUserRef } = props;
  const [isShowCurrentUser, setIsShowCurrentUser] = useState(false);
  const { showSidebar } = useSelector((state: RootState) => state.app);
  const { userData } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useOutsideClickHandler(
    currentUserRef,
    () => {
      setIsShowCurrentUser(false);
    },
    [toggleButtonRef]
  );

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 laptop:px-5 laptop:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg tablet:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              ref={toggleButtonRef}
              onClick={() => dispatch(toggleShowSidebar(!showSidebar))}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>

            <Link to="/" className="flex ml-2 ipad:mr-24">
              <img
                src={logo}
                className="h-8 mr-3 w-52 object-contain mobile:w-full"
                alt="FlowBite Logo"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <div
              className="flex items-center ml-3 relative"
              ref={currentUserRef}
            >
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={() =>
                    setIsShowCurrentUser((prevState) => !prevState)
                  }
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={userData?.avatar as string}
                    alt="user photo"
                  />
                </button>
              </div>

              {isShowCurrentUser && (
                <div className="absolute top-6 right-0 w-[165px] z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {userData?.name}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {userData?.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Quản trị
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Cài đặt
                      </a>
                    </li>
                    <li>
                      <span
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                        role="menuitem"
                        onClick={() => {
                          dispatch(logOut());
                          navigate("/login");
                        }}
                      >
                        Đăng xuất
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
