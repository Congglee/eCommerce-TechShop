import {
  Banner,
  CategorySideMenu,
  DailyDealProduct,
  HomeProductTabs,
  FeaturedProducts,
  NewArrivals,
  HotCollections,
  BlogPosts,
  Brands,
} from "../../components/guest";
import { useGetProductsQuery } from "../../features/product/product.services";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const { data, isFetching } = useGetProductsQuery({});
  const dailyDealProduct = data?.products[data?.products.length - 1];

  return (
    <div className="py-[20px] md:pt-0 md:pb-[30px]">
      <div className="max-w-[1220px] mx-auto px-5">
        <div className="flex items-stretch mb-[30px]">
          <div className="flex-shrink-0 w-1/4 sm:hidden">
            <CategorySideMenu />
          </div>

          <div className="flex-1 w-3/4 pl-5 sm:w-full sm:pl-0">
            <Banner />
          </div>
        </div>

        <div className="flex items-stretch gap-x-5 mb-[30px] md:mb-5 sm:flex-col">
          <div className="w-[25%] md:w-[30%] flex-shrink-0 sm:w-full sm:mb-1">
            {isFetching && (
              <div
                role="status"
                className="w-full p-5 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
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
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                <div className="flex items-center mt-4 space-x-3">
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2" />
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            )}

            {!isFetching && (
              <DailyDealProduct dailyDealProduct={dailyDealProduct} />
            )}
          </div>

          <div
            className="w-[75%] md:w-[70%] flex-1 sm:w-full
          "
          >
            <HomeProductTabs
              products={data?.products}
              isFetching={isFetching}
            />
          </div>
        </div>

        <FeaturedProducts products={data?.products} isFetching={isFetching} />

        <NewArrivals products={data?.products} isFetching={isFetching} />

        <HotCollections />

        <BlogPosts />

        <Brands />
      </div>
    </div>
  );
};

export default HomePage;
