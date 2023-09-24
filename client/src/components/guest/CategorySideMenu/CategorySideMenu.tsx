import icons from "../../../utils/icons";
import laptop_icon from "../../../assets/laptop-icon.png";
import { useGetCategoriesQuery } from "../../../features/category/category.services";
import { ICategory } from "../../../interfaces/category.interface";
import { Link, useParams } from "react-router-dom";

const { GrUnorderedList } = icons;

const CategorySideMenu = () => {
  const { data, isFetching } = useGetCategoriesQuery({});
  const { category: categoryParams } = useParams();

  return (
    <div className="border border-[#ebebeb]">
      <div className="py-[10px] px-5 uppercase bg-main-200 text-white text-base font-semibold flex items-center md:items-start gap-x-[10px]">
        <GrUnorderedList size={22} />
        <h3>Thương hiệu</h3>
      </div>

      {isFetching && (
        <div
          role="status"
          className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {!isFetching && (
        <div className="px-5 flex flex-col">
          {data?.categories
            .filter((category) => category.name !== "uncategorized")
            .map((category: ICategory) => {
              const isActive = categoryParams === category.slug;
              return (
                <div
                  className="flex items-center flex-wrap gap-x-3 py-[14px]"
                  key={category._id}
                >
                  <div className="w-5 h-5">
                    <img src={laptop_icon} alt="" />
                  </div>
                  <Link to={`/category/${category.slug}`}>
                    <span
                      className={`text-base ${
                        isActive ? "text-main-200" : "text-main-600"
                      }`}
                    >
                      {category.name}
                    </span>
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default CategorySideMenu;
