import React from "react";
import icons from "../../utils/icons";
import {
  acerCollection,
  appleCollection,
  asusCollections,
  dellCollection,
  hpCollection,
  lenovoCollection,
} from "../../utils/collections";

const { BiChevronRight } = icons;

type Props = {};

const HotCollections = (props: Props) => {
  return (
    <div className="mb-5">
      <div className="mb-5 text-[#151515] border-b-2 border-main-200 pb-[15px] uppercase text-xl font-semibold">
        BỘ SƯU TẬP HOT
      </div>
      <div className="flex flex-wrap mx-[-10px]">
        <div className="w-[calc(calc(100%_/_3)_-_20px)] mx-[10px] mb-5 border border-main-700 p-[15px] flex gap-x-5">
          <div className="pl-5 flex-shrink-0 w-[175px] h-[140px]">
            <img
              src="https://hanoicomputercdn.com/media/product/250_60790_laptop_acer_gaming_nitro_5_eagle_17.png"
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="flex-1">
            <h3 className="uppercase font-semibold mb-[10px] text-main-500 text-sm">
              Acer
            </h3>
            <div className="flex flex-col gap-y-[5px] mb-5">
              {acerCollection.map((acer) => (
                <div
                  className="flex items-center text-gray-500 text-sm"
                  key={acer.name}
                >
                  <div>
                    <BiChevronRight size={16} />
                  </div>
                  <span>{acer.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[calc(calc(100%_/_3)_-_20px)] mx-[10px] mb-5 border border-main-700 p-[15px] flex gap-x-5">
          <div className="pl-5 flex-shrink-0 w-[175px] h-[140px]">
            <img
              src="https://hanoicomputercdn.com/media/product/250_63683_asus_gaming_rog_strix_g513_20.jpeg"
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="flex-1">
            <h3 className="uppercase font-semibold mb-[10px] text-main-500 text-sm">
              Asus
            </h3>
            <div className="flex flex-col gap-y-[5px] mb-5">
              {asusCollections.map((asus) => (
                <div
                  className="flex items-center text-gray-500 text-sm"
                  key={asus.name}
                >
                  <div>
                    <BiChevronRight size={16} />
                  </div>
                  <span>{asus.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[calc(calc(100%_/_3)_-_20px)] mx-[10px] mb-5 border border-main-700 p-[15px] flex gap-x-5">
          <div className="pl-5 flex-shrink-0 w-[175px] h-[140px]">
            <img
              src="https://hanoicomputercdn.com/media/product/250_68673_laptop_lenovo_ideapad_gaming_3_10.png"
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="flex-1">
            <h3 className="uppercase font-semibold mb-[10px] text-main-500 text-sm">
              Lenovo
            </h3>
            <div className="flex flex-col gap-y-[5px] mb-5">
              {lenovoCollection.map((lenovo) => (
                <div
                  className="flex items-center text-gray-500 text-sm"
                  key={lenovo.name}
                >
                  <div>
                    <BiChevronRight size={16} />
                  </div>
                  <span>{lenovo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[calc(calc(100%_/_3)_-_20px)] mx-[10px] mb-5 border border-main-700 p-[15px] flex gap-x-5">
          <div className="pl-5 flex-shrink-0 w-[175px] h-[140px]">
            <img
              src="https://hanoicomputercdn.com/media/product/61173_laptop_dell_latitude_7420_70251597_xam_vo_nhom_2021_7.png"
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="flex-1">
            <h3 className="uppercase font-semibold mb-[10px] text-main-500 text-sm">
              Dell
            </h3>
            <div className="flex flex-col gap-y-[5px] mb-5">
              {dellCollection.map((dell) => (
                <div
                  className="flex items-center text-gray-500 text-sm"
                  key={dell.name}
                >
                  <div>
                    <BiChevronRight size={16} />
                  </div>
                  <span>{dell.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[calc(calc(100%_/_3)_-_20px)] mx-[10px] mb-5 border border-main-700 p-[15px] flex gap-x-5">
          <div className="pl-5 flex-shrink-0 w-[175px] h-[140px]">
            <img
              src="https://hanoicomputercdn.com/media/product/62203_laptop_hp_15_3.jpg"
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="flex-1">
            <h3 className="uppercase font-semibold mb-[10px] text-main-500 text-sm">
              HP
            </h3>
            <div className="flex flex-col gap-y-[5px] mb-5">
              {hpCollection.map((hp) => (
                <div
                  className="flex items-center text-gray-500 text-sm"
                  key={hp.name}
                >
                  <div>
                    <BiChevronRight size={16} />
                  </div>
                  <span>{hp.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[calc(calc(100%_/_3)_-_20px)] mx-[10px] mb-5 border border-main-700 p-[15px] flex gap-x-5">
          <div className="pl-5 flex-shrink-0 w-[175px] h-[140px]">
            <img
              src="https://hanoicomputercdn.com/media/product/58384_mba__4_.png"
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="flex-1">
            <h3 className="uppercase font-semibold mb-[10px] text-main-500 text-sm">
              Apple
            </h3>
            <div className="flex flex-col gap-y-[5px] mb-5">
              {appleCollection.map((apple) => (
                <div
                  className="flex items-center text-gray-500 text-sm"
                  key={apple.name}
                >
                  <div>
                    <BiChevronRight size={16} />
                  </div>
                  <span>{apple.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotCollections;
