import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useFinalRegisterMutation,
  useRegisterMutation,
} from "../../features/auth/auth.service";
import { toast } from "react-toastify";
import { isEntityError } from "../../utils/helper";
import { InputItem } from "../../components/guest";
import Breadcrumb from "../../components/guest/Breadcrumb/Breadcrumb";
import { Button } from "../../components/common";
import Swal from "sweetalert2";

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

const RegisterPage = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [register, registerResult] = useRegisterMutation();
  const [finalRegister, finalRegisterResult] = useFinalRegisterMutation();
  const [token, setToken] = useState("");
  const navigate = useNavigate();

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

  const handleSubmitFinalRegister = async (token: string) => {
    await finalRegister({ token });
  };

  useEffect(() => {
    const createVerifyMailMessage = async () => {
      const { value } = await Swal.fire({
        title: registerResult.data?.message,
        input: "text",
        inputLabel: "Mã xác thực đăng ký tài khoản",
        inputPlaceholder: "Điền vào mã xác thực",
        confirmButtonText: "Xác nhận",
        confirmButtonColor: "#ad8af1",
      });
      setToken(value);
    };
    if (registerResult.isSuccess) {
      createVerifyMailMessage();
    }
  }, [registerResult.isSuccess]);

  useEffect(() => {
    if (registerResult.isError) {
      toast.error((registerResult.error as any)?.data?.message);
    }
  }, [registerResult.isError]);

  useEffect(() => {
    if (token) {
      handleSubmitFinalRegister(token);
    }
  }, [token]);

  useEffect(() => {
    const createRegisterSuccessMessage = async () => {
      const result = await Swal.fire({
        title: finalRegisterResult.data?.message,
        icon: "success",
        confirmButtonText: "Đăng nhập",
        showCancelButton: true,
        cancelButtonText: "Hủy",
      });

      if (result.isConfirmed) {
        navigate("/login");
      }
    };

    const createRegisterFailMessage = async () => {
      await Swal.fire({
        title: (finalRegisterResult.error as any)?.data?.message,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Xác nhận",
      });
    };

    if (finalRegisterResult.isSuccess) {
      createRegisterSuccessMessage();
      setToken("");
    } else if (finalRegisterResult.isError) {
      createRegisterFailMessage();
      setToken("");
    }
  }, [finalRegisterResult.isSuccess, finalRegisterResult.isError]);

  return (
    <>
      <div className="bg-[#f7f7f7] py-[15px] mb-5">
        <div className="max-w-[1220px] mx-auto px-5">
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
            className="flex flex-col gap-y-[10px] w-[500px] xs:w-[80%]"
            onSubmit={handleRegister}
          >
            <div className="text-sm text-main-600 w-full">
              <InputItem
                placeholder="Họ và tên"
                name="name"
                value={formValue.name}
                handleChange={handleChange}
              />

              {errorForm?.name && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-1">
                  <span className="font-semibold">{errorForm?.name}</span>
                </span>
              )}
            </div>

            <div className="text-sm text-main-600 w-full">
              <InputItem
                type="email"
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
                value={formValue.password}
                handleChange={handleChange}
              />

              {errorForm?.password && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-1">
                  <span className="font-semibold">{errorForm?.password}</span>
                </span>
              )}
            </div>

            <div className="text-sm text-main-600 w-full">
              <InputItem
                type="password"
                placeholder="Xác nhận mật khẩu"
                name="confirmPassword"
                value={formValue.confirmPassword}
                handleChange={handleChange}
              />

              {errorForm?.confirmPassword && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-1">
                  <span className="font-semibold">
                    {errorForm?.confirmPassword}
                  </span>
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="bg-main-200 w-full uppercase h-12 px-[15px] text-white text-[15px] font-light hover:bg-[#333] transition-all duration-150 ease-in-out hover:opacity-90 mb-[10px]"
              isLoading={registerResult.isLoading}
              disabled={registerResult.isLoading}
            >
              Đăng ký
            </Button>

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
