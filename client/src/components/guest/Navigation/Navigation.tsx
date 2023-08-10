import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import icons from "../../../utils/icons";

const { AiOutlineCaretDown } = icons;

type Props = {};

const Navigation = (props: Props) => {
  const [isHoverMenu, setIsHoverMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { category } = useParams();

  const sort = searchParams.get("sort")!;
  const price_filter_gte = searchParams.get("price_filter_gte")!;
  const price_filter_lte = searchParams.get("price_filter_lte")!;
  const page = searchParams.get("page")!;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (e.target as HTMLFormElement).searchInput.value;
    const searchUrl = `${
      category ? `category/${category}` : "products/"
    }?name=${inputValue}${
      sort || price_filter_gte || price_filter_lte || page
        ? `&sort=${sort === null ? "" : sort}&price_filter_gte=${
            price_filter_gte === null ? "" : price_filter_gte
          }&price_filter_lte=${
            price_filter_lte === null ? "" : price_filter_lte
          }&page=${page === null ? "" : page}`
        : ""
    }`;

    navigate(searchUrl);
  };

  return (
    <div>
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
              className={`absolute left-0 right-0 top-12 z-20 bg-white shadow-[0px_2px_20px_#00000017] w-full px-10 py-[30px] overflow-hidden rounded-md transition-all duration-300 easse-[cubic-bezier(0.95,0.05,0.795,0.035)] ${
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
                    <span>Asus</span>
                    <span>Dell</span>
                    <span>LG</span>
                    <span>Macbook</span>
                    <span>Acer</span>
                    <span>HP</span>
                    <span>Lenovo</span>
                  </div>
                </div>

                <div className="w-[calc(calc(100%_/_4)_-_40px_)] mx-[20px]">
                  <h3 className="text-lg uppercase mb-5 font-semibold">
                    Pages
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
              placeholder="Tìm kiếm ..."
              className="bg-white outline-none py-2 px-[10px] border border-white focus:border-white placeholder:text-sm text-[#1c1d1d] w-[250px]"
              name="searchInput"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
