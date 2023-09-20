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

const { BsArrowLeft } = icons;

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
      (productItem.category as ICategory)?._id ===
        (product?.productData.category as ICategory)?._id
  );

  const hasHtmlTags = /<[^>]*>/g.test(
    product?.productData.description as string
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
        <div className="flex gap-x-[45px] mb-5 md:flex-col gap-y-5">
          {isFetchingProduct && (
            <>
              <div className="w-[40%] md:w-full flex-shrink-0 flex flex-col gap-y-[30px]">
                <svg
                  className="w-full h-full text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>

                <div className="flex flex-wrap mx-[-5px] gap-y-[10px]">
                  {[...Array(3)].map((_, index) => (
                    <svg
                      className="w-[calc(calc(100%_/_3)_-_10px)] md:w-[calc(calc(100%_/_2)_-_10px)] mx-[5px] text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                      key={index}
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="w-[60%] md:w-full flex-1 flex sm:flex-col">
                <div className="w-[62.5%] flex-shrink-0 sm:w-full sm:mb-5">
                  <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-4/5 mb-4" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-2/5 mb-5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-3/5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/5 mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/5 mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/5 mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/5 mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/5 mb-2.5" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/5" />
                </div>

                <div className="w-[37.5%] flex-1 flex flex-col gap-y-[10px] sm:w-full ">
                  {[...Array(3)].map((_, index) => (
                    <div
                      className="p-[10px] border border-main-700 flex items-center gap-x-[10px]"
                      key={index}
                    >
                      <div className="p-[10px] bg-main-500 rounded-full flex items-center justify-center text-white">
                        <svg
                          className="w-5 h-5 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>

                      <div className="flex flex-col capitalize w-full">
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!isFetchingProduct && (
            <ProductDetailContent
              product={product?.productData}
              slug={slug}
              hasHtmlTags={hasHtmlTags}
            />
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
          hasHtmlTags={hasHtmlTags}
        />

        <div className="mb-[109px] md:mb-20">
          <RelateProducts relateProducts={relateProducts} />
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
