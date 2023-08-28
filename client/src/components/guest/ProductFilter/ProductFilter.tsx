import React from "react";
import icons from "../../../utils/icons";
import { formatCurrency } from "../../../utils/fn";
import { IProduct } from "../../../interfaces/product.interface";

const { AiOutlineUnorderedList } = icons;

interface productFilterProps {
  handleChangeSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  highestPriceProduct?: IProduct;
  filterPriceGte: string;
  filterPriceLte: string;
  handleChangeFilterPriceGte: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeFilterPriceLte: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductFilter = (props: productFilterProps) => {
  const {
    handleChangeSort,
    highestPriceProduct,
    filterPriceGte,
    filterPriceLte,
    handleChangeFilterPriceGte,
    handleChangeFilterPriceLte,
  } = props;

  return (
    <>
      <div>
        <div className="flex items-center py-[10px] gap-x-2 px-5 bg-main-200 text-white text-base">
          <AiOutlineUnorderedList size={20} />
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
              <option value="">Bán chạy nhất</option>
              <option value="-totalRatings">Sản phẩm nổi bật</option>
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
                  Giá cao nhất là {formatCurrency(highestPriceProduct?.price)}{" "}
                  VND. Giá trị đầu vào mặc định là VND
                  <span className="underline">Reset</span>
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
    </>
  );
};

export default ProductFilter;
