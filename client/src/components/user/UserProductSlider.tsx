import React, { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { RootState } from "../../store/store";
import { IProduct } from "../../@types/product.interface";
import { UserItem } from ".";

type Props = {
  type: string;
  products: IProduct[] | undefined;
};

const UserProductSlider = ({ type, products }: Props) => {
  let productsType: IProduct[] | undefined = [];
  if (type == "best_seller") {
    productsType = products?.filter((item, index) => index < 4);
  } else {
    productsType = products?.filter((item, index) => index >= 4);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <Slider {...settings}>
        {productsType?.map((item, index) => (
          <a href={`products/id/${item._id}`} key={index}>
            <UserItem item={item} index={index} />
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default UserProductSlider;
