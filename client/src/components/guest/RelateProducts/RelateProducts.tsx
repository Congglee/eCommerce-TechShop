import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IProduct } from "../../../interfaces/product.interface";
import ProductItem from "../ProductItem/ProductItem";

interface RelateProducts {
  relateProducts: IProduct[] | undefined;
}

const RelateProducts = (props: RelateProducts) => {
  const { relateProducts } = props;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="mb-[50px] text-[#151515] border-b-2 border-main-200 uppercase text-lg font-semibold">
        KHÁCH HÀNG KHÁC CŨNG MUA:
      </div>

      <div className="w-full">
        {(relateProducts?.length as number) > 4 ? (
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
