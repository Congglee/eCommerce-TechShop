import React from "react";
import icons from "../../../utils/icons";
import { hotCollections } from "../../../utils/collections";

const { BiChevronRight } = icons;

type Props = {};

const HotCollections = (props: Props) => {
  return (
    <div className="mb-5">
      <div className="mb-5 text-[#151515] border-b-2 border-main-200 pb-[15px] uppercase text-xl font-semibold">
        BỘ SƯU TẬP HOT
      </div>

      <div className="flex flex-wrap mx-[-10px]">
        {hotCollections.map((item, index) => (
          <div
            className="w-[calc(calc(100%_/_3)_-_20px)] xs:w-[calc(calc(100%_/_2)_-_20px)] md:w-[calc(calc(100%_/_2)_-_20px)] mx-[10px] mb-5 border border-main-700 p-[15px] flex flex-wrap"
            key={index}
          >
            <div className="pl-5 xs:pl-0 xs:w-full xs:h-auto md:pl-0 md:w-full md:h-auto flex-shrink-0 w-[175px] h-[140px]">
              <img src={item.image} alt="" className="w-full h-full" />
            </div>

            <div className="flex-1">
              <h3 className="uppercase font-semibold mb-[10px] text-main-500 text-sm">
                {item.title}
              </h3>
              <div className="flex flex-col gap-y-[5px] mb-5">
                {item.type.map((itemType) => (
                  <div
                    className="flex items-center text-gray-500 text-sm"
                    key={itemType}
                  >
                    <div>
                      <BiChevronRight size={18} />
                    </div>
                    <span>{itemType}</span>
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
