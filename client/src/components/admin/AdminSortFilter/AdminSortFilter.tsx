import React from "react";

interface adminSortFilterProps {
  handleChangeSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AdminSortFilter = (props: adminSortFilterProps) => {
  const { handleChangeSort } = props;
  return (
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={handleChangeSort}
    >
      <option>Sắp xếp</option>
      <option value="name">Theo tên, A - Z</option>
      <option value="-name">Theo tên, Z - A</option>
      <option value="price">Giá, tăng dần</option>
      <option value="-price">Giá, giảm dần</option>
      <option value="totalRatings">Đánh giá, tăng dần</option>
      <option value="-totalRatings">Đánh giá, giảm dần</option>
      <option value="updatedAt">Ngày cập nhật, xa nhất</option>
      <option value="-updatedAt">Ngày cập nhật, gần nhất</option>
    </select>
  );
};

export default AdminSortFilter;
