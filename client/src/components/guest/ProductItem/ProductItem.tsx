import { useState } from "react";
import icons from "../../../utils/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../../interfaces/product.interface";
import { formatCurrency } from "../../../utils/fn";
import { ProductDetailContent, StarRating } from "..";
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";
import { showModal } from "../../../features/app.slice";

const { LiaBarsSolid, FaEye, BsFillHeartFill, PiShoppingCartFill } = icons;

interface ProductItemProps {
  product?: IProduct;
  isHoverHomePage?: boolean;
  isNewArrivals?: boolean;
  isRelateProduct?: boolean;
  isRelateProductSlide?: boolean;
  isProductsPage?: boolean;
}

const ProductItem = (props: ProductItemProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isHoverProductHome, setIsHoverProductHome] = useState<boolean>(false);
  const {
    product,
    isHoverHomePage,
    isNewArrivals,
    isRelateProduct,
    isRelateProductSlide,
    isProductsPage,
  } = props;

  const hasHtmlTags = /<[^>]*>/g.test(product?.description as string);
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOptions = (flag: string) => {
    if (flag === "QUICK_VIEW") {
      setIsHover(false);
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <div
              className="flex items-center justify-center gap-x-6 max-w-[80%] mx-auto w-[800px] bg-white p-5 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <ProductDetailContent
                isQuickView={true}
                product={product}
                hasHtmlTags={hasHtmlTags}
              />
            </div>
          ),
        })
      );
    }

    if (flag === "WISHLIST") {
      console.log("wishlist");
    }
  };

  return (
    <div
      className={`w-[calc(calc(100%_/_3)_-_20px)] md:w-[calc(calc(100%_/_2)_-_20px)] mx-[10px] border border-[#ebebeb] p-[15px] cursor-pointer flex flex-col relative
      ${isRelateProductSlide && "md:w-auto w-auto xs:w-auto"}
      ${
        isRelateProduct &&
        "w-[calc(calc(100%_/_4)_-_20px)] mx-[10px] sm:w-[calc(calc(100%_/_2)_-_20px)]"
      }
      ${isNewArrivals || isHoverHomePage ? "sm:w-full" : ""}
      ${
        isProductsPage &&
        "md:w-[calc(calc(100%_/_3)_-_20px)] sm:w-[calc(calc(100%_/_2)_-_20px)] mx-[10px]"
      }
      `}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`mb-5 w-full flex-shrink-0 relative ${
          isHoverHomePage && "relative"
        }`}
        onMouseEnter={() => setIsHoverProductHome(true)}
        onMouseLeave={() => setIsHoverProductHome(false)}
      >
        <Link
          to={`${
            category
              ? `/category/${category}/${product?.slug}`
              : `/products/${product?.slug}`
          }`}
        >
          <img src={product?.thumb} alt="" className={`w-full h-full`} />
        </Link>

        {isHoverHomePage && isHoverProductHome && (
          <div className="absolute left-0 right-0 bottom-[-40px] w-full flex items-center justify-center gap-x-[5px] animate-show-up">
            <div className="w-10 h-10 border border-[#c5cfd6] bg-white text-[#2a2a2a] rounded-full flex items-center justify-center cursor-pointer hover:border-transparent hover:bg-[#2a2a2a] hover:text-white transition-all duration-500 ease-out mx-[5px]">
              <BsFillHeartFill size={14} />
            </div>

            <div className="w-10 h-10 border border-[#c5cfd6] bg-white text-[#2a2a2a] rounded-full flex items-center justify-center cursor-pointer hover:border-transparent hover:bg-[#2a2a2a] hover:text-white transition-all duration-500 ease-out mx-[5px]">
              <PiShoppingCartFill size={14} />
            </div>

            <div
              className="w-10 h-10 border border-[#c5cfd6] bg-white text-[#2a2a2a] rounded-full flex items-center justify-center cursor-pointer hover:border-transparent hover:bg-[#2a2a2a] hover:text-white transition-all duration-500 ease-out mx-[5px]"
              onClick={() => handleClickOptions("QUICK_VIEW")}
            >
              <FaEye size={14} />
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-[6px] text-base text-main-500 line-clamp-2">
          <Link
            to={`${
              category
                ? `/category/${category}/${product?.slug}`
                : `/products/${product?.slug}`
            }`}
          >
            {product?.name}
          </Link>
        </div>

        <div className="flex items-center text-[#f1b400] gap-x-[2px] mb-[10px]">
          <StarRating
            totalRatings={product?.totalRatings as number}
            size={14}
          />
        </div>

        <div className="text-base">{formatCurrency(product?.price)} VND</div>
      </div>

      <div
        className={`absolute w-full h-full top-0 left-0 py-[10px] bg-white z-10 transition-all duration-400 ease-out ${
          !isHoverHomePage && isHover
            ? "opacity-1 visible"
            : "opacity-0 invisible"
        }`}
      >
        <div className="w-full flex items-center justify-between pl-4 pr-1 pb-[10px] mb-[10px] border-b border-[#ebebeb]">
          <div
            className={`mb-[6px] text-base text-[#2b3743] leading-[18px] hover:text-main-200 ${
              isNewArrivals ? "line-clamp-3" : "line-clamp-4"
            }`}
          >
            <Link
              to={`${
                category
                  ? `/category/${category}/${product?.slug}`
                  : `/products/${product?.slug}`
              }`}
            >
              {product?.name}
            </Link>
          </div>

          <div className="text-base text-right leading-[18px]">
            {formatCurrency(product?.price)} VND
          </div>
        </div>

        <div className="py-[10px] px-5 w-full">
          <Link
            to={`${
              category
                ? `/category/${category}/${product?.slug}`
                : `/products/${product?.slug}`
            }`}
          >
            {hasHtmlTags ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description as string),
                }}
                className="text-[13px] text-main-500 line-clamp-[10] mb-[15px]"
              ></div>
            ) : (
              <ul className="text-[13px] leading-[18px] text-main-500 mb-[15px] line-clamp-[11]">
                {product?.description?.split("\n").map((item, index) => (
                  <li
                    className="list-disc list-inside list-image-[initial]"
                    key={index}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </Link>

          <div className="flex items-center gap-x-2">
            <div
              className="w-10 h-10 border border-[#c5cfd6] bg-white text-[#2a2a2a] rounded-full flex items-center justify-center cursor-pointer hover:border-transparent hover:bg-[#2a2a2a] hover:text-white transition-all duration-500 ease-out"
              onClick={() => navigate(`/products/${product?.slug}`)}
            >
              <LiaBarsSolid size={17} />
            </div>

            <div
              className="w-10 h-10 border border-[#c5cfd6] bg-white text-[#2a2a2a] rounded-full flex items-center justify-center cursor-pointer hover:border-transparent hover:bg-[#2a2a2a] hover:text-white transition-all duration-500 ease-out"
              onClick={() => handleClickOptions("QUICK_VIEW")}
            >
              <FaEye size={17} />
            </div>

            <div
              className="w-10 h-10 border border-[#c5cfd6] bg-white text-[#2a2a2a] rounded-full flex items-center justify-center cursor-pointer hover:border-transparent hover:bg-[#2a2a2a] hover:text-white transition-all duration-500 ease-out"
              onClick={() => handleClickOptions("WISHLIST")}
            >
              <BsFillHeartFill size={17} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
