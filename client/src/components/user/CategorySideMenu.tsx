import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { SiAsus, SiDell } from "react-icons/si";
import { IoLogoApple } from "react-icons/io";
import { RiAliensFill } from "react-icons/ri";
import { ICategory } from "../../@types/category.interface";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../features/category/category.services";

type Props = {};

const UserSideMenu = (props: Props) => {
  const { data } = useGetCategoriesQuery();

  return (
    <div className="border border-1 border-gray-200">
      <div className="px-[20px] py-[10px] bg-[#EE3131]">
        <div className="flex space-x-[5px] items-center  text-white">
          <div>
            <AiOutlineUnorderedList />
          </div>
          <p className="text-[16px]">ALL COLLECTIONS</p>
        </div>
      </div>
      <div className="text-black">
        <ul className="">
          {data?.categories.map((category: ICategory) => (
            <li className="py-2" key={category._id}>
              <Link
                to={`/category/${category.slug}`}
                className="text-white block pl-4"
              >
                <div className="flex space-x-[10px] items-center text-[#1c1d1d]">
                  <div>
                    <SiAsus size={35} />
                  </div>
                  <p className="text-[14px] ">{category.name}</p>
                </div>
              </Link>
            </li>
          ))}

          {/* <li className="py-2">
            <a href="#" className="text-white block pl-4">
              <div className="flex space-x-[10px] items-center text-[#1c1d1d]">
                <div>
                  <SiAsus size={35} />
                </div>
                <p className="text-[14px] ">Asus</p>
              </div>
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-white block pl-4">
              <div className="flex space-x-[10px] items-center text-[#1c1d1d]">
                <div>
                  <IoLogoApple size={35} />
                </div>
                <p className="text-[14px] ">Apple</p>
              </div>
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-white block pl-4">
              <div className="flex space-x-[10px] items-center text-[#1c1d1d]">
                <div>
                  <SiDell size={35} />
                </div>
                <p className="text-[14px] ">Dell</p>
              </div>
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-white block pl-4">
              <div className="flex space-x-[10px] items-center text-[#1c1d1d]">
                <div>
                  <RiAliensFill size={35} />
                </div>
                <p className="text-[14px] ">Alienware</p>
              </div>
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-white block pl-4">
              <div className="flex space-x-[10px] items-center text-[#1c1d1d]">
                <div>
                  <SiAsus size={40} />
                </div>
                <p className="text-[14px] ">Asus</p>
              </div>
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-white block pl-4">
              <div className="flex space-x-[10px] items-center text-[#1c1d1d]">
                <div>
                  <SiAsus size={40} />
                </div>
                <p className="text-[14px] ">Asus</p>
              </div>
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="text-white block pl-4">
              <div className="flex space-x-[10px] items-center text-[#1c1d1d]">
                <div>
                  <SiAsus size={40} />
                </div>
                <p className="text-[14px] ">Asus</p>
              </div>
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default UserSideMenu;
