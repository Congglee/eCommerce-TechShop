import React, { useEffect, useMemo, useState } from "react";
import icons from "../../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/auth.service";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/auth.slice";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { isEntityError } from "../../utils/helper";

const { BiChevronRight } = icons;

const initialState: { email: string; password: string } = {
  email: "",
  password: "",
};

type LoginFormError =
  | {
      [key in keyof typeof initialState]: string;
    }
  | null
  | undefined;

type Props = {};

const LoginPage = (props: Props) => {
  const [formValue, setFormValue] = useState(initialState);
  const [login, loginResult] = useLoginMutation();
  // const { cartProducts } = useSelector((state: RootState) => state.cart);
  // const [updateCarts, updateCartsResult] = useUpdateCartsMutation();
  // const { data } = useGetCurrentUserQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formValue);
    // await updateCarts({
    //   cart: cartProducts.map((cart) => ({
    //     product: cart._id,
    //     quantity: cart.quantity,
    //   })),
    // });
  };

  const errorForm: LoginFormError = useMemo(() => {
    if (isEntityError(loginResult.error)) {
      return loginResult.error.data.message as LoginFormError;
    }
  }, [loginResult]);

  useEffect(() => {
    if (loginResult.isSuccess) {
      dispatch(
        setUser({
          isLoggedIn: true,
          userData: loginResult.data.userData,
          token: loginResult.data.accessToken,
          // cartProducts: data?.userData.cart.map((cartItem: any) => ({
          //   ...cartItem.product,
          //   quantity: cartItem.quantity,
          // })) as IProduct[],
        })
      );

      if (
        loginResult.data.accessToken &&
        typeof loginResult.data.accessToken === "string"
      ) {
        const { isAdmin }: any = jwt_decode(loginResult.data.accessToken);
        if (isAdmin) navigate("/admin");
        else {
          navigate("/");
        }
      }
    }
  }, [loginResult.isSuccess]);

  useEffect(() => {
    if (loginResult.isError) {
      toast.error((loginResult.error as any).data.message);
    }
  }, [loginResult.isError]);

  return (
    <>
      <div className="bg-[#f7f7f7] py-[15px] mb-5">
        <div className="px-[170px]">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              Đăng nhập
            </div>
            <div className="flex items-center text-sm text-[#1c1d1d]">
              <span>Trang chủ</span>
              <BiChevronRight size={18} />
              <span>Tài khoản</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1220px] mx-auto px-5">
        <div className="flex items-center justify-center flex-col gap-y-[10px] mb-10">
          <form
            className="flex flex-col gap-y-[10px]"
            onSubmit={handleSubmitLogin}
          >
            <div className="text-sm text-main-600 w-[500px]">
              <input
                type="text"
                placeholder="Email"
                className="border-transparent border-2 bg-[#f6f6f6] w-full py-[6px] px-[10px] placeholder:text-sm font-light focus:border-2 focus:border-main-600 focus:ring-0 rounded-[4px]"
                name="email"
                value={formValue.email}
                onChange={handleChange}
              />

              {errorForm?.email && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-2">
                  <span className="font-semibold">{errorForm?.email}</span>
                </span>
              )}
            </div>

            <div className="text-sm text-main-600 w-[500px]">
              <input
                type="password"
                placeholder="Mật khẩu"
                className="border-transparent border-2 bg-[#f6f6f6] w-full py-[6px] px-[10px] placeholder:text-sm font-light focus:border-2 focus:border-main-600 focus:ring-0 rounded-[4px]"
                name="password"
                value={formValue.password}
                onChange={handleChange}
              />

              {errorForm?.password && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-2">
                  <span className="font-semibold">{errorForm?.password}</span>
                </span>
              )}
            </div>

            <button className="bg-main-200 uppercase py-[10px] px-[15px] text-white text-[15px] font-light hover:bg-[#333] transition-all duration-150 ease-in-out hover:opacity-90 mb-[10px]">
              Đăng nhập
            </button>

            <div className="flex items-center justify-center flex-col gap-y-[10px]">
              <span className="text-main-600 text-sm hover:text-main-200">
                <Link to="/register">Tạo Tài Khoản</Link>
              </span>
              <span className="text-main-600 text-sm hover:text-main-200">
                <Link to="/products">Quay lại cửa hàng</Link>
              </span>
              <span className="text-main-600 text-sm hover:text-main-200">
                <Link to="/">Quên mật khẩu?</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
