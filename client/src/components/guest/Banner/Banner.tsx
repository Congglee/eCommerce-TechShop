import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
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
          src="https://res.cloudinary.com/di3eto0bg/image/upload/v1695208002/ecommerce-techshop/banner_1.jpg"
          alt=""
          className="w-full h-[461px] md:h-[300px] overflow-hidden"
        />
      </div>

      <div className="w-full h-full">
        <img
          src="https://res.cloudinary.com/di3eto0bg/image/upload/v1695208096/ecommerce-techshop/banner_2.jpg"
          alt=""
          className="w-full h-[461px] md:h-[300px] overflow-hidden"
        />
      </div>

      <div className="w-full h-full">
        <img
          src="https://res.cloudinary.com/di3eto0bg/image/upload/v1695208248/ecommerce-techshop/banner_3.jpg"
          alt=""
          className="w-full h-[461px] md:h-[300px] overflow-hidden"
        />
      </div>
    </Slider>
  );
};

export default Banner;
