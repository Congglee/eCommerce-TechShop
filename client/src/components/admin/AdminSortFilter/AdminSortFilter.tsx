import React from "react";

type Option = {
  label: string;
  value: string | number;
};
interface adminSortFilterProps {
  handleChangeSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: Option[];
}

const AdminSortFilter = (props: adminSortFilterProps) => {
  const { handleChangeSort, options } = props;
  return (
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={handleChangeSort}
    >
      <option value="">Sắp xếp</option>
      {options?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default AdminSortFilter;
