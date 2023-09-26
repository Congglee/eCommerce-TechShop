import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import icons from "../../utils/icons";
import { IUser } from "../../interfaces/user.interface";
import { useUpdateUserByClientMutation } from "../../features/user/user.services";
import { isEntityError } from "../../utils/helper";
import { toast } from "react-toastify";
import { InputItem } from "../../components/guest";
import { Button } from "../../components/common";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../features/auth/auth.slice";
import { RootState } from "../../store/store";

const { BsArrowLeft } = icons;

type FormStateType = Omit<IUser, "_id"> | IUser;

const initialFormState: FormStateType = {
  name: "",
  email: "",
  address: "",
  mobile: "",
  avatar: "",
  password: "",
};

type UpdateUserClientFormError =
  | {
      [key in keyof typeof initialFormState]: string;
    }
  | null
  | undefined;

const ProfileEditPage = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const [formValue, setFormValue] = useState(initialFormState);
  const [updateUserByClient, updateUserByClientResult] =
    useUpdateUserByClientMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      const updatedFormValue: any = {
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
      };

      if (userData.address) {
        updatedFormValue.address = userData.address;
      }

      if (userData.mobile) {
        updatedFormValue.mobile = userData.mobile;
      }

      setFormValue(updatedFormValue);
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedValue: any;

    if (name === "avatar") {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];
        updatedValue = selectedFile;
      }
    } else {
      updatedValue = value;
    }

    setFormValue({ ...formValue, [name]: updatedValue });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formValue.name);
    formData.append("email", formValue.email);
    if (formValue.address) {
      formData.append("address", formValue.address as string);
    }

    if (formValue.mobile) {
      formData.append("mobile", formValue.mobile as string);
    }

    if (formValue.avatar) {
      formData.append("avatar", formValue.avatar as File);
    }

    await updateUserByClient(formData);
  };

  const errorForm: UpdateUserClientFormError = useMemo(() => {
    if (isEntityError(updateUserByClientResult.error)) {
      return updateUserByClientResult.error.data
        .message as UpdateUserClientFormError;
    }
  }, [updateUserByClientResult]);

  useEffect(() => {
    if (updateUserByClientResult.isSuccess) {
      toast.success("Cập nhật tài khoản thành công");
      dispatch(
        setCurrentUser({ userData: updateUserByClientResult.data.updatedUser })
      );
    }
  }, [updateUserByClientResult.isSuccess]);

  useEffect(() => {
    if (updateUserByClientResult.isError) {
      toast.error((updateUserByClientResult.error as any).data.message);
    }
  }, [updateUserByClientResult.isError]);

  return (
    <>
      <div className="w-[25%] md:w-full md:text-center flex-shrink-0 md:mb-10">
        <div className="mb-[50px]">
          <span className="bg-main-200 py-[11px] px-[15px] 900:text-[13px] uppercase text-white">
            Thông tin tài khoản
          </span>
        </div>

        <Link to="/profile">
          <div className="flex items-end md:justify-center gap-x-[6px] text-sm uppercase hover:text-main-200">
            <BsArrowLeft size={14} />
            <span>Quay lại tài khoản</span>
          </div>
        </Link>
      </div>

      <div className="w-[75%] md:w-full flex-1">
        <div className="flex flex-col gap-y-1 mb-6">
          <h2 className="text-2xl font-semibold text-main-500">
            Thông tin tài khoản của bạn
          </h2>
        </div>

        <form
          className="flex flex-col gap-y-4 p-5 bg-gray-200"
          onSubmit={handleSubmit}
        >
          <h3 className="text-main-500 text-lg font-semibold">
            Chỉnh sửa thông tin tài khoản cá nhân
          </h3>

          <div className="text-sm text-main-600 w-full">
            <InputItem
              type="email"
              name="email"
              value={formValue.email}
              style="border-transparent border-2 bg-gray-400 w-full py-[6px] px-[10px] placeholder:text-sm font-light focus:border-2 focus:border-gray-500 focus:ring-0 rounded-[4px]"
              isReadOnly
              handleChange={handleChange}
              placeholder="Email"
            />

            {errorForm?.email && (
              <span className="mt-1 text-[13px] italic text-red-600 pl-2">
                <span className="font-semibold">{errorForm?.email}</span>
              </span>
            )}
          </div>

          <div className="text-sm text-main-600 w-full">
            <InputItem
              type="text"
              name="name"
              value={formValue.name}
              handleChange={handleChange}
              placeholder="Họ và tên"
            />

            {errorForm?.name && (
              <span className="mt-1 text-[13px] italic text-red-600 pl-2">
                <span className="font-semibold">{errorForm?.name}</span>
              </span>
            )}
          </div>

          <div className="text-sm text-main-600 w-full">
            <InputItem
              type="password"
              name="password"
              value={formValue.password}
              handleChange={handleChange}
              placeholder="Mật khẩu"
              style="border-transparent border-2 bg-gray-400 w-full py-[6px] px-[10px] placeholder:text-sm font-light focus:border-2 focus:border-gray-500 focus:ring-0 rounded-[4px]"
              isDefaultValue
              isReadOnly
              defaultValue={123456}
            />
          </div>

          <div className="text-sm text-main-600 w-full">
            <InputItem
              type="file"
              name="avatar"
              placeholder="Avatar"
              handleChange={handleChange}
            />

            {errorForm?.avatar && (
              <span className="mt-1 text-[13px] italic text-red-600 pl-2">
                <span className="font-semibold">{errorForm?.avatar}</span>
              </span>
            )}

            <div className="mt-2 w-[100px] h-[100px] rounded-full overflow-hidden">
              <img
                src={userData?.avatar as string}
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="text-sm text-main-600 w-full">
            <InputItem
              placeholder="Địa chỉ"
              name="address"
              value={formValue.address}
              handleChange={handleChange}
            />

            {errorForm?.address && (
              <span className="mt-1 text-[13px] italic text-red-600 pl-2">
                <span className="font-semibold">{errorForm?.address}</span>
              </span>
            )}
          </div>

          <div className="text-sm text-main-600 w-full">
            <InputItem
              placeholder="Số điện thoại"
              name="mobile"
              value={formValue.mobile}
              handleChange={handleChange}
            />

            {errorForm?.mobile && (
              <span className="mt-1 text-[13px] italic text-red-600 pl-2">
                <span className="font-semibold">{errorForm?.mobile}</span>
              </span>
            )}
          </div>

          <div className="text-right">
            <Button
              type="submit"
              className="bg-main-200 uppercase h-12 px-[15px] text-white text-[15px] font-light hover:bg-[#333] transition-all duration-150 ease-in-out hover:opacity-90 mb-[10px] w-full max-w-[250px] xs:max-w-[150px] mt-2"
              isLoading={updateUserByClientResult.isLoading}
              disabled={updateUserByClientResult.isLoading}
            >
              Cập nhật
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileEditPage;
