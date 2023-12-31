import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/auth.service";
import { useDispatch } from "react-redux";
import { setCurrentUser, setUser } from "../../features/auth/auth.slice";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { isEntityError } from "../../utils/helper";
import { InputItem } from "../../components/guest";
import Breadcrumb from "../../components/guest/Breadcrumb/Breadcrumb";
import { Button } from "../../components/common";
import Swal from "sweetalert2";

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

const LoginPage = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [login, loginResult] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formValue);
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
          token: loginResult.data.accessToken,
        })
      );
      dispatch(
        setCurrentUser({
          userData: loginResult.data.userData,
        })
      );
      localStorage.removeItem("orderInfo");

      if (
        loginResult.data.accessToken &&
        typeof loginResult.data.accessToken === "string"
      ) {
        const { isAdmin }: any = jwt_decode(loginResult.data.accessToken);
        if (isAdmin) {
          navigate("/admin");
        } else {
          if (loginResult.data.userData.isBlocked)
            Swal.fire({
              icon: "warning",
              title: "Tài khoản bị chặn",
              text: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên của website để mở khóa.",
              confirmButtonText: "Xác nhận",
            }).then(() => {
              dispatch(
                setUser({
                  isLoggedIn: false,
                  token: "",
                })
              );
              dispatch(
                setCurrentUser({
                  userData: undefined,
                })
              );
              navigate("/login");
            });
          else navigate("/");
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
        <div className="max-w-[1220px] mx-auto px-5">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              Đăng nhập
            </div>
            <Breadcrumb />
          </div>
        </div>
      </div>

      <div className="max-w-[1220px] mx-auto px-5">
        <div className="flex items-center justify-center flex-col gap-y-[10px] mb-10">
          <form
            className="flex flex-col gap-y-[10px] w-[500px] xs:w-[80%]"
            onSubmit={handleSubmitLogin}
          >
            <div className="text-sm text-main-600 w-full">
              <InputItem
                placeholder="Email"
                name="email"
                value={formValue.email}
                handleChange={handleChange}
              />

              {errorForm?.email && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-1">
                  <span className="font-semibold">{errorForm?.email}</span>
                </span>
              )}
            </div>

            <div className="text-sm text-main-600 w-full">
              <InputItem
                type="password"
                placeholder="Mật khẩu"
                name="password"
                handleChange={handleChange}
              />

              {errorForm?.password && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-1">
                  <span className="font-semibold">{errorForm?.password}</span>
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="bg-main-200 uppercase h-12 px-[15px] text-white text-[15px] font-light hover:bg-[#333] transition-all duration-150 ease-in-out hover:opacity-90 mb-[10px] w-full"
              isLoading={loginResult.isLoading}
              disabled={loginResult.isLoading}
            >
              Đăng nhập
            </Button>

            <div className="flex items-center justify-center flex-col gap-y-[10px]">
              <span className="text-main-600 text-sm hover:text-main-200">
                <Link to="/register">Tạo Tài Khoản</Link>
              </span>
              <span className="text-main-600 text-sm hover:text-main-200">
                <Link to="/products">Quay lại cửa hàng</Link>
              </span>
              <span className="text-main-600 text-sm hover:text-main-200">
                <Link to="/forgotpassword">Quên mật khẩu?</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
