import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {};

const Banner = (props: Props) => {
  const settings = {
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
          src="https://img.freepik.com/premium-psd/3d-objects-laptop-black-friday-red-background_23-2148660042.jpg"
          alt=""
          className="w-full h-[461px] overflow-hidden"
        />
      </div>

      <div className="w-full h-full">
        <img
          src="https://nhatkhanhtech.com/wp-content/uploads/2019/10/Banner-gaming_laptops.jpg"
          alt=""
          className="w-full h-[461px] overflow-hidden"
        />
      </div>

      <div className="w-full h-full">
        <img
          src="https://cdn.tgdd.vn/Files/2021/12/20/1405435/laptopgamingdohoah22_1280x720-800-resize.jpg"
          alt=""
          className="w-full h-[461px] overflow-hidden"
        />
      </div>
    </Slider>
  );
};

export default Banner;
