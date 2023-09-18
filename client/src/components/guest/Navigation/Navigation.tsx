import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import icons from "../../../utils/icons";
import { useQueryString } from "../../../hooks/useQueryString";
import { generateSearchParamsURL } from "../../../utils/fn";
import { useGetCategoriesQuery } from "../../../features/category/category.services";

const { AiOutlineCaretDown } = icons;

type Props = {};

const Navigation = (props: Props) => {
  const [isHoverMenu, setIsHoverMenu] = useState<boolean>(false);
  const { data } = useGetCategoriesQuery({});
  const navigate = useNavigate();
  const { category } = useParams();
  const queryString: {
    name?: string;
    sort?: string;
    brand?: string;
    page?: string;
    price_filter_gte?: string;
    price_filter_lte?: string;
  } = useQueryString();
  const { sort, price_filter_gte, price_filter_lte, page, brand } = queryString;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (e.target as HTMLFormElement).searchInput.value;
    const isCategoryUrl: boolean = category ? true : false;

    const searchUrl = generateSearchParamsURL({
      name: inputValue,
      sort,
      price_filter_gte,
      price_filter_lte,
      brand,
      page,
      isCategory: isCategoryUrl,
      categoryUrlValue: category,
      isAdmin: false,
      adminUrlValue: "",
    });

    navigate(searchUrl);
  };

  return (
    <div className="md:hidden">
      <div className="max-w-[1220px] px-[20px] mx-auto flex items-center justify-between border-y border-y-[rgba(0,0,0,0.1)] py-2 relative">
        <div className="py-[5px] flex items-center gap-x-[30px]">
          <div className="uppercase text-main-300 text-sm cursor-pointer">
            <Link to="/" className=" flex gap-x-[5px] items-center">
              <span>Trang chủ</span>
              <AiOutlineCaretDown size={10} />
            </Link>
          </div>

          <div
            className="text-main-300 text-sm cursor-pointer"
            onMouseOver={() => setIsHoverMenu(true)}
            onMouseLeave={() => setIsHoverMenu(false)}
          >
            <Link to="products">
              <div className="flex gap-x-[5px] items-center uppercase">
                <span>Sản phẩm</span>
                <AiOutlineCaretDown size={10} />
              </div>
            </Link>

            <div
              className={`absolute left-0 right-0 top-12 z-20 bg-white shadow-[0px_2px_20px_#00000017] w-full px-10 py-[30px] overflow-hidden rounded-md transition-all duration-300 ease-[cubic-bezier(0.95,0.05,0.795,0.035)] ${
                isHoverMenu ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="flex mx-[-20px]">
                <div className="w-[calc(calc(100%_/_4)_-_40px_)] mx-[20px] pr-10">
                  <div className="w-full max-w-[250px] mb-2">
                    <img
                      src="https://cdn.shopify.com/s/files/1/1636/8779/articles/blog4_345x.jpg"
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                  <div className="text-sm">
                    Lorem ipsum dolor sit amet, quod fabellas hendrerit per eu,
                    mea populo epicuri et, ea possim numquam mea.
                  </div>
                </div>

                <div className="w-[calc(calc(100%_/_4)_-_40px_)] mx-[20px]">
                  <h3 className="text-lg uppercase mb-5 font-semibold">
                    LAPTOP
                  </h3>
                  <div className="text-[15px] flex flex-col gap-y-[10px] text-main-500">
                    {data?.categories
                      .filter((category) => category.name !== "uncategorized")
                      .map((category) => (
                        <Link
                          key={category._id}
                          to={`/category/${category.slug}`}
                        >
                          <span className="hover:text-main-200">
                            {category.name}
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>

                <div className="w-[calc(calc(100%_/_4)_-_40px_)] mx-[20px]">
                  <h3 className="text-lg uppercase mb-5 font-semibold">
                    Trang
                  </h3>
                  <div className="text-[15px] flex flex-col gap-y-[10px] text-main-500">
                    <span>Giới thiệu</span>
                    <span>Dịch vụ</span>
                    <span>Hỏi đáp</span>
                    <span>Cửa hàng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-main-300 text-sm cursor-pointer">
            <Link to="#">
              <div className="flex gap-x-[5px] items-center uppercase">
                <span>Blog</span>
                <AiOutlineCaretDown size={10} />
              </div>
            </Link>
          </div>

          <div className="uppercase text-main-300 text-sm flex gap-x-[5px] items-center cursor-pointer">
            <span>Liên hệ</span>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-white outline-none py-2 px-[10px] border border-white focus:border-white placeholder:text-sm text-[#1c1d1d] w-[250px] focus:ring-0 focus:border-transparent"
              name="searchInput"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
