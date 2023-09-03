import React, { useEffect, useState } from "react";
import { ICartItem, IProduct } from "../../../interfaces/product.interface";
import icons from "../../../utils/icons";
import { formatCurrency } from "../../../utils/fn";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cart/cart.slice";
import { StarRating } from "..";

const {
  BiLogoFacebook,
  BiLogoTwitter,
  BiLogoPinterest,
  BsShieldShaded,
  FaTruck,
  HiGift,
  FaReply,
  FaTty,
} = icons;

interface productDetailContentProps {
  product: IProduct | undefined;
  slug?: string;
}

const ProductDetailContent = (props: productDetailContentProps) => {
  const { product } = props;
  const dispatch = useDispatch();
  // const [addToCartMutation, addToCartMutationResult] = useAddToCartMutation();
  // const { data, refetch } = useGetCurrentUserQuery();
  // const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.thumb);

  const handleAddToCartStorage = async (product: ICartItem) => {
    // if (isLoggedIn) {
    //   await addToCartMutation({
    //     id: product._id,
    //     quantity: value,
    //   });
    // }
    dispatch(addToCart({ product: product, productQuantity: value }));
    toast.success(`Thêm sản phẩm ${product.name} vào giỏ hàng thành công`, {
      position: "bottom-right",
    });
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    setSelectedImage(product?.thumb);
  }, [product]);

  // useEffect(() => {
  //   if (addToCartMutationResult.isSuccess) {
  //     refetch();
  //     dispatch(setCurrentUser({ userData: data?.userData }));
  //   }
  // }, [addToCartMutationResult.isSuccess, refetch, dispatch, data?.userData]);

  // useEffect(() => {
  //   if (addToCartMutationResult.isError) {
  //     toast.error((addToCartMutationResult.error as any).data.message);
  //   }
  // }, [addToCartMutationResult.isError]);

  return (
    <>
      <div className="w-[40%] md:w-full flex-shrink-0 flex flex-col gap-y-[30px]">
        <div className="border border-main-700 bg-[#f7f7f7]">
          <img src={selectedImage || product?.thumb} alt="" />
        </div>

        <div className="flex flex-wrap mx-[-5px] gap-y-[10px]">
          {product?.images.map((image) => (
            <div
              className="w-[calc(calc(100%_/_3)_-_10px)] md:w-[calc(calc(100%_/_2)_-_10px)] mx-[5px] border border-main-700 p-[10px] cursor-pointer"
              key={image}
              onClick={() => handleImageClick(image)}
            >
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="w-[60%] md:w-full flex-1 flex sm:flex-col">
        <div className="w-[62.5%] flex-shrink-0 sm:w-full sm:mb-5">
          <div className="text-[#333] text-3xl font-semibold mb-5">
            <span>{formatCurrency(product?.price)} VND</span>
          </div>

          <div className="flex items-start gap-x-[3px] mb-3">
            <div className="flex items-center text-[#f1b400] mb-[10px]">
              <StarRating
                totalRatings={product?.totalRatings as number}
                size={18}
              />
            </div>
            <span className="text-main-500 text-sm">
              {product?.ratings.length} đánh giá
            </span>
          </div>

          <div className="mb-5">
            <ul className="flex flex-col gap-y-[5px] w-[90%]">
              {product?.description.split("\n").map((item) => (
                <li
                  className="text-sm text-main-500 list-[square] list-inside list-image-[initial]"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-x-5 mb-5">
            <span className="text-main-800 font-semibold text-sm">
              Quantity
            </span>

            <div className="flex items-center">
              <div className="flex items-center border border-gray-200 rounded-sm bg-[#f6f6f6] text-main-600 h-[35px]">
                <button
                  type="button"
                  className="w-full h-full px-2 transition-all duration-200 ease-out border-r border-[#343535] hover:bg-main-600"
                  onClick={() => {
                    if (value > 1) {
                      setValue(value - 1);
                    }
                  }}
                >
                  -
                </button>

                <input
                  type="number"
                  id="Quantity"
                  value={value}
                  onChange={(e) => setValue(+e.target.value)}
                  className="w-[50px] border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none bg-[#f6f6f6] focus:border-transparent focus:ring-0"
                />

                <button
                  type="button"
                  className="w-full h-full px-2 border-l border-[#343535] hover:bg-main-600 transition-all duration-200 ease-out"
                  onClick={() => setValue(value + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            className="w-full bg-main-200 text-white font-bold py-[11px] px-[15px] uppercase text-sm hover:bg-[#333] transition-all duration-150 ease-out mb-5"
            onClick={() => handleAddToCartStorage(product as ICartItem)}
          >
            Thêm vào giỏ hàng
          </button>

          <div className="flex items-center gap-x-3">
            <div className="w-[35px] h-[35px] rounded-full text-white bg-black flex items-center justify-center hover:opacity-80 cursor-pointer">
              <BiLogoFacebook size={21} />
            </div>

            <div className="w-[35px] h-[35px] rounded-full text-white bg-black flex items-center justify-center hover:opacity-80 cursor-pointer">
              <BiLogoTwitter size={21} />
            </div>

            <div className="w-[35px] h-[35px] rounded-full text-white bg-black flex items-center justify-center hover:opacity-80 cursor-pointer">
              <BiLogoPinterest size={21} />
            </div>
          </div>
        </div>

        <div className="w-[37.5%] flex-1 flex flex-col gap-y-[10px] sm:w-full">
          <div className="p-[10px] border border-main-700 flex items-center gap-x-[10px]">
            <div className="p-[10px] bg-main-500 rounded-full flex items-center justify-center text-white">
              <BsShieldShaded size={18} />
            </div>

            <div className="flex flex-col capitalize">
              <span className="text-main-500 text-sm">Bảo đảm</span>
              <span className="text-xs text-[#999]">
                Đã kiểm tra chất lượng
              </span>
            </div>
          </div>

          <div className="p-[10px] border border-main-700 flex items-center gap-x-[10px]">
            <div className="p-[10px] bg-main-500 rounded-full flex items-center justify-center text-white">
              <FaTruck size={18} />
            </div>

            <div className="flex flex-col capitalize">
              <span className="text-main-500 text-sm">Miễn phí vận chuyển</span>
              <span className="text-xs text-[#999]">
                Miễn phí trên tất cả sản phẩm
              </span>
            </div>
          </div>

          <div className="p-[10px] border border-main-700 flex items-center gap-x-[10px]">
            <div className="p-[10px] bg-main-500 rounded-full flex items-center justify-center text-white">
              <HiGift size={18} />
            </div>

            <div className="flex flex-col capitalize">
              <span className="text-main-500 text-sm">
                Thẻ quà tặng đặc biệt
              </span>
              <span className="text-xs text-[#999]">Thẻ quà tặng đặc biệt</span>
            </div>
          </div>

          <div className="p-[10px] border border-main-700 flex items-center gap-x-[10px]">
            <div className="p-[10px] bg-main-500 rounded-full flex items-center justify-center text-white">
              <FaReply size={18} />
            </div>

            <div className="flex flex-col capitalize">
              <span className="text-main-500 text-sm">Trả lại miễn phí</span>
              <span className="text-xs text-[#999]">Trong vòng 7 ngày</span>
            </div>
          </div>

          <div className="p-[10px] border border-main-700 flex items-center gap-x-[10px]">
            <div className="p-[10px] bg-main-500 rounded-full flex items-center justify-center text-white">
              <FaTty size={18} />
            </div>

            <div className="flex flex-col capitalize">
              <span className="text-main-500 text-sm">Tư vấn</span>
              <span className="text-xs text-[#999]">24/7</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailContent;
