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
} from "../../components/user";
import { useGetProductsQuery } from "../../features/product/product.services";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {};

const HomePage = (props: Props) => {
  const { data } = useGetProductsQuery({});
  const dailyDealProduct = data?.products[data?.products.length - 1];

  return (
    <div className="py-[20px]">
      <div className="max-w-[1220px] mx-auto px-5">
        <div className="flex items-stretch gap-x-5 mb-[30px]">
          <div className="w-[25%] flex-shrink-0">
            <CategorySideMenu />
          </div>

          <div className="w-[75%] flex-1">
            <Banner />
          </div>
        </div>

        <div className="flex items-stretch gap-x-5 mb-[30px]">
          <div className="w-[25%] flex-shrink-0">
            <DailyDealProduct dailyDealProduct={dailyDealProduct} />
          </div>

          <div className="w-[75%] flex-1">
            <HomeProductTabs products={data?.products} />
          </div>
        </div>

        <FeaturedProducts products={data?.products} />

        <NewArrivals products={data?.products} />

        <HotCollections />

        <BlogPosts />

        <Brands />
      </div>
    </div>
  );
};

export default HomePage;
