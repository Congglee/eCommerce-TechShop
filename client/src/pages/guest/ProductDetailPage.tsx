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

const { BiChevronRight, BsArrowLeft } = icons;

type Props = {};

const ProductDetailPage = (props: Props) => {
  const { slug } = useParams();
  const productSlug = useSelector(
    (state: RootState) => state.product.productSlug
  );
  const { data: product } = useGetProductQuery(
    productSlug ? productSlug : (slug as string)
  );
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
        <div className="px-[170px]">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              {product?.productData.name}
            </div>
            <div className="flex items-center text-sm text-[#1c1d1d]">
              <span>Trang chủ</span>
              <BiChevronRight size={18} />
              <span>{product?.productData.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1220px] mx-auto px-5">
        <div className="flex gap-x-[45px] mb-5">
          <ProductDetailContent product={product?.productData} />
        </div>

        <div className="flex items-center justify-center uppercase text-sm gap-x-1 hover:text-main-200 mb-[30px]">
          <div>
            <Link to="/products">
              <BsArrowLeft size={14} />
            </Link>
          </div>

          <Link to="/products">
            <span>BACK TO LAPTOP</span>
          </Link>
        </div>

        <ProductDetailTabs product={product?.productData} />

        <div className="mb-[109px]">
          <RelateProducts relateProducts={relateProducts} />
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;