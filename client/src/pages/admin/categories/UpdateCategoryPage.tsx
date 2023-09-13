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

const { BsArrowLeft } = icons;

type FormStateType = Omit<ICategory, "_id"> | ICategory;

const initialFormState: FormStateType = {
  name: "",
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
  const { data, refetch } = useGetCategoryQuery(id as string);
  const category = data?.productCategory;
  const [updateCategory, updateCategoryResult] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      setValue("name", errors.name ? watch("name") : category.name);
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
        <Link to="/admin/categories">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center gap-x-2"
          >
            <BsArrowLeft size={20} />
            <span>Quản lý danh mục</span>
          </button>
        </Link>

        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Cập nhật danh mục (thương hiệu)
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AdminInputItem
            name="name"
            inputId="name"
            label="Tên danh mục"
            type="text"
            placeHolder="Tên danh mục"
            errorMessage={errors.name?.message}
            register={register}
          />

          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Cập nhật danh mục
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateCategory;
