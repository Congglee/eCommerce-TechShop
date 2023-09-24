import { useEffect } from "react";
import icons from "../../../utils/icons";
import { Link } from "react-router-dom";
import { AdminInputItem } from "../../../components/admin";
import { IBrand } from "../../../interfaces/brand.interface";
import { useForm } from "react-hook-form";
import { useCreateBrandMutation } from "../../../features/brand/brand.services";
import { OvalSpinner } from "../../../components/common";
import { toast } from "react-toastify";
import useHandlerError from "../../../hooks/useHandleError";

const { BsArrowLeft } = icons;

type FormStateType = Omit<IBrand, "_id"> | IBrand;

const initialFormState: FormStateType = {
  title: "",
};

const CreateBrandPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormStateType>({
    defaultValues: initialFormState,
  });
  const [createBrand, createBrandResult] = useCreateBrandMutation();

  const onSubmit = async (data: FormStateType) => {
    await createBrand(data);
  };

  useEffect(() => {
    if (createBrandResult.isSuccess) {
      toast.success("Thêm mới thương hiệu thành công");
      reset();
    }
  }, [createBrandResult.isSuccess]);

  useHandlerError(createBrandResult, setError, initialFormState);

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
          Thêm mới thương hiệu
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
            Thêm thương hiệu
            {createBrandResult.isLoading && (
              <OvalSpinner width={20} height={20} />
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateBrandPage;
