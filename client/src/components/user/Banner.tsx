import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {};

const UserBanner = (props: Props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Slider {...settings}>
      <div className="w-full h-full">
        <img
          className="w-full h-[400px] overflow-hidden"
          src="https://warmgun.com/wp-content/uploads/2021/10/banner-elearning.png"
          alt="Image 1"
        />
      </div>
      <div>
        <img
          className="w-full h-[400px] overflow-hidden"
          src="https://warmgun.com/wp-content/uploads/2021/10/banner-elearning.png"
          alt="Image 2"
        />
      </div>
      <div>
        <img
          className="w-full h-[400px] overflow-hidden"
          src="https://warmgun.com/wp-content/uploads/2021/10/banner-elearning.png"
          alt="Image 3"
        />
      </div>
    </Slider>
  );
};

export default UserBanner;
