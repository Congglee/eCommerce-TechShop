import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import icons from "../../../utils/icons";
import { AdminInputItem } from "../../../components/admin";
import { IBrand } from "../../../interfaces/brand.interface";
import { useForm } from "react-hook-form";
import {
  useGetBrandQuery,
  useUpdateBrandMutation,
} from "../../../features/brand/brand.services";
import { toast } from "react-toastify";
import useHandlerError from "../../../hooks/useHandleError";
import { OvalSpinner } from "../../../components/common";

const { BsArrowLeft } = icons;

type FormStateType = Omit<IBrand, "_id"> | IBrand;

const initialFormState: FormStateType = {
  title: "",
};

const UpdateBrandPage = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    watch,
  } = useForm<FormStateType>({
    defaultValues: initialFormState,
  });

  const { data, refetch } = useGetBrandQuery(id as string);
  const brand = data?.brand;
  const [updateBrand, updateBrandResult] = useUpdateBrandMutation();

  useEffect(() => {
    if (brand) {
      setValue("title", errors.title ? watch("title") : brand.title);
    }
  }, [brand, setValue]);

  const onSubmit = async (data: FormStateType) => {
    await updateBrand({
      id: id as string,
      body: data as IBrand,
    });
  };

  useEffect(() => {
    if (updateBrandResult.isSuccess) {
      toast.success("Cập nhật thương hiệu thành công");
      refetch();
    }
  }, [updateBrandResult.isSuccess]);

  useHandlerError(updateBrandResult, setError, initialFormState);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <Link to="/admin/brands" className="inline-block">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center gap-x-2"
          >
            <BsArrowLeft size={20} />
            <span>Quản lý thương hiệu</span>
          </button>
        </Link>

        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Cập nhật thương hiệu
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 tablet:grid-cols-2 tablet:gap-6">
            <AdminInputItem
              className="tablet:col-span-2"
              name="title"
              inputId="title"
              label="Tên thương hiệu"
              type="text"
              placeHolder="Tên thương hiệu"
              errorMessage={errors.title?.message}
              register={register}
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-x-2 px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 min-h-[45px] mobile:w-[250px]"
          >
            Cập nhật thương hiệu
            {updateBrandResult.isLoading && (
              <OvalSpinner width={20} height={20} />
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateBrandPage;
