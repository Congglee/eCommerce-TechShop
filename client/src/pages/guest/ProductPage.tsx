import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import icons from "../../utils/icons";
import { useGetProductsQuery } from "../../features/product/product.services";
import { IProduct } from "../../interfaces/product.interface";
import {
  CategorySideMenu,
  Pagination,
  ProductItem,
} from "../../components/guest";
import { useQueryString } from "../../hooks/useQueryString";

const { BiChevronRight, AiOutlineUnorderedList } = icons;

type Props = {};

const ProductPage = (props: Props) => {
  const [seletedSort, setSeletedSort] = useState<string>("");
  const [filterPriceGte, setFilterPriceGte] = useState<string>("");
  const [filterPriceLte, setFilterPriceLte] = useState<string>("");
  const queryString: {
    name?: string;
    sort?: string;
    page?: string;
    price_filter_gte?: string;
    price_filter_lte?: string;
  } = useQueryString();
  const { name, sort, price_filter_gte, price_filter_lte, page } = queryString;
  const { category } = useParams();

  const { data } = useGetProductsQuery({
    name: name || "",
    sort: sort || "",
    filterPriceGte: price_filter_gte || "",
    filterPriceLte: price_filter_lte || "",
    category: category,
    page: page || 1,
    limit: import.meta.env.VITE_APP_LIMIT_PRODUCT_PER_PAGE || 6,
  });
  const navigate = useNavigate();

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSeletedSort(value);
    const sortUrl = `?sort=${value}${
      name || price_filter_gte || price_filter_lte || page
        ? `&name=${name === undefined ? "" : name}&price_filter_gte=${
            price_filter_gte === undefined ? "" : price_filter_gte
          }&price_filter_lte=${
            price_filter_lte === undefined ? "" : price_filter_lte
          }&page=${page === undefined ? "" : page}`
        : ""
    }`;

    navigate(sortUrl);
  };

  const handleChangeFilterPriceGte = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFilterPriceGte(value);

    const filterPriceGteUrl = `?price_filter_gte=${value}${
      name || sort || price_filter_lte || page
        ? `&name=${name === undefined ? "" : name}&sort=${
            sort === undefined ? "" : sort
          }&price_filter_lte=${
            price_filter_lte === undefined ? "" : price_filter_lte
          }&page=${page === undefined ? "" : page}`
        : ""
    }`;
    navigate(filterPriceGteUrl);
  };

  const handleChangeFilterPriceLte = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFilterPriceLte(value);
    const filterPriceLteUrl = `?price_filter_lte=${value}${
      name || sort || price_filter_gte || page
        ? `&name=${name === undefined ? "" : name}&sort=${
            sort === undefined ? "" : sort
          }&price_filter_gte=${
            price_filter_gte === undefined ? "" : price_filter_gte
          }&page=${page === undefined ? "" : page}`
        : ""
    }`;
    navigate(filterPriceLteUrl);
  };

  return (
    <>
      <div className="bg-[#f7f7f7] py-[15px] mb-[35px]">
        <div className="px-[170px]">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              SẢN PHẨM
            </div>
            <div className="flex items-center text-sm text-[#1c1d1d]">
              <span>Trang chủ</span>
              <BiChevronRight size={18} />
              <span>Sản phẩm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="px-[170px] flex gap-x-[22px]">
          <div className="w-[25%] flex-shrink-0 flex flex-col gap-y-5">
            <div>
              <div className="border border-solid border-[#ccc]">
                <CategorySideMenu />
              </div>
            </div>

            <div>
              <div className="flex items-center py-[10px] gap-x-2 px-5 bg-main-200 text-white text-base">
                <AiOutlineUnorderedList size={16} />
                <span className="uppercase font-semibold">MUA SẮM THEO</span>
              </div>

              <div className="border border-solid border-[#ccc]">
                <div className="py-[15px] px-[20px]">
                  <div className="text-main-500 text-[17px] font-semibold mb-[10px]">
                    Sắp xếp theo
                  </div>
                  <select
                    name=""
                    id=""
                    className="border border-solid border-[rgba(26,27,24,.75)] pl-[15px] pr-5 w-full text-xs bg-[#f6f6f6] text-[#1c1d1d] py-[10px]"
                    onChange={handleChangeSort}
                  >
                    <option value="">Sản phẩm nổi bật</option>
                    <option value="">Bán chạy nhất</option>
                    <option value="name">Theo bảng chữ cái, A-Z</option>
                    <option value="-name">Theo bảng chữ cái, Z-A</option>
                    <option value="price">Giá tăng dần</option>
                    <option value="-price">Giá giảm dần</option>
                  </select>
                </div>

                <div className="py-[15px] px-[20px]">
                  <div className="text-main-500 text-[17px] font-semibold mb-[10px]">
                    Giá
                  </div>

                  <div className="border border-solid border-[rgba(26,27,24,0.2)] w-full">
                    <div className="border-b border-solid border-[rgba(26,27,24,0.2)]">
                      <div className="px-[10px] py-[5px] text-main-500 text-sm">
                        Giá cao nhất là 46.893.977,41 VND. Giá trị đầu vào mặc
                        định là VND<span className="underline">Reset</span>
                      </div>
                    </div>

                    <form className="px-4 py-6">
                      <div className="mb-[10px] flex items-center gap-x-[6px]">
                        <label htmlFor="" className="text-main-500 text-xs">
                          VND
                        </label>
                        <input
                          type="number"
                          placeholder="Từ"
                          className="w-full bg-[#f6f6f6] pl-[10px] border-none"
                          id="gte-input"
                          value={filterPriceGte}
                          onChange={handleChangeFilterPriceGte}
                        />
                      </div>

                      <div className="mb-[10px] flex items-center gap-x-[6px]">
                        <label htmlFor="" className="text-main-500 text-xs">
                          VND
                        </label>
                        <input
                          type="number"
                          placeholder="Đến"
                          className="w-full bg-[#f6f6f6] pl-[10px] border-none"
                          id="lte-input"
                          value={filterPriceLte}
                          onChange={handleChangeFilterPriceLte}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full">
              <img
                src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_300x.jpg?v=1613166661"
                alt=""
              />
            </div>
          </div>

          <div className="w-[75%] flex-1">
            <div className="flex mx-[-11px] gap-y-5 flex-wrap mb-10">
              {data?.products.map((product: IProduct) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>

            <Pagination
              name={name}
              sort={sort}
              price_filter_gte={price_filter_gte}
              price_filter_lte={price_filter_lte}
              totalCount={data?.totalProduct as number}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
