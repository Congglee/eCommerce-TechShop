import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import icons from "../../../utils/icons";
import { AdminInputItem } from "../../../components/admin";
import { useForm } from "react-hook-form";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../features/category/category.services";
import { ICategory } from "../../../interfaces/category.interface";
import { toast } from "react-toastify";
import useHandlerError from "../../../hooks/useHandleError";
import { useGetBrandsQuery } from "../../../features/brand/brand.services";
import { OvalSpinner } from "../../../components/common";

const { BsArrowLeft } = icons;

type FormStateType = Omit<ICategory, "_id"> | ICategory;

const initialFormState: FormStateType = {
  name: "",
  brand: [],
};

type Props = {};

const UpdateCategory = (props: Props) => {
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
  const { data: categoryData, refetch } = useGetCategoryQuery(id as string);
  const { data: brandData } = useGetBrandsQuery({});

  const category = categoryData?.productCategory;
  const [updateCategory, updateCategoryResult] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      setValue("name", errors.name ? watch("name") : category.name);
      setValue("brand", errors.brand ? watch("brand") : category.brand);
    }
  }, [category, setValue]);

  const onSubmit = async (data: FormStateType) => {
    await updateCategory({
      id: id as string,
      body: data as ICategory,
    });
  };

  useEffect(() => {
    if (updateCategoryResult.isSuccess) {
      toast.success("Cập nhật danh mục thành công");
      refetch();
    }
  }, [updateCategoryResult.isSuccess]);

  useHandlerError(updateCategoryResult, setError, initialFormState);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <Link to="/admin/categories" className="inline-block">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center gap-x-2"
          >
            <BsArrowLeft size={20} />
            <span>Quản lý danh mục</span>
          </button>
        </Link>

        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Cập nhật danh mục
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 tablet:grid-cols-2 tablet:gap-6">
            <AdminInputItem
              className="tablet:col-span-2"
              name="name"
              inputId="name"
              label="Tên danh mục"
              type="text"
              placeHolder="Tên danh mục"
              errorMessage={errors.name?.message}
              register={register}
            />

            <div className="col-span-2">
              <label
                htmlFor=""
                className={`${
                  errors.brand?.message
                    ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    : "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                }`}
              >
                Thương hiệu (không bắt buộc)
              </label>
              <ul
                className={`items-center w-full text-sm font-medium text-gray-900 bg-white border rounded-lg grid grid-cols-2 tablet:grid-cols-3 gap-2 dark:bg-gray-700 dark:text-white ${
                  errors.brand?.message
                    ? "border-red-500"
                    : "dark:border-gray-600 border-gray-200"
                }`}
              >
                {brandData?.brands.map((brand) => (
                  <li
                    className="w-full border-b border-gray-200 tablet:border-b-0 tablet:border-r dark:border-gray-600"
                    key={brand._id}
                  >
                    <div className="flex items-center pl-3">
                      <input
                        id={brand._id}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        value={brand.title}
                        {...register("brand")}
                      />
                      <label
                        htmlFor={brand._id}
                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {brand.title}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>

              {errors.brand?.message && (
                <div className="mt-2 text-sm text-red-600">
                  {errors.brand?.message}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-x-2 px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 min-h-[45px] mobile:w-[250px]"
          >
            Cập nhật danh mục
            {updateCategoryResult.isLoading && (
              <OvalSpinner width={20} height={20} />
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateCategory;
