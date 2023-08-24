import React, { useState } from "react";
import { IProduct } from "../../../interfaces/product.interface";
import ProductItem from "../ProductItem/ProductItem";
import banner1 from "../../../assets/banner1-home2.png";
import banner2 from "../../../assets/banner2-home2.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface HomeProductTabs {
  products: IProduct[] | undefined;
}

const HomeProductTabs = (props: HomeProductTabs) => {
  const { products } = props;
  const [isBestSeller, setIsBestSeller] = useState<boolean>(true);
  const [isNewArrivals, setIsNewArrivals] = useState<boolean>(false);
  const [isMackbook, setIsMackbook] = useState<boolean>(false);
  const { currentWidth } = useSelector((state: RootState) => state.app);

  let numItemsToShow = 3;

  if (currentWidth < 970 && currentWidth > 480) numItemsToShow = 2;
  else if (currentWidth <= 480) numItemsToShow = 1;

  return (
    <>
      <div className="flex gap-x-5 mb-5 border-b-[2px] border-main-200 pb-[15px]">
        <button
          className={`text-[#151515] text-xl uppercase font-semibold transition-all duration-200 ease-linear ${
            isBestSeller ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => {
            setIsBestSeller(true);
            setIsMackbook(false);
            setIsNewArrivals(false);
          }}
        >
          <span>Bán chạy nhất</span>
        </button>

        <button
          className={`text-[#151515] text-xl uppercase font-semibold border-l border-main-700 pl-5 transition-all duration-200 ease-linear ${
            isNewArrivals ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => {
            setIsBestSeller(false);
            setIsMackbook(false);
            setIsNewArrivals(true);
          }}
        >
          <span>Hàng mới</span>
        </button>

        <button
          className={`text-[#151515] text-xl uppercase font-semibold border-l border-main-700 pl-5 transition-all duration-200 ease-linear ${
            isMackbook ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => {
            setIsBestSeller(false);
            setIsMackbook(true);
            setIsNewArrivals(false);
          }}
        >
          <span>Macbook</span>
        </button>
      </div>

      <div className="flex mx-[-11px] gap-y-[18px] mb-5">
        {isBestSeller &&
          products
            ?.slice(0, numItemsToShow)
            .map((product: IProduct) => (
              <ProductItem
                key={product._id}
                product={product}
                isHoverHomePage={true}
              />
            ))}

        {isNewArrivals &&
          products
            ?.slice()
            .reverse()
            .slice(0, numItemsToShow)
            .map((product: IProduct) => (
              <ProductItem
                key={product._id}
                product={product}
                isHoverHomePage={true}
              />
            ))}

        {isMackbook &&
          products
            ?.filter((product) => product.name.toLowerCase().includes("apple"))
            .slice(0, numItemsToShow)
            .map((product: IProduct) => (
              <ProductItem
                key={product._id}
                product={product}
                isHoverHomePage={true}
              />
            ))}
      </div>

      <div className="flex items-center gap-x-5">
        <div>
          <img src={banner1} alt="" />
        </div>

        <div>
          <img src={banner2} alt="" />
        </div>
      </div>
    </>
  );
};

export default HomeProductTabs;
