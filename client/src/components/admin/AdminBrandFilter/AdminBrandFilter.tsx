import React from "react";
import { IBrand } from "../../../interfaces/brand.interface";

interface adminBrandFilterProps {
  brandFilterRef: React.MutableRefObject<HTMLDivElement | null>;
  setIsShowBrandFilter: React.Dispatch<React.SetStateAction<boolean>>;
  isShowBrandFilter: boolean;
  brandsData?: IBrand[];
  handleChangeFilterBrand: (e: React.ChangeEvent<HTMLInputElement>) => void;
  brandFilter: string[];
}

const AdminBrandFilter = (props: adminBrandFilterProps) => {
  const {
    brandFilter,
    brandFilterRef,
    handleChangeFilterBrand,
    isShowBrandFilter,
    setIsShowBrandFilter,
    brandsData,
  } = props;

  return (
    <div className="relative w-full" ref={brandFilterRef}>
      <button
        className="w-full inline-flex items-center justify-between p-2.5 gap-x-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsShowBrandFilter((prev) => !prev)}
      >
        Thương hiệu
        <svg
          className="w-2.5 h-2.5 ml-2.5"
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

      {isShowBrandFilter && (
        <div className="absolute z-10 bg-white rounded-lg shadow w-48 dark:bg-gray-700 mt-4">
          <ul className="h-80 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
            {brandsData?.map((brandItem) => (
              <li key={brandItem._id}>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    onChange={handleChangeFilterBrand}
                    id={brandItem._id}
                    type="checkbox"
                    value={brandItem.title}
                    checked={brandFilter.includes(brandItem.title)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={brandItem._id}
                    className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    {brandItem.title}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminBrandFilter;
