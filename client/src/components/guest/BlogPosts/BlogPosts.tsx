import React from "react";
import icons from "../../../utils/icons";
import Slider from "react-slick";
import { newsItems } from "../../../utils/collections";

const { FaRegComment, FaCalendarAlt } = icons;

type Props = {};

const BlogPosts = (props: Props) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-[60px]">
      <div className="mb-5 text-[#151515] border-b-2 border-main-200 pb-[15px] uppercase text-xl font-semibold">
        Tin tức
      </div>

      <div className="mx-[-10px]">
        <Slider {...settings}>
          {newsItems.map((news) => (
            <div className="mx-[10px]" key={news.id}>
              <div className="mb-5 w-[380px] h-[260px]">
                <img src={news.image} alt="" className="w-full h-full" />
              </div>

              <div className="text-center px-[15px]">
                <h3 className="text-main-800 uppercase font-semibold text-base mb-[15px]">
                  {news.title}
                </h3>
                <div className="flex items-center justify-center gap-x-4 mb-[10px]">
                  <div className="flex items-center gap-x-2 text-gray-500 text-[13px]">
                    <FaCalendarAlt size={15} />
                    <span>{news.date}</span>
                  </div>

                  <div className="flex items-center gap-x-2 text-gray-500 text-[13px]">
                    <FaRegComment size={15} />
                    <span>{news.comments} bình luận</span>
                  </div>
                </div>

                <div className="text-[13px] leading-6 text-main-500">
                  {news.content}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BlogPosts;
