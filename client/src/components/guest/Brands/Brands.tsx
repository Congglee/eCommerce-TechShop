import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Brands = () => {
  const { currentWidth } = useSelector((state: RootState) => state.app);

  let numItemsToShow = 5;
  if (currentWidth <= 768) numItemsToShow = 3;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: numItemsToShow,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="mb-5">
      <Slider {...settings}>
        <div className="pr-10">
          <img
            src="https://res.cloudinary.com/di3eto0bg/image/upload/v1695210656/ecommerce-techshop/acer_nidkpe.png"
            alt=""
          />
        </div>

        <div className="pr-10">
          <img
            src="https://res.cloudinary.com/di3eto0bg/image/upload/v1695210664/ecommerce-techshop/dell_bgp8qp.png"
            alt=""
          />
        </div>

        <div className="pr-10">
          <img
            src="https://res.cloudinary.com/di3eto0bg/image/upload/v1695210670/ecommerce-techshop/apple_bkhtxu.png"
            alt=""
          />
        </div>

        <div className="pr-10">
          <img
            src="https://res.cloudinary.com/di3eto0bg/image/upload/v1695210677/ecommerce-techshop/asus_jvf4cv.png"
            alt=""
          />
        </div>

        <div className="pr-10">
          <img
            src="https://res.cloudinary.com/di3eto0bg/image/upload/v1695210685/ecommerce-techshop/lenovo_bh0abh.png"
            alt=""
          />
        </div>

        <div className="pr-10">
          <img
            src="https://res.cloudinary.com/di3eto0bg/image/upload/v1695210691/ecommerce-techshop/lg_kapcrm.png"
            alt=""
          />
        </div>

        <div>
          <img
            src="https://res.cloudinary.com/di3eto0bg/image/upload/v1695210698/ecommerce-techshop/msi_un5wxp.png"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
};

export default Brands;
