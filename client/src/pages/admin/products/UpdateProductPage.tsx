import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import icons from "../../../utils/icons";
import {
  AdminInputItem,
  AdminSelect,
  MarkdownEditor,
} from "../../../components/admin";
import { useForm } from "react-hook-form";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../features/product/product.services";
import { IProduct } from "../../../interfaces/product.interface";
import { useGetCategoriesQuery } from "../../../features/category/category.services";
import { ICategory } from "../../../interfaces/category.interface";
import { toast } from "react-toastify";
import { getBase64 } from "../../../utils/fn";
import useHandlerError from "../../../hooks/useHandleError";
import { OvalSpinner } from "../../../components/common";

const { BsArrowLeft } = icons;

type FormStateType = Omit<IProduct, "_id"> | IProduct;

const initialFormState = {
  name: "",
  price: 0,
  thumb: "",
  images: [],
  quantity: 1,
  category: "",
  brand: "",
  description: "",
};

const UpdateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
    watch,
    setValue,
    reset,
  } = useForm<FormStateType>({
    defaultValues: initialFormState,
  });
  const { id } = useParams();
  const { data, refetch } = useGetProductByIdQuery(id as string);
  const { data: categoriesData } = useGetCategoriesQuery({});
  const product = data?.productData;
  const [updateProduct, updateProductResult] = useUpdateProductMutation();

  const [preview, setPreview] = useState<{
    thumb: string | null;
    images: { name: string; path: string }[];
  }>({
    thumb: null,
    images: [],
  });

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("quantity", product.quantity);
      setValue("thumb", product.thumb);
      setValue("images", product.images);
      setValue("brand", product.brand);
      setValue("category", (product.category as ICategory)._id);
      setValue("description", product.description);
      setPreview({
        thumb: product.thumb,
        images: product.images.map((image) => ({
          name: image,
          path: image,
        })),
      });
    }
  }, [product, setValue]);

  const handlePreviewThumb = async (file: any) => {
    if (
      file?.type &&
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
        file?.type &&
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
    if (watch("thumb")) handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images")) handlePreviewImages(watch("images"));
  }, [watch("images")]);

  const onSubmit = async (data: FormStateType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("brand", data.brand);
    formData.append("quantity", String(data.quantity));
    formData.append("category", data.category as string);
    formData.append("description", data.description as string);

    if (typeof data.thumb === "object" && (data.thumb as FileList).length > 0) {
      formData.append("thumb", data.thumb[0]);
    } else if (typeof data.thumb === "string") {
      formData.append("thumb", data.thumb);
    } else {
      formData.append("thumb", "");
    }

    if (data.images.length > 0)
      for (let image of data.images) formData.append("images", image);
    else formData.append("images", "");

    await updateProduct({ id: product?._id as string, body: formData });
  };

  useEffect(() => {
    if (updateProductResult.isSuccess) {
      toast.success("Cập nhật sản phẩm thành công");
      refetch();
    }
  }, [updateProductResult.isSuccess]);

  useHandlerError(updateProductResult, setError, initialFormState);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-5xl laptop:py-16">
        <Link to="/admin/products" className="inline-block">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center gap-x-2"
          >
            <BsArrowLeft size={20} />
            <span>Quản lý sản phẩm</span>
          </button>
        </Link>

        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Cập nhật sản phẩm
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
                <div className="grid grid-cols-2 ipad:grid-cols-3 gap-4 mt-4">
                  {preview.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        className="h-full w-full object-cover rounded-lg"
                        src={image.path}
                        alt="images"
                      />
                    </div>
                  ))}
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
              defaultValue={(product?.category as ICategory)?._id}
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
              defaultValue={product?.brand}
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
            className="inline-flex items-center justify-center gap-x-2 px-5 py-2 mt-4 tablet:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 min-h-[45px] mobile:w-[250px] mr-4"
          >
            Cập nhật sản phẩm
            {updateProductResult.isLoading && (
              <OvalSpinner width={20} height={20} />
            )}
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-x-2 px-5 py-2 mt-4 tablet:mt-6 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 min-h-[45px] mobile:w-[250px]"
            onClick={() => {
              reset({
                name: product?.name,
                price: product?.price,
                brand: product?.brand,
                description: product?.description,
                quantity: product?.quantity,
                images: product?.images,
                thumb: product?.thumb,
                category: (product?.category as ICategory)._id,
              });

              product &&
                setPreview({
                  thumb: product.thumb as string,
                  images: product.images.map((image) => ({
                    name: image,
                    path: image,
                  })),
                });
            }}
          >
            Hủy
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProduct;
