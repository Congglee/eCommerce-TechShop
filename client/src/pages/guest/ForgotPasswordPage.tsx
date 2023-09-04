import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/guest/Breadcrumb/Breadcrumb";
import { InputItem } from "../../components/guest";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../features/user/user.services";
import { toast } from "react-toastify";
import { OvalSpinner } from "../../components/common";

interface initialState {
  email: string;
}

type FormErrors = {
  [key in keyof initialState]?: string;
};

type Props = {};

const ForgotPasswordPage = (props: Props) => {
  const initialState: initialState = {
    email: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email không được để trống";
    } else if (!formData.email.match(emailRegex)) {
      newErrors.email = "Email không đúng định dạng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForgotPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (validateForm()) {
      await forgotPassword(formData);
    }
  };

  useEffect(() => {
    if (forgotPasswordResult.isSuccess) {
      toast.success(forgotPasswordResult.data.message);
    }
  }, [forgotPasswordResult.isSuccess]);

  useEffect(() => {
    if (forgotPasswordResult.isError) {
      toast.info((forgotPasswordResult.error as any).data.message);
    }
  }, [forgotPasswordResult.isError]);

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
            onSubmit={handleSubmitForgotPassword}
          >
            <div className="flex items-center justify-center flex-col mb-1">
              <h2 className="mb-2 font-semibold text-xl uppercase">
                LẤY LẠI MẬT KHẨU
              </h2>
              <span className="text-main-500 text-sm">
                Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu.
              </span>
            </div>

            <div className="text-sm text-main-600 w-full">
              <InputItem
                placeholder="Email"
                name="email"
                handleChange={handleChange}
              />

              {errors?.email && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-1">
                  <span className="font-semibold">{errors?.email}</span>
                </span>
              )}
            </div>

            <button className="bg-main-200 uppercase h-10 px-[15px] text-white text-[15px] font-light hover:bg-[#333] transition-all duration-150 ease-in-out hover:opacity-90 mb-[10px] w-full">
              <div className="flex items-center justify-center gap-x-2">
                <span>Gửi</span>
                {forgotPasswordResult.isLoading && <OvalSpinner />}
              </div>
            </button>

            <div className="flex items-center justify-center flex-col gap-y-[10px]">
              <span className="text-main-600 text-sm hover:text-main-200">
                <Link to="/login">Hủy</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
