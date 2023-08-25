import React, { useEffect, useMemo, useState } from "react";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/auth.service";
import { toast } from "react-toastify";
import { isEntityError } from "../../utils/helper";
import { InputItem } from "../../components/guest";
import Breadcrumb from "../../components/guest/Breadcrumb/Breadcrumb";
import { OvalSpinner } from "../../components/common/LoaderSpinner";

const { BiChevronRight } = icons;

const initialState: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
} = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type RegisterFormError =
  | {
      [key in keyof typeof initialState]: string;
    }
  | null
  | undefined;

type Props = {};

const RegisterPage = (props: Props) => {
  const [formValue, setFormValue] = useState(initialState);
  const [register, registerResult] = useRegisterMutation();

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    await register(formValue);
  };

  const errorForm: RegisterFormError = useMemo(() => {
    if (isEntityError(registerResult.error)) {
      return registerResult.error.data.message as RegisterFormError;
    }
  }, [registerResult]);

  useEffect(() => {
    if (registerResult.isSuccess) {
      toast.success("Đăng ký tài khoản thành công, vui lòng đăng nhập");
    }
  }, [registerResult.isSuccess]);

  useEffect(() => {
    if (registerResult.isError) {
      toast.error((registerResult.error as any).data.message);
    }
  }, [registerResult.isError]);

  return (
    <>
      <div className="bg-[#f7f7f7] py-[15px] mb-5">
        <div className="px-[170px]">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              Tạo tài khoản
            </div>
            <Breadcrumb />
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
              <InputItem
                placeholder="Họ và tên"
                name="name"
                value={formValue.name}
                handleChange={handleChange}
              />

              {errorForm?.name && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-2">
                  <span className="font-semibold">{errorForm?.name}</span>
                </span>
              )}
            </div>

            <div className="text-sm text-main-600 w-[500px]">
              <InputItem
                type="email"
                placeholder="Email"
                name="email"
                value={formValue.email}
                handleChange={handleChange}
              />

              {errorForm?.email && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-2">
                  <span className="font-semibold">{errorForm?.email}</span>
                </span>
              )}
            </div>

            <div className="text-sm text-main-600 w-[500px]">
              <InputItem
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={formValue.password}
                handleChange={handleChange}
              />

              {errorForm?.password && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-2">
                  <span className="font-semibold">{errorForm?.password}</span>
                </span>
              )}
            </div>

            <div className="text-sm text-main-600 w-[500px]">
              <InputItem
                type="password"
                placeholder="Xác nhận mật khẩu"
                name="confirmPassword"
                value={formValue.confirmPassword}
                handleChange={handleChange}
              />

              {errorForm?.confirmPassword && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-2">
                  <span className="font-semibold">
                    {errorForm?.confirmPassword}
                  </span>
                </span>
              )}
            </div>

            <button className="bg-main-200 uppercase h-12 px-[15px] text-white text-[15px] font-light hover:bg-[#333] transition-all duration-150 ease-in-out hover:opacity-90 mb-[10px]">
              <div className="flex items-center justify-center gap-x-2">
                <span>Đăng ký</span>
                {registerResult.isLoading && <OvalSpinner />}
              </div>
            </button>

            <div className="flex items-center justify-center">
              <span className="text-main-600 text-sm hover:text-main-200">
                <Link to="/login">Đăng nhập</Link>
              </span>
            </div>

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
