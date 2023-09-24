import { useState } from "react";
import { IProduct } from "../../../interfaces/product.interface";
import ProductItem from "../ProductItem/ProductItem";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

interface NewArrivalsProps {
  products: IProduct[] | undefined;
  isFetching: boolean;
}

const NewArrivals = (props: NewArrivalsProps) => {
  const { products, isFetching } = props;

  const acerProducts = products?.filter(
    (product) => product.brand?.toLowerCase() === "acer"
  );
  const asusProducts = products?.filter(
    (product) => product.brand?.toLowerCase() === "asus"
  );
  const msiProducts = products?.filter(
    (product) => product.brand?.toLowerCase() === "msi"
  );

  const [isAcer, setIsAcer] = useState<boolean>(true);
  const [isAsus, setIsAsus] = useState<boolean>(false);
  const [isMsi, setMsi] = useState<boolean>(false);
  const { currentWidth } = useSelector((state: RootState) => state.app);

  let numItemsToShow = 3;

  if (currentWidth <= 768 && currentWidth > 640) numItemsToShow = 2;
  else if (currentWidth <= 640) numItemsToShow = 1;

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
        {isFetching &&
          [...Array(3)].map((_, index) => (
            <div
              key={index}
              role="status"
              className="flex-1 mx-[10px] p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              <div className="flex items-center mt-4 space-x-3">
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
                  <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ))}

        {isAcer &&
          acerProducts
            ?.slice(0, numItemsToShow)
            .map((product: IProduct) => (
              <ProductItem
                key={product._id}
                product={product}
                isNewArrivals={true}
              />
            ))}

        {isAsus &&
          asusProducts
            ?.slice(0, numItemsToShow)
            .map((product: IProduct) => (
              <ProductItem
                key={product._id}
                product={product}
                isNewArrivals={true}
              />
            ))}

        {isMsi &&
          msiProducts
            ?.slice(0, numItemsToShow)
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
