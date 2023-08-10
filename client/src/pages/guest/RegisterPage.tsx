import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/auth.service";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/auth.slice";

const { BiChevronRight } = icons;

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type Props = {};

const RegisterPage = (props: Props) => {
  const [formValue, setFormValue] = useState(initialState);
  const { name, email, password, confirmPassword } = formValue;
  const [register, { data, isSuccess, isError, error }] = useRegisterMutation();
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Xác thực mật khẩu không đúng!");
    }

    if (name && email && password) {
      await register({ name, email, password, confirmPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Đăng ký tài khoản thành công");
    }
  }, [isSuccess]);

  return (
    <>
      <div className="bg-[#f7f7f7] py-[15px] mb-5">
        <div className="px-[170px]">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              Tạo tài khoản
            </div>
            <div className="flex items-center text-sm text-[#1c1d1d]">
              <span>Trang chủ</span>
              <BiChevronRight size={18} />
              <span>Đăng ký</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1220px] mx-auto px-5">
        <div className="flex items-center justify-center flex-col gap-y-[10px] mb-10">
          <form
            className="flex flex-col gap-y-[10px]"
            onSubmit={handleRegister}
          >
            <div className="text-sm text-main-600 w-[500px]">
              <input
                type="text"
                placeholder="Họ và tên"
                className="border-transparent border-2 bg-[#f6f6f6] w-full py-[6px] px-[10px] placeholder:text-sm font-light focus:border-2 focus:border-main-600 focus:ring-0 rounded-[4px]"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>

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

            <div className="text-sm text-main-600 w-[500px]">
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                className="border-transparent border-2 bg-[#f6f6f6] w-full py-[6px] px-[10px] placeholder:text-sm font-light focus:border-2 focus:border-main-600 focus:ring-0 rounded-[4px]"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button className="bg-main-200 uppercase py-[10px] px-[15px] text-white text-[15px] font-light hover:bg-[#333] transition-all duration-150 ease-in-out hover:opacity-90 mb-[10px]">
              Đăng ký
            </button>

            <div className="flex items-center justify-center">
              <span className="text-main-600 text-sm hover:text-main-200">
                <Link to="/products">Quay lại cửa hàng</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
