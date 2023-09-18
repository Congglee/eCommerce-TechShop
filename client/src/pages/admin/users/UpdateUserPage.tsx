import React, { useEffect } from "react";
import icons from "../../../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { showUpdateUserDrawer } from "../../../features/user/user.slice";
import { useForm } from "react-hook-form";
import { IUser } from "../../../interfaces/user.interface";
import { AdminInputItem, AdminSelect } from "../../../components/admin";
import { RootState } from "../../../store/store";
import {
  useGetUserQuery,
  useUpdateUserByAdminMutation,
} from "../../../features/user/user.services";
import { toast } from "react-toastify";
import { blockStatus, roles } from "../../../utils/collections";
import useHandlerError from "../../../hooks/useHandleError";
import { OvalSpinner } from "../../../components/common";

const { AiOutlineClose } = icons;

type FormStateType = Omit<IUser, "_id"> | IUser;

const initialFormState: FormStateType = {
  name: "",
  email: "",
  address: "",
  mobile: "",
  isAdmin: false,
  isBlocked: false,
};

type Props = {};

const UpdateUserPage = (props: Props) => {
  const { userId, isShowUpdateUserDrawer } = useSelector(
    (state: RootState) => state.user
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    control,
  } = useForm<FormStateType>({
    defaultValues: initialFormState,
  });

  const { data, refetch } = useGetUserQuery(userId, {
    skip: !userId,
  });
  const user = data?.userData;
  const [updateUserByAdmin, updateUserByAdminResult] =
    useUpdateUserByAdminMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setValue("name", errors.name ? watch("name") : user.name);
      setValue("email", errors.name ? watch("email") : user.email);
      setValue("address", errors.name ? watch("address") : user.address);
      setValue("mobile", errors.name ? watch("mobile") : user.mobile);
      setValue("isAdmin", errors.isAdmin ? watch("isAdmin") : user.isAdmin);
      setValue(
        "isBlocked",
        errors.isBlocked ? watch("isBlocked") : user.isBlocked
      );
    }
  }, [user, setValue, isShowUpdateUserDrawer]);

  const onSubmit = async (data: FormStateType) => {
    if (!data.address) delete data.address;
    if (!data.mobile) delete data.mobile;
    if (typeof data.isAdmin === "string")
      data.isAdmin = data.isAdmin === "1" ? true : false;
    if (typeof data.isBlocked === "string")
      data.isBlocked = data.isBlocked === "1" ? true : false;

    await updateUserByAdmin({
      id: user?._id as string,
      body: data as IUser,
    });
  };

  useEffect(() => {
    if (updateUserByAdminResult.isSuccess) {
      toast.success("Cập nhật tài khoản người dùng thành công");
      refetch();
    }
  }, [updateUserByAdminResult.isSuccess]);

  useHandlerError(updateUserByAdminResult, setError, initialFormState);

  const handleCloseDrawer = () => {
    clearErrors();
    dispatch(showUpdateUserDrawer(false));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h5 className="inline-flex items-center text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
          Sửa thông tin tài khoản
        </h5>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => handleCloseDrawer()}
        >
          <AiOutlineClose size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <AdminInputItem
            name="name"
            inputId="name"
            label="Họ và tên"
            type="text"
            placeHolder="Họ và tên"
            errorMessage={errors.name?.message}
            register={register}
          />

          <AdminInputItem
            name="email"
            inputId="email"
            label="Email"
            type="email"
            placeHolder="Email"
            errorMessage={errors.email?.message}
            register={register}
          />

          <AdminInputItem
            name="address"
            inputId="address"
            label="Địa chỉ"
            type="text"
            placeHolder="Địa chỉ"
            errorMessage={errors.address?.message}
            register={register}
          />

          <AdminInputItem
            name="mobile"
            inputId="mobile"
            label="Số điện thoại"
            type="text"
            placeHolder="Số điện thoại"
            errorMessage={errors.mobile?.message}
            register={register}
          />

          <AdminSelect
            control={control}
            errorMessage={errors.isAdmin}
            options={roles}
            name="isAdmin"
            label="Vai trò"
            defaultValue={user?.isAdmin ? 1 : 0}
            id="isAdmin"
          />

          <AdminSelect
            control={control}
            errorMessage={errors.isBlocked}
            options={blockStatus}
            name="isBlocked"
            label="Trạng thái"
            defaultValue={user?.isBlocked ? 1 : 0}
            id="isBlocked"
          />

          <div className="bottom-0 left-0 flex justify-center w-full pb-4 space-x-4 md:px-4 md:absolute pt-3">
            <button
              type="submit"
              className="text-white flex items-center gap-x-2 w-full justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Cập nhật
              {updateUserByAdminResult.isLoading && <OvalSpinner />}
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => handleCloseDrawer()}
            >
              <AiOutlineClose size={18} />
              Hủy
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateUserPage;
