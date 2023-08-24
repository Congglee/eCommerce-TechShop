import React, { useState } from "react";
import { IProduct } from "../../../interfaces/product.interface";
import ProductItem from "../ProductItem/ProductItem";
import { ICategory } from "../../../interfaces/category.interface";

interface NewArrivalsProps {
  products: IProduct[] | undefined;
}

const NewArrivals = (props: NewArrivalsProps) => {
  const { products } = props;
  const acerProducts = products?.filter(
    (product) => (product.categoryId as ICategory).slug === "acer"
  );
  const asusProducts = products?.filter(
    (product) => (product.categoryId as ICategory).slug === "asus"
  );
  const msiProducts = products?.filter(
    (product) => (product.categoryId as ICategory).slug === "msi"
  );

  const [isAcer, setIsAcer] = useState<boolean>(true);
  const [isAsus, setIsAsus] = useState<boolean>(false);
  const [isMsi, setMsi] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center justify-between border-b-2 border-main-200 mb-5 py-[14px]">
        <div className="text-[#151515] font-semibold text-xl uppercase">
          Sản phẩm mới
        </div>
        <div className="flex items-baseline gap-x-5 text-[15px]">
          <button
            className={`text-gray-500 hover:text-main-200 transition-all duration-200 ease-linear ${
              isAcer && "text-main-200"
            }`}
            onClick={() => {
              setIsAcer(true);
              setIsAsus(false);
              setMsi(false);
            }}
          >
            Acer
          </button>
          <button
            className={`text-gray-500 hover:text-main-200 transition-all duration-200 ease-linear border-l border-main-700 pl-5 ${
              isAsus && "text-main-200"
            }`}
            onClick={() => {
              setIsAcer(false);
              setIsAsus(true);
              setMsi(false);
            }}
          >
            Asus
          </button>
          <button
            className={`text-gray-500 hover:text-main-200 transition-all duration-200 ease-linear border-l border-main-700 pl-5 ${
              isMsi && "text-main-200"
            }`}
            onClick={() => {
              setIsAcer(false);
              setIsAsus(false);
              setMsi(true);
            }}
          >
            MSI
          </button>
        </div>
      </div>

      <div className="flex mx-[-10px] gap-y-5 flex-wrap mb-10">
        {isAcer &&
          acerProducts
            ?.slice(0, 3)
            .map((product: IProduct) => (
              <ProductItem
                key={product._id}
                product={product}
                isNewArrivals={true}
              />
            ))}

        {isAsus &&
          asusProducts
            ?.slice(0, 3)
            .map((product: IProduct) => (
              <ProductItem
                key={product._id}
                product={product}
                isNewArrivals={true}
              />
            ))}

        {isMsi &&
          msiProducts
            ?.slice(0, 3)
            .map((product: IProduct) => (
              <ProductItem
                key={product._id}
                product={product}
                isNewArrivals={true}
              />
            ))}
      </div>
    </div>
  );
};

export default NewArrivals;
