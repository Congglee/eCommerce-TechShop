import React from "react";
import icons from "../../../utils/icons";

const { FaRegComment, FaCalendarAlt } = icons;

type Props = {};

const BlogPosts = (props: Props) => {
  return (
    <div className="mb-[60px]">
      <div className="mb-5 text-[#151515] border-b-2 border-main-200 pb-[15px] uppercase text-xl font-semibold">
        Tin tức
      </div>

      <div className="flex mx-[-10px]">
        <div className="w-[calc(calc(100%_/_3)_-_20px)] mx-[10px]">
          <div className="mb-5 w-[380px] h-[260px]">
            <img
              src="https://hanoicomputercdn.com/media/news/1817_cover_msi_laptop.jpg"
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="text-center px-[15px]">
            <h3 className="text-main-800 uppercase font-semibold text-base mb-[15px]">
              Loạt laptop MSI mới trang bị Raptor Lake-HX và RTX 40 Series
            </h3>
            <div className="flex items-center justify-center gap-x-4 mb-[10px]">
              <div className="flex items-center gap-x-2 text-gray-500 text-[13px]">
                <FaCalendarAlt size={15} />
                <span>December 13, 2016</span>
              </div>

              <div className="flex items-center gap-x-2 text-gray-500 text-[13px]">
                <FaRegComment size={15} />
                <span>1 comment</span>
              </div>
            </div>

            <div className="text-[13px] leading-6 text-main-500">
              Sự kiện trực tuyến “MSIology: The Leap to Singularity” giới thiệu
              các mẫu laptop mới nhất, trang bị bộ đôi vi xử lý Intel Core HX
              Series thế hệ 13 cùng đồ họa ...
            </div>
          </div>
        </div>

        <div className="w-[calc(calc(100%_/_3)_-_20px)] mx-[10px]">
          <div className="mb-5 w-[380px] h-[260px]">
            <img
              src="https://hanoicomputercdn.com/media/news/1746_cover_corei9_13900hx.jpg"
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="text-center px-[15px]">
            <h3 className="text-main-800 uppercase font-semibold text-base mb-[15px]">
              Core i9-13900HX cho laptop lộ điểm hiệu năng vượt trội với thế hệ
              tiền nhiệm
            </h3>
            <div className="flex items-center justify-center gap-x-4 mb-[10px]">
              <div className="flex items-center gap-x-2 text-gray-500 text-[13px]">
                <FaCalendarAlt size={15} />
                <span>December 13, 2016</span>
              </div>

              <div className="flex items-center gap-x-2 text-gray-500 text-[13px]">
                <FaRegComment size={15} />
                <span>1 comment</span>
              </div>
            </div>

            <div className="text-[13px] leading-6 text-main-500">
              Core i9-13900HX cho laptop lộ điểm hiệu năng cao hơn cả Core
              i9-12900K và Ryzen 9 7900X
            </div>
          </div>
        </div>

        <div className="w-[calc(calc(100%_/_3)_-_20px)] mx-[10px]">
          <div className="mb-5 w-[380px] h-[260px]">
            <img
              src="https://hanoicomputercdn.com/media/news/2035_laptop_asus_vivobook_pro_16x.jpg"
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="text-center px-[15px]">
            <h3 className="text-main-800 uppercase font-semibold text-base mb-[15px]">
              Những mẫu laptop phù hợp với sinh viên mùa tựu trường
            </h3>
            <div className="flex items-center justify-center gap-x-4 mb-[10px]">
              <div className="flex items-center gap-x-2 text-gray-500 text-[13px]">
                <FaCalendarAlt size={15} />
                <span>December 13, 2016</span>
              </div>

              <div className="flex items-center gap-x-2 text-gray-500 text-[13px]">
                <FaRegComment size={15} />
                <span>1 comment</span>
              </div>
            </div>

            <div className="text-[13px] leading-6 text-main-500">
              Tổng hợp 9 mẫu laptop tốt nhất dành cho sinh viên mùa nhập học
              2023 với mức giá vô cùng hấp dẫn tại Digital World.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
