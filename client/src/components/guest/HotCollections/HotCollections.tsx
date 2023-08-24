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

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {hotCollections.map((item) => (
          <div
            className="border border-main-700 p-4 flex gap-3 md:gap-5"
            key={item.title}
          >
            <div className="w-28 h-28 md:w-36 md:h-36">
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="uppercase font-semibold mb-1 text-main-500 text-sm">
                {item.title}
              </h3>
              <div className="flex flex-col gap-1 mb-4">
                {item.type.map((elItem) => (
                  <div
                    className="flex items-center text-gray-500 text-xs"
                    key={elItem}
                  >
                    <div>
                      <BiChevronRight size={14} />
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
