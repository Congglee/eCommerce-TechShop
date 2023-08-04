import React, { useRef } from "react";
import icons from "../../utils/icons";
import laptop_icon from "../../assets/laptop-icon.png";
import { useGetCategoriesQuery } from "../../features/category/category.services";
import { ICategory } from "../../@types/category.interface";
import { Link } from "react-router-dom";

const { GrUnorderedList } = icons;

type Props = {};

const CategorySideMenu = (props: Props) => {
  const { data } = useGetCategoriesQuery();

  return (
    <div className="border border-[#ebebeb]">
      <div className="py-[10px] px-5 uppercase bg-main-200 text-white text-base font-semibold flex items-center gap-x-[10px]">
        <GrUnorderedList size={22} />
        <h3>Danh mục</h3>
      </div>

      <div className="px-5 flex flex-col">
        {data?.categories.map((category: ICategory) => (
          <div
            className="flex items-center gap-x-3 py-[14px]"
            key={category._id}
          >
            <div className="w-5 h-5">
              <img src={laptop_icon} alt="" />
            </div>
            <Link to={`/category/${category.slug}`}>
              <span className="text-main-600 text-base">{category.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySideMenu;
