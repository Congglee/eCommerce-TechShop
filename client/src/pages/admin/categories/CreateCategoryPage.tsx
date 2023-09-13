import React, { useEffect } from "react";
import { ICategory } from "../../../interfaces/category.interface";
import { useForm } from "react-hook-form";
import { AdminInputItem } from "../../../components/admin";
import icons from "../../../utils/icons";
import { Link } from "react-router-dom";
import { useCreateCategoryMutation } from "../../../features/category/category.services";
import { toast } from "react-toastify";
import useHandlerError from "../../../hooks/useHandleError";

const { BsArrowLeft } = icons;

type FormStateType = Omit<ICategory, "_id"> | ICategory;

const initialFormState: FormStateType = {
  name: "",
};

type Props = {};

const CreateCategory = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormStateType>({
    defaultValues: initialFormState,
  });
  const [createCategory, createCategoryResult] = useCreateCategoryMutation();

  const onSubmit = async (data: FormStateType) => {
    await createCategory(data);
  };

  useEffect(() => {
    if (createCategoryResult.isSuccess) {
      toast.success("Thêm mới danh mục thành công");
    }
  }, [createCategoryResult.isSuccess]);

  useHandlerError(createCategoryResult, setError, initialFormState);

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
          Thêm mới danh mục (thương hiệu)
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
            Thêm danh mục
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateCategory;
