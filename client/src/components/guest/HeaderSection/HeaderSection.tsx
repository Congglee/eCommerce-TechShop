import React, { useState } from "react";
import icons from "../../../utils/icons";
import logo from "../../../assets/logo_digital_new_250x.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useQueryString } from "../../../hooks/useQueryString";
import { generateSearchParamsURL } from "../../../utils/fn";
import { BurgerMenu } from "../../common";

const {
  BsFillTelephoneFill,
  BsFillHeartFill,
  GrMail,
  HiShoppingBag,
  GiHamburgerMenu,
  PiShoppingCartFill,
} = icons;

const HeaderSection = () => {
  const { cartProducts } = useSelector((state: RootState) => state.cart);
  const [isActive, setIsActive] = useState(false);
  const { category } = useParams();
  const navigate = useNavigate();
  const queryString: {
    name?: string;
    sort?: string;
    brand?: string;
    page?: string;
    price_filter_gte?: string;
    price_filter_lte?: string;
  } = useQueryString();
  const { sort, brand, price_filter_gte, price_filter_lte, page } = queryString;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = (e.target as HTMLFormElement).searchInput.value;
    const isCategoryUrl: boolean = category ? true : false;

    const searchUrl = generateSearchParamsURL({
      name: inputValue,
      sort,
      price_filter_gte,
      price_filter_lte,
      brand,
      page,
      isCategory: isCategoryUrl,
      categoryUrlValue: category,
      isAdmin: false,
      adminUrlValue: "",
    });

    navigate(searchUrl);
  };

  return (
    <div>
      <div className="bg-white py-[35px] md:py-5 max-w-[1220px] px-[20px] mx-auto flex items-center justify-between">
        <div className="w-[25%] flex-shrink-0 md:hidden">
          <img src={logo} alt="" />
        </div>

        <div className="flex gap-x-5 md:hidden">
          <div className="pl-5 flex flex-col items-center 900:hidden">
            <div className="flex items-center gap-x-[10px]">
              <div className="text-main-200">
                <BsFillTelephoneFill size={12} />
              </div>
              <span className="font-semibold uppercase text-[13px] text-main-500">
                (+1800) 000 8808
              </span>
            </div>
            <div className="text-xs text-center text-main-500">
              Thứ Hai-Thứ Bảy 9:00AM - 8:00PM
            </div>
          </div>

          <div className="pl-5 border-l border-[rgba(0,0,0,0.1)] flex flex-col items-center 900:hidden">
            <div className="flex items-center gap-x-[10px]">
              <div className="text-main-200">
                <GrMail size={12} />
              </div>
              <span className="font-semibold uppercase text-[13px] text-main-500">
                support@tadathemes.com
              </span>
            </div>
            <div className="text-xs text-center text-main-500">
              Hỗ trợ trực tuyến 24/7
            </div>
          </div>

          <div className="pl-5 border-l border-[rgba(0,0,0,0.1)]">
            <div className="flex justify-center items-center gap-x-[10px] text-main-200 cursor-pointer py-[10px] h-[40px]">
              <BsFillHeartFill size={19} />
            </div>
          </div>

          <div className="pl-5 border-l border-[rgba(0,0,0,0.1)]">
            <Link to="/cart">
              <div className="flex items-center gap-x-[10px] py-[10px] h-[40px] cursor-pointer">
                <div className=" text-main-200">
                  <HiShoppingBag size={25} />
                </div>

                <span className="text-sm hover:text-main-200">
                  {`${cartProducts.length} sản phẩm`}
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div className="w-full flex gap-x-3 items-center justify-between 769:hidden">
          <div>
            <button onClick={() => setIsActive(true)}>
              <GiHamburgerMenu size={30} />
            </button>
          </div>

          <BurgerMenu
            handleSubmit={handleSubmit}
            isActive={isActive}
            setIsActive={setIsActive}
          />

          <div>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          <div>
            <Link to="/cart">
              <PiShoppingCartFill size={30} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
