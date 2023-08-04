import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {};

const Brands = (props: Props) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="mb-5">
      <Slider {...settings}>
        <div className="pr-10">
          <img src="https://hanoicomputercdn.com/media/brand/acer.png" alt="" />
        </div>

        <div className="pr-10">
          <img src="https://hanoicomputercdn.com/media/brand/dell.png" alt="" />
        </div>

        <div className="pr-10">
          <img
            src="https://hanoicomputercdn.com/media/brand/apple.png"
            alt=""
          />
        </div>

        <div className="pr-10">
          <img src="https://hanoicomputercdn.com/media/brand/asus.png" alt="" />
        </div>

        <div className="pr-10">
          <img
            src="https://hanoicomputercdn.com/media/brand/lenovo.png"
            alt=""
          />
        </div>

        <div className="pr-10">
          <img src="https://hanoicomputercdn.com/media/brand/lg.png" alt="" />
        </div>

        <div className="pr-10">
          <img src="https://hanoicomputercdn.com/media/brand/msi.png" alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default Brands;
