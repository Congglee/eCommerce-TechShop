import { ICartItem, IProduct } from "../../../interfaces/product.interface";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../../utils/fn";
import { setCartQuantity } from "../../../features/cart/cart.slice";

interface cartItemProps {
  cartItem: ICartItem;
  handleDecreaseCart: (cartItem: IProduct) => void;
  handleIncreaseCart: (cartItem: IProduct) => void;
  handleRemoveFromCart: (cartItem: IProduct) => void;
  quantity?: number;
  isLoggedIn?: boolean;
}

const CartItem = (props: cartItemProps) => {
  const dispatch = useDispatch();
  const {
    cartItem,
    handleDecreaseCart,
    handleIncreaseCart,
    handleRemoveFromCart,
  } = props;

  return (
    <div
      className="py-[15px] px-5 border-b border-main-700 flex justify-between md:flex-col"
      key={cartItem._id}
    >
      <div className="flex items-center w-[60%] 900:w-[55%] md:w-full md:items-stretch flex-shrink-0 gap-x-5 xs:mb-2">
        <div className="w-[30%] sm:w-2/5 sm:flex-shrink-0 ">
          <img
            src={cartItem.thumb}
            alt=""
            className="w-full h-full object-cover xs:object-fill"
          />
        </div>

        <div className="flex flex-col text-base text-main-600 w-[70%] sm:w-3/5 sm:flex-1">
          <span className="hover:text-main-200 cursor-pointer text-sm">
            {cartItem.name}
          </span>
          <button
            type="button"
            className="text-sm text-main-500 text-left hover:text-main-200"
          >
            <span onClick={() => handleRemoveFromCart(cartItem)}>Remove</span>
          </button>
        </div>
      </div>

      <div className="w-[40%] 900:w-[45%] md:w-full md:px-5 sm:px-0 xs:gap-x-3 flex-1 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center border border-gray-200 rounded-sm bg-[#f6f6f6] text-main-600 h-[35px]">
            <button
              type="button"
              className="w-full h-full px-2 transition-all duration-200 ease-out border-r border-[#343535] hover:bg-main-600"
              onClick={() => handleDecreaseCart(cartItem)}
            >
              -
            </button>

            <input
              type="number"
              id="Quantity"
              value={cartItem.cartQuantity}
              onChange={(e) =>
                dispatch(
                  setCartQuantity({
                    id: cartItem._id,
                    quantity: +e.target.value === 0 ? 1 : +e.target.value,
                  })
                )
              }
              className="w-[50px] border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none bg-[#f6f6f6] focus:border-transparent focus:ring-0"
            />

            <button
              type="button"
              className="w-full h-full px-2 border-l border-[#343535] hover:bg-main-600 transition-all duration-200 ease-out"
              onClick={() => handleIncreaseCart(cartItem)}
            >
              +
            </button>
          </div>
        </div>

        <div className="text-xl font-semibold text-[#333] line-clamp-2 whitespace-normal break-words">
          {formatCurrency(cartItem.price * cartItem.cartQuantity)} VND
        </div>
      </div>
    </div>
  );
};

export default CartItem;
