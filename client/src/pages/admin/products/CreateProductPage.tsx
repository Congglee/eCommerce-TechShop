import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icons from "../../../utils/icons";
import {
  AdminInputItem,
  AdminSelect,
  MarkdownEditor,
} from "../../../components/admin";
import { useForm } from "react-hook-form";
import { IProduct } from "../../../interfaces/product.interface";
import { useGetCategoriesQuery } from "../../../features/category/category.services";
import { getBase64 } from "../../../utils/fn";
import { toast } from "react-toastify";
import { useCreateProductMutation } from "../../../features/product/product.services";
import useHandlerError from "../../../hooks/useHandleError";
import { OvalSpinner } from "../../../components/common";

const { BsArrowLeft } = icons;

type FormStateType = Omit<IProduct, "_id"> | IProduct;

const initialFormState: FormStateType = {
  name: "",
  price: 0,
  thumb: "",
  images: [],
  quantity: 1,
  category: "",
  brand: "",
  description: "",
};

type Props = {};

const CreateProduct = (props: Props) => {
  const { data: categoriesData } = useGetCategoriesQuery({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    watch,
    reset,
  } = useForm<FormStateType>({
    defaultValues: initialFormState,
  });
  const [createProduct, createProductResult] = useCreateProductMutation();

  const [preview, setPreview] = useState<{
    thumb: string | null;
    images: { name: string; path: string }[];
  }>({
    thumb: null,
    images: [],
  });

  const handlePreviewThumb = async (file: any) => {
    if (
      file &&
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/webp"
    ) {
      toast.warning("Chỉ chấp nhận file .png, .jpg, .jpeg, .webp");
    }

    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb as string | null }));
  };

  const handlePreviewImages = async (files: any) => {
    const imagesPreview: { name: string; path: string }[] = [];
    for (let file of files) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/webp"
      ) {
        toast.warning("Chỉ chấp nhận file .png, .jpg, .jpeg, .webp");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push({ name: file.name, path: base64 as string });
    }

    if (imagesPreview.length > 0)
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
    else setPreview((prev) => ({ ...prev, images: [] }));
  };

  useEffect(() => {
    handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    handlePreviewImages(watch("images"));
  }, [watch("images")]);

  const onSubmit = async (data: FormStateType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("brand", data.brand);
    formData.append("quantity", String(data.quantity));
    formData.append("category", data.category as string);
    formData.append("description", data.description as string);

    if (data.thumb.length > 0) formData.append("thumb", data.thumb[0]);
    else formData.append("thumb", "");

    if (data.images.length > 0)
      for (let image of data.images) formData.append("images", image);
    else formData.append("images", "");

    await createProduct(formData);
  };

  useEffect(() => {
    if (createProductResult.isSuccess) {
      toast.success("Thêm mới sản phẩm thành công");
      reset();
    }
  }, [createProductResult.isSuccess]);

  useHandlerError(createProductResult, setError, initialFormState);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-5xl lg:py-16">
        <Link to="/admin/products">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center gap-x-2"
          >
            <BsArrowLeft size={20} />
            <span>Quản lý sản phẩm</span>
          </button>
        </Link>

        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Thêm mới sản phẩm
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 tablet:grid-cols-2 tablet:gap-6">
            <AdminInputItem
              name="name"
              inputId="name"
              label="Tên sản phẩm"
              type="text"
              placeHolder="Tên sản phẩm"
              className="tablet:col-span-2"
              errorMessage={errors.name?.message}
              register={register}
            />

            <AdminInputItem
              name="price"
              inputId="price"
              label="Giá sản phẩm"
              type="number"
              className="w-full"
              placeHolder="Giá sản phẩm"
              errorMessage={errors.price?.message}
              register={register}
            />

            <AdminInputItem
              name="quantity"
              inputId="quantity"
              label="Số lượng sản phẩm"
              type="number"
              className="w-full"
              placeHolder="Số lượng sản phẩm"
              errorMessage={errors.quantity?.message}
              register={register}
            />

            <div className="flex flex-col gap-y-4">
              <AdminInputItem
                name="thumb"
                inputId="thumb"
                label="Ảnh sản phẩm"
                type="file"
                className="w-full"
                placeHolder="Ảnh sản phẩm"
                errorMessage={errors.thumb?.message}
                register={register}
              />

              {preview.thumb && (
                <img
                  className="h-auto w-full rounded-lg"
                  src={preview.thumb}
                  alt="thumbnail"
                />
              )}
            </div>

            <div>
              <AdminInputItem
                name="images"
                inputId="images"
                label="Ảnh chi tiết sản phẩm"
                type="file"
                placeHolder="Ảnh chi tiết sản phẩm"
                errorMessage={errors.images?.message}
                register={register}
                isMutipleFile
              />

              {preview.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {preview.images.map(
                    (image: { name: string; path: string }, index) => (
                      <div key={index} className="relative">
                        <img
                          className="h-full w-full object-cover rounded-lg"
                          src={image.path}
                          alt="images"
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <AdminSelect
              control={control}
              errorMessage={errors.category?.message}
              options={categoriesData?.categories.map((category) => ({
                value: category._id,
                label: category.name,
              }))}
              name="category"
              label="Danh mục"
              id="category"
              defaultOptionValue="Chọn một danh mục"
            />

            <AdminSelect
              control={control}
              errorMessage={errors.brand?.message}
              options={categoriesData?.categories
                .find((category) => category._id === watch("category"))
                ?.brand.map((item) => ({
                  label: item,
                  value: item,
                }))}
              name="brand"
              label="Thương hiệu"
              id="brand"
              defaultOptionValue="Chọn một thương hiệu"
            />

            <MarkdownEditor
              label="Mô tả sản phẩm"
              name="description"
              control={control}
              className="tablet:col-span-2"
              errorMessage={errors.description?.message}
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-x-2 px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 min-h-[45px] mobile:w-[250px]"
          >
            Thêm sản phẩm
            {createProductResult.isLoading && (
              <OvalSpinner width={20} height={20} />
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProduct;
