const ProductLoadingRow = () => {
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
        <div className="w-24 h-24">
          <svg
            className="w-full h-full text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
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

export default ProductLoadingRow;
