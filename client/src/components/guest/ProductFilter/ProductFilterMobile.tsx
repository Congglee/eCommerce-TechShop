import React, { useRef } from "react";
import icons from "../../../utils/icons";
import { formatCurrency } from "../../../utils/fn";
import { IProduct } from "../../../interfaces/product.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { toggleShowProductFilter } from "../../../features/product/product.slice";
import { IBrand } from "../../../interfaces/brand.interface";
import useOutsideClickHandler from "../../../hooks/useOutsiteClickHandle";

const { AiOutlineClose } = icons;

interface productFilterMobileProps {
  productLength?: number;
  totalProduct?: number;
  handleChangeSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  highestPriceProduct?: IProduct;
  handleChangeFilterPriceGte: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeFilterPriceLte: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitFilter: (e: React.FormEvent<HTMLFormElement>) => void;
  brandsData?: IBrand[];
  handleChangeFilterBrand: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductFilterMobile = (props: productFilterMobileProps) => {
  const {
    productLength,
    totalProduct,
    highestPriceProduct,
    handleChangeSort,

    handleChangeFilterPriceGte,
    handleChangeFilterPriceLte,
    handleSubmitFilter,
    brandsData,
    handleChangeFilterBrand,
  } = props;

  const {
    showProductFilterMobile,
    brandFilter,
    filterPriceGte,
    filterPriceLte,
  } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const productFilterMobileRef = useRef<HTMLDivElement | null>(null);

  useOutsideClickHandler(productFilterMobileRef, () => {
    dispatch(toggleShowProductFilter(false));
  });

  return (
    <div
      className={`769:hidden fixed top-0 bottom-0 right-0 bg-white px-[10px] w-[68%] overflow-y-auto z-[50] transition-all duration-200 ease-linear ${
        showProductFilterMobile
          ? "block animate-show-right-up"
          : "animate-show-right-down"
      }`}
      ref={productFilterMobileRef}
    >
      <div className="flex items-center justify-center py-[10px] mb-1">
        <div className="w-full flex flex-col items-center justify-center">
          <span className="text-main-500 text-sm font-semibold uppercase">
            Lọc và sắp xếp
          </span>
          <span className="text-[#1a1b18b3] text-[13px]">
            Hiển thị {productLength} trên {totalProduct} sản phẩm
          </span>
        </div>

        <button
          className="ml-auto"
          onClick={() => dispatch(toggleShowProductFilter(false))}
        >
          <AiOutlineClose size={28} />
        </button>
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

            <form className="px-4 py-6" onSubmit={handleSubmitFilter}>
              <div className="mb-[10px] flex items-center gap-x-[6px]">
                <label htmlFor="" className="text-main-500 text-xs">
                  VND
                </label>
                <input
                  type="text"
                  placeholder="Từ"
                  className="w-full bg-[#f6f6f6] pl-[10px] border-none"
                  id="gte-input"
                  value={filterPriceGte === "0,00" ? "0" : filterPriceGte}
                  onChange={handleChangeFilterPriceGte}
                />
              </div>

              <div className="mb-[10px] flex items-center gap-x-[6px]">
                <label htmlFor="" className="text-main-500 text-xs">
                  VND
                </label>
                <input
                  type="text"
                  placeholder="Đến"
                  className="w-full bg-[#f6f6f6] pl-[10px] border-none"
                  id="lte-input"
                  value={filterPriceLte === "0,00" ? "0" : filterPriceLte}
                  onChange={handleChangeFilterPriceLte}
                />
              </div>

              <button
                type="submit"
                className="mt-1 bg-main-200 uppercase h-10 px-[15px] text-white text-sm font-light hover:bg-[#333] transition-all duration-150 ease-in-out hover:opacity-90 w-full"
              >
                <span>Áp dụng</span>
              </button>
            </form>
          </div>
        </div>

        <div className="py-[15px] px-[20px]">
          <div className="text-main-500 text-[17px] font-semibold mb-[10px]">
            Thương hiệu
          </div>

          <div className="border border-solid border-[rgba(26,27,24,0.2)] w-full max-h-[300px] overflow-y-scroll">
            <div className="border-b border-solid border-[rgba(26,27,24,0.2)]">
              <div className="px-[10px] py-[5px] text-main-500 text-sm flex justify-between items-center">
                <span>{brandFilter.length} đã chọn</span>
                <span className="underline">Reset</span>
              </div>
            </div>

            <div className="px-4 py-3">
              {brandsData?.map((brandItem) => (
                <div className="flex items-center mb-4" key={brandItem._id}>
                  <input
                    onChange={handleChangeFilterBrand}
                    id={brandItem._id}
                    type="checkbox"
                    value={brandItem.title}
                    checked={brandFilter.includes(brandItem.title)}
                    className="w-4 h-4 text-main-200 bg-white border-main-500 rounded focus:ring-main-200 focus:ring-1 cursor-pointer"
                  />
                  <label
                    htmlFor={brandItem._id}
                    className="ml-2 text-main-500 text-sm cursor-pointer"
                  >
                    {brandItem.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterMobile;
