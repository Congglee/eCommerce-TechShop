import React from "react";
import { IProduct } from "../../@types/product.interface";
import Slider from "react-slick";
import { UserItem } from ".";

type Props = {
  type: string;
  products: IProduct[] | undefined;
};

const UserNewArrival = ({ type, products }: Props) => {
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
      <h2 className="text-[20px] py-[15px] border border-x-0 border-t-0 border-b-2 border-[#EE3131]">
        New Arrivals
      </h2>
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

export default UserNewArrival;
