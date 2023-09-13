import React from "react";
import icons from "../../../utils/icons";

const { PiCircleFill } = icons;

type Props = {};

const UserLoadingRow = (props: Props) => {
  return (
    <tr className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
      <td className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="w-full h-5 bg-gray-300 rounded-full dark:bg-gray-700" />
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-700 mr-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5" />
      </td>
      <td className="px-4 py-3">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5" />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-start gap-x-3 gap-y-2 flex-col desktop2xl:flex-row desktop2xl:items-center">
          <div className="text-gray-600">
            <PiCircleFill size={14} />
          </div>
          <div className="w-full">
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5" />
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5" />
          </div>
        </div>
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
  );
};

export default UserLoadingRow;
