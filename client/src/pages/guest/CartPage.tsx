import React, { useEffect } from "react";
import icons from "../../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { IProduct } from "../../interfaces/product.interface";
import { formatCurrency } from "../../utils/fn";
import {
  clearCart,
  getCartTotals,
  removeFromCart,
  setDecreaseCart,
  setIncreaseCart,
} from "../../features/cart/cart.slice";
import { toast } from "react-toastify";
import CartItem from "../../components/guest/CartItem/CartItem";

const { BiChevronRight } = icons;

type Props = {};

const CartPage = (props: Props) => {
  const { cartProducts, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  // const { data } = useGetCurrentUserQuery();
  // const [updateCarts, updateCartsResult] = useUpdateCartsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    // const updateCartData = async () => {
    //   await updateCarts({
    //     cart: cartProducts.map((cart) => ({
    //       product: cart._id,
    //       quantity: cart.quantity,
    //     })),
    //   });
    // };
    // updateCartData();
    dispatch(getCartTotals());
  }, [cartProducts, dispatch]);

  const handleRemoveFromCart = (cartItem: IProduct) => {
    dispatch(removeFromCart({ id: cartItem._id }));
    toast.error(`${cartItem.name} được xóa khỏi giỏ hàng`, {
      position: "bottom-right",
    });
  };

  const handleDecreaseCart = (cartItem: IProduct) => {
    dispatch(setDecreaseCart({ id: cartItem._id }));
  };

  const handleIncreaseCart = (cartItem: IProduct) => {
    dispatch(setIncreaseCart({ id: cartItem._id }));
  };

  return (
    <>
      <div className="bg-[#f7f7f7] py-[15px] mb-5">
        <div className="px-[170px]">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              GIỎ HÀNG CỦA BẠN
            </div>
            <div className="flex items-center text-sm text-[#1c1d1d]">
              <span>Trang chủ</span>
              <BiChevronRight size={18} />
              <span>Giỏ hàng của bạn</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1220px] mx-auto px-5">
        <div className="mb-10">
          <div className="border border-main-700 border-b-0">
            <div className="border-b border-main-700 font-semibold text-lg text-main-800 py-[15px] px-5 flex justify-between items-center">
              <div className="w-[60%] flex-shrink-0"></div>
              <div className="w-[40%] flex-1 flex items-center justify-between uppercase">
                <div>Số lượng</div>
                <div>Tổng cộng</div>
              </div>
            </div>

            {/* {isLoggedIn && data?.userData.cart.length === 0 && (
              <div className="py-[15px] px-5 border-b border-main-700 flex flex-col gap-y-1 text-main-500 text-lg font-medium">
                <span>Giỏ hàng của bạn đang trống</span>
                <span className="hover:text-main-200">
                  <Link to="/products">Quay về cửa hàng</Link>
                </span>
              </div>
            )} */}

            {cartProducts.length === 0 && (
              <div className="py-[15px] px-5 border-b border-main-700 flex flex-col gap-y-1 text-main-500 text-lg font-medium">
                <span>Giỏ hàng của bạn đang trống</span>
                <span className="hover:text-main-200">
                  <Link to="/products">Quay về cửa hàng</Link>
                </span>
              </div>
            )}

            {cartProducts.length > 0 &&
              cartProducts.map((cartItem: IProduct) => (
                <CartItem
                  key={cartItem._id}
                  cartItem={cartItem}
                  handleDecreaseCart={handleDecreaseCart}
                  handleIncreaseCart={handleIncreaseCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))}

            {/* {isLoggedIn &&
              (data?.userData.cart.length as number) > 0 &&
              data?.userData.cart.map((cartItem: any) => (
                <CartItem
                  key={cartItem.product._id}
                  cartItem={cartItem.product}
                  quantity={cartItem.quantity}
                  isLoggedIn={isLoggedIn}
                  handleDecreaseCart={handleDecreaseCart}
                  handleIncreaseCart={handleIncreaseCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))} */}

            <div className="py-[15px] px-5 border-b border-main-700 flex justify-end">
              <div>
                <div className="flex items-center justify-between mb-[10px]">
                  <span className="text-sm text-main-500">Tổng phụ</span>
                  <span className="text-xl font-semibold text-[#333] uppercase">
                    {formatCurrency(totalAmount)} VND
                  </span>
                </div>

                <div className="mb-[10px] text-sm text-main-500 italic">
                  Vận chuyển, thuế và giảm giá được tính khi thanh toán.
                </div>

                <div className="flex items-center justify-end text-white capitalize text-sm gap-x-[10px]">
                  <button
                    type="button"
                    className="bg-main-200 py-[11px] px-[15px] capitalize hover:bg-[#333] transition-all duration-200 ease-out"
                    onClick={() => dispatch(clearCart())}
                  >
                    Xóa giỏ hàng
                  </button>
                  <button className="py-[11px] px-[15px] rounded-[3px] bg-[#333] hover:bg-main-200 transition-all duration-200 ease-out">
                    Cập nhật giỏ hàng
                  </button>

                  <button
                    className="bg-main-200 py-[11px] px-[15px] uppercase hover:bg-[#333] transition-all duration-200 ease-out"
                    onClick={() => {
                      if (cartProducts.length === 0)
                        toast.info(
                          "Giỏ hàng của bạn đang trống vui lòng chọn một sản phẩm"
                        );
                    }}
                  >
                    {isLoggedIn && (
                      <Link to={cartProducts.length > 0 ? "/checkout" : ""}>
                        Thanh toán
                      </Link>
                    )}

                    {!isLoggedIn && <Link to="/login">Đăng nhập</Link>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
