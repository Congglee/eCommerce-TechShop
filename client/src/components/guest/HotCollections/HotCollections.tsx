import React from "react";
import icons from "../../../utils/icons";
import hotCollections from "../../../utils/collections";

const { BiChevronRight } = icons;

type Props = {};

const HotCollections = (props: Props) => {
  return (
    <div className="mb-5">
      <div className="mb-5 text-[#151515] border-b-2 border-main-200 pb-[15px] uppercase text-xl font-semibold">
        BỘ SƯU TẬP HOT
      </div>
      <div className="flex flex-wrap mx-[-10px]">
        {hotCollections.map((item) => (
          <div className="w-[calc(calc(100%_/_3)_-_20px)] mx-[10px] mb-5 border border-main-700 p-[15px] flex gap-x-5">
            <div className="pl-5 flex-shrink-0 w-[175px] h-[140px]">
              <img src={item.image} alt="" className="w-full h-full" />
            </div>

            <div className="flex-1">
              <h3 className="uppercase font-semibold mb-[10px] text-main-500 text-sm">
                {item.title}
              </h3>
              <div className="flex flex-col gap-y-[5px] mb-5">
                {item.type.map((elItem) => (
                  <div
                    className="flex items-center text-gray-500 text-sm"
                    key={elItem}
                  >
                    <div>
                      <BiChevronRight size={16} />
                    </div>
                    <span>{elItem}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotCollections;
