import { Link, useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useGetProductsQuery,
} from "../../features/product/product.services";
import icons from "../../utils/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  ProductDetailContent,
  ProductDetailTabs,
} from "../../components/guest";
import { ICategory } from "../../interfaces/category.interface";
import RelateProducts from "../../components/guest/RelateProducts/RelateProducts";
import Breadcrumb from "../../components/guest/Breadcrumb/Breadcrumb";

const { BiChevronRight, BsArrowLeft } = icons;

type Props = {};

const ProductDetailPage = (props: Props) => {
  const { slug } = useParams();
  const productSlug = useSelector(
    (state: RootState) => state.product.productSlug
  );
  const {
    data: product,
    refetch: refectProduct,
    isFetching: isFetchingProduct,
  } = useGetProductQuery(productSlug ? productSlug : (slug as string));
  const { data: products } = useGetProductsQuery({});

  const relateProducts = products?.products.filter(
    (productItem) =>
      productItem._id !== product?.productData._id &&
      (productItem.categoryId as ICategory)?._id ===
        (product?.productData.categoryId as ICategory)?._id
  );

  return (
    <>
      <div className="bg-[#f7f7f7] py-[15px] mb-5">
        <div className="max-w-[1220px] mx-auto px-5">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              {product?.productData.name}
            </div>
            <Breadcrumb product={product?.productData} />
          </div>
        </div>
      </div>

      <div className="max-w-[1220px] mx-auto px-5">
        <div className="flex gap-x-[45px] mb-5 md:flex-col">
          {isFetchingProduct && (
            <div
              role="status"
              className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center w-full"
            >
              <div className="flex items-center justify-center w-full h-80 bg-gray-300 rounded sm:w-2/5 dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div className="w-3/5">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {!isFetchingProduct && (
            <ProductDetailContent product={product?.productData} slug={slug} />
          )}
        </div>

        <div className="flex items-center justify-center uppercase text-sm gap-x-1 hover:text-main-200 mb-[30px]">
          <div>
            <Link to="/products">
              <BsArrowLeft size={14} />
            </Link>
          </div>

          <Link to="/products">
            <span>QUAY LẠI CỬA HÀNG</span>
          </Link>
        </div>

        <ProductDetailTabs
          product={product?.productData}
          refetchProduct={refectProduct}
        />

        <div className="mb-[109px] md:mb-20">
          <RelateProducts relateProducts={relateProducts} />
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
