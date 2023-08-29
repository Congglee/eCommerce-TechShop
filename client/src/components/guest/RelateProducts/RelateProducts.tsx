import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IProduct } from "../../../interfaces/product.interface";
import ProductItem from "../ProductItem/ProductItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface RelateProducts {
  relateProducts: IProduct[] | undefined;
}

const RelateProducts = (props: RelateProducts) => {
  const { relateProducts } = props;
  const { currentWidth } = useSelector((state: RootState) => state.app);

  let numItemsToShow = 4;
  if (currentWidth <= 1024 && currentWidth >= 768) numItemsToShow = 3;
  else if (currentWidth < 768 && currentWidth >= 480) numItemsToShow = 2;
  else if (currentWidth < 480) numItemsToShow = 1;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: numItemsToShow,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="mb-[50px] md:mb-10 text-[#151515] border-b-2 border-main-200 uppercase text-lg font-semibold">
        KHÁCH HÀNG KHÁC CŨNG MUA:
      </div>

      <div className="w-full">
        {(relateProducts?.length as number) > numItemsToShow ? (
          <Slider {...settings}>
            {relateProducts?.map((product) => (
              <ProductItem
                key={product._id}
                isRelateProductSlide={true}
                product={product}
              />
            ))}
          </Slider>
        ) : (
          <div className="flex mx-[-10px] flex-wrap">
            {relateProducts?.map((product: IProduct) => (
              <ProductItem
                key={product._id}
                product={product}
                isRelateProduct={true}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RelateProducts;
