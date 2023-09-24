import React, { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../components/guest/Breadcrumb/Breadcrumb";
import { InputItem } from "../../components/guest";
import { Link, useParams } from "react-router-dom";
import { isEntityError } from "../../utils/helper";
import { useResetPasswordMutation } from "../../features/user/user.services";
import { toast } from "react-toastify";
import { OvalSpinner } from "../../components/common";

const initialState: { password: string; confirmPassword: string } = {
  password: "",
  confirmPassword: "",
};

type ResetPasswordFormError =
  | {
      [key in keyof typeof initialState]: string;
    }
  | null
  | undefined;

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState(initialState);
  const { token } = useParams();
  const [resetPassword, resetPasswordResult] = useResetPasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const errorForm: ResetPasswordFormError = useMemo(() => {
    if (isEntityError(resetPasswordResult.error)) {
      return resetPasswordResult.error.data.message as ResetPasswordFormError;
    }
  }, [resetPasswordResult]);

  const handleSubmitResetPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await resetPassword({ ...formData, token: token as string });
  };

  useEffect(() => {
    if (resetPasswordResult.isSuccess) {
      toast.success(resetPasswordResult.data.message);
    }
  }, [resetPasswordResult.isSuccess]);

  useEffect(() => {
    if (resetPasswordResult.isError) {
      toast.error((resetPasswordResult.error as any).data.message);
    }
  }, [resetPasswordResult.isError]);

  return (
    <>
      <div className="bg-[#f7f7f7] py-[15px] mb-5">
        <div className="max-w-[1220px] mx-auto px-5">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              Đổi mật khẩu
            </div>
            <Breadcrumb />
          </div>
        </div>
      </div>

      <div className="max-w-[1220px] mx-auto px-5">
        <div className="flex items-center justify-center flex-col gap-y-[10px] mb-10">
          <form
            className="flex flex-col gap-y-[10px] w-[500px] xs:w-[80%]"
            onSubmit={handleSubmitResetPassword}
          >
            <div className="flex items-center justify-center flex-col">
              <h2 className="font-semibold text-xl uppercase">
                Đặt lại mật khẩu
              </h2>
            </div>

            <div className="text-sm text-main-600 w-full">
              <InputItem
                placeholder="Mật khẩu"
                name="password"
                type="password"
                handleChange={handleChange}
              />

              {errorForm?.password && (
                <span className="mt-1 text-[13px] italic text-red-600 pl-2">
                  <span className="font-semibold">{errorForm?.password}</span>
                </span>
              )}
            </div>

            <div className="text-sm text-main-600 w-full">
              <InputItem
                placeholder="Xác nhận mật khẩu"
                name="confirmPassword"
                type="password"
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

            <button className="bg-main-200 uppercase h-10 px-[15px] text-white text-[15px] font-light hover:bg-[#333] transition-all duration-150 ease-in-out hover:opacity-90 mb-[10px] w-full">
              <div className="flex items-center justify-center gap-x-2">
                <span>Cập nhật</span>
                {resetPasswordResult.isLoading && <OvalSpinner />}
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

export default ResetPasswordPage;
