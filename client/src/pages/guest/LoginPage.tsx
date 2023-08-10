import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/auth.service";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/auth.slice";
import jwt_decode from "jwt-decode";

const { BiChevronRight } = icons;

const initialState = {
  email: "",
  password: "",
};

type Props = {};

const LoginPage = (props: Props) => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const [login, { data, isSuccess, isError, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e: any) => {
    e.preventDefault();
    if (email && password) {
      await login({ email, password });
    } else {
      alert("Vui lòng nhập vào các trường!");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Đăng nhập thành công");
      dispatch(setUser({ token: data.accessToken, userData: data.userData }));

      const { token } = JSON.parse(localStorage.getItem("accessToken") || "{}");
      const decodedToken: any = jwt_decode(token);
      const { isAdmin } = decodedToken;

      if (isAdmin) navigate("/admin");
      else navigate("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      alert((error as any).data.message);
    }
  }, [isError]);

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
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="text-sm text-main-600 w-[500px]">
              <input
                type="password"
                placeholder="Mật khẩu"
                className="border-transparent border-2 bg-[#f6f6f6] w-full py-[6px] px-[10px] placeholder:text-sm font-light focus:border-2 focus:border-main-600 focus:ring-0 rounded-[4px]"
                name="password"
                value={password}
                onChange={handleChange}
              />
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
