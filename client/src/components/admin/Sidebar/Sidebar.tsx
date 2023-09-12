import React, { useState } from "react";
import icons from "../../../utils/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const {
  BiCategoryAlt,
  AiOutlineUser,
  HiShoppingBag,
  FaRegMoneyBillAlt,
  AiFillSetting,
  AiOutlineDashboard,
  CgWebsite,
} = icons;

type Props = {};

const Sidebar = (props: Props) => {
  const [tabStates, setTabStates] = useState<boolean[]>([]);
  const { showSidebar } = useSelector((state: RootState) => state.app);

  const toggleSidebarTab = (index: number) => {
    const newTabStates = [...tabStates];
    newTabStates[index] = !newTabStates[index];
    setTabStates(newTabStates);
  };

  const sidebarTabs = [
    {
      label: "Danh mục",
      icon: <BiCategoryAlt size={22} />,
      dropdown: [
        { title: "Quản lý danh mục", path: "/admin/categories" },
        { title: "Thêm mới danh mục", path: "/admin/categories/create" },
      ],
    },
    {
      label: "Tài khoản",
      icon: <AiOutlineUser size={22} />,
      dropdown: [{ title: "Quản lý tài khoản", path: "/admin/users" }],
    },
    {
      label: "Sản phẩm",
      icon: <HiShoppingBag size={22} />,
      dropdown: [
        { title: "Quản lý sản phẩm", path: "/admin/products" },
        { title: "Thêm mới sản phẩm", path: "/admin/products/create" },
      ],
    },
    {
      label: "Đơn hàng",
      icon: <FaRegMoneyBillAlt size={22} />,
      dropdown: [{ title: "Quản lý đơn hàng", path: "/admin/orders" }],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform animate-show-left-down tablet:animate-show-left-up tablet:translate-x-0
       ${showSidebar ? "animate-show-left-up" : "animate-show-left-down"}`}
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ml-3">Dashboard</span>
            </a>
          </li>

          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <div className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                <CgWebsite size={22} />
              </div>
              <span className="flex-1 ml-3 whitespace-nowrap">Xem website</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <div className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                <AiOutlineDashboard size={22} />
              </div>
              <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
              {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span> */}
            </Link>
          </li>

          {sidebarTabs.map((tab, index) => (
            <li key={index}>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={() => toggleSidebarTab(index)}
              >
                <div className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                  {tab.icon}
                </div>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  {tab.label}
                </span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {tabStates[index] && (
                <ul className="py-2 space-y-2">
                  {tab.dropdown.map((tabDropdown) => (
                    <li key={tabDropdown.title}>
                      <Link
                        to={tabDropdown.path}
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        {tabDropdown.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <div className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                <AiFillSetting size={22} />
              </div>
              <span className="flex-1 ml-3 whitespace-nowrap">Cài đặt</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
