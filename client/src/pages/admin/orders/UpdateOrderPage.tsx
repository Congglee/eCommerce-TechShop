import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import icons from "../../../utils/icons";
import {
  useGetOrderDetailQuery,
  useUpdateOrderAdminMutation,
} from "../../../features/order/order.services";
import { IUser } from "../../../interfaces/user.interface";
import { formatCurrency } from "../../../utils/fn";
import { useForm } from "react-hook-form";
import { AdminSelect } from "../../../components/admin";
import {
  orderDeliveryStatus,
  orderPaymentStatus,
  orderStatus,
} from "../../../utils/collections";
import { toast } from "react-toastify";
import useHandlerError from "../../../hooks/useHandleError";
import { OvalSpinner } from "../../../components/common";

const { BsArrowLeft } = icons;

const initialFormState: {
  status: string;
  delivery_status: string;
  payment_status: string;
} = {
  status: "",
  delivery_status: "",
  payment_status: "",
};

type Props = {};

const UpdateOrderPage = (props: Props) => {
  const { id } = useParams();
  const { data, refetch } = useGetOrderDetailQuery(id as string);
  const order = data?.response;

  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
    setValue,
  } = useForm({
    defaultValues: initialFormState,
  });
  const [updateOrderAdmin, updateOrderAdminResult] =
    useUpdateOrderAdminMutation();

  useEffect(() => {
    if (order) {
      setValue("status", order.status);
      setValue("delivery_status", order.delivery_status);
      setValue("payment_status", order.payment_status);
    }
  }, [order, setValue]);

  const onSubmit = async (data: any) => {
    const finalPayload = { ...order, ...data };
    await updateOrderAdmin({
      id: order?._id as string,
      body: finalPayload,
    });
  };

  useEffect(() => {
    if (updateOrderAdminResult.isSuccess) {
      toast.success("Cập nhật đơn hàng thành công");
      refetch();
    }
  }, [updateOrderAdminResult.isSuccess]);

  useHandlerError(updateOrderAdminResult, setError, initialFormState);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-full laptop:py-4">
        <Link to="/admin/orders" className="inline-block">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center gap-x-2"
          >
            <BsArrowLeft size={20} />
            <span>Quản lý đơn hàng</span>
          </button>
        </Link>

        <div className="relative bg-gray-700 shadow-md tablet:rounded-lg">
          <div className="flex items-center flex-wrap justify-between px-8 mb-6 rounded-t-md rounded-b-md shadow-xs py-5 gap-y-5">
            <div className="relative text-white">
              <h3 className="text-lg font-normal mb-0">
                Mã đơn hàng: {order?.orderCode}
              </h3>
              <p className="mb-0 text-sm">
                Đơn hàng được tạo vào: {order?.date}
              </p>
            </div>

            <form
              className="flex items-start justify-start laptop:items-end flex-wrap gap-4 tablet:mb-0"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex items-center flex-wrap gap-4">
                <AdminSelect
                  control={control}
                  errorMessage={errors.status?.message}
                  options={orderStatus}
                  name="status"
                  label="Tình trạng đơn hàng"
                  defaultValue={order?.status}
                  id="status"
                  defaultOptionValue="Chọn một trạng thái"
                />

                <AdminSelect
                  control={control}
                  errorMessage={errors.delivery_status?.message}
                  options={orderDeliveryStatus}
                  name="delivery_status"
                  label="Tình trạng giao hàng"
                  defaultValue={order?.delivery_status}
                  id="delivery_status"
                  defaultOptionValue="Chọn một trạng thái"
                />

                <AdminSelect
                  control={control}
                  errorMessage={errors.payment_status?.message}
                  options={orderPaymentStatus}
                  name="payment_status"
                  label="Tình trạng thanh toán"
                  defaultValue={order?.payment_status}
                  id="payment_status"
                  defaultOptionValue="Chọn một trạng thái"
                />
              </div>

              <div>
                <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 p-2.5 gap-x-2 min-h-[45px] mobile:w-[120px]">
                  <span>Cập nhật</span>
                  {updateOrderAdminResult.isLoading && (
                    <OvalSpinner width={20} height={20} />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-700 rounded-t-md rounded-b-md shadow-xs px-8 py-8">
            <h5 className="text-lg font-medium mb-[15px] text-white">
              Chi tiết của khách hàng
            </h5>
            <div className="relative overflow-x-auto ">
              <table className="w-[400px] tablet:w-full text-base text-left text-gray-500">
                <tbody>
                  <tr className="bg-gray-700 border-b border-gray6 last:border-0 text-start mx-9 text-white">
                    <td className="py-3 font-normal w-[50%]">Họ và tên</td>
                    <td className="py-3 whitespace-nowrap">
                      <a
                        href="#"
                        className="flex items-center justify-end space-x-5 text-end text-heading text-hover-primary"
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={(order?.orderBy as IUser)?.avatar as string}
                        />
                        <span className="font-medium">
                          {(order?.orderBy as IUser)?.name}
                        </span>
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-700 border-b border-gray6 last:border-0 text-start mx-9 text-white">
                    <td className="py-3 font-normal w-[50%]">Email</td>
                    <td className="py-3 text-end">
                      <a href="mailto:support@mail.com">
                        {(order?.orderBy as IUser)?.email}
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-700 border-b border-gray6 last:border-0 text-start mx-9 text-white">
                    <td className="py-3 font-normal w-[50%]">Số điện thoại</td>
                    <td className="py-3 text-end">
                      <a href="tel:9458785014">
                        {(order?.orderBy as IUser)?.mobile}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-700 rounded-t-md rounded-b-md shadow-xs px-8 py-8">
            <h5 className="text-lg font-medium mb-[15px] text-white">
              Tóm tắt đơn hàng
            </h5>
            <div className="relative overflow-x-auto ">
              <table className="w-[400px] tablet:w-full text-base text-left text-gray-500">
                <tbody>
                  <tr className="bg-gray-700 border-b border-gray6 last:border-0 text-start mx-9 text-white">
                    <td className="py-3 font-normal w-[50%]">Ngày đặt hàng</td>
                    <td className="py-3 text-end">{order?.date}</td>
                  </tr>
                  <tr className="bg-gray-700 border-b border-gray6 last:border-0 text-start mx-9 text-white">
                    <td className="py-3 font-normal w-[50%]">
                      Phương thức thanh toán
                    </td>
                    <td className="py-3 text-end">{order?.payment}</td>
                  </tr>
                  <tr className="bg-gray-700 border-b border-gray6 last:border-0 text-start mx-9 text-white">
                    <td className="py-3 font-normal w-[50%]">
                      Tình trạng thanh toán
                    </td>
                    <td className="py-3 text-end">{order?.payment_status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-700 rounded-t-md rounded-b-md shadow-xs px-8 py-8">
            <h5 className="text-lg font-medium mb-[15px] text-white">
              Giao hàng tới
            </h5>
            <div className="relative overflow-x-auto ">
              <table className="w-[400px] tablet:w-full text-base text-left text-gray-500">
                <tbody>
                  <tr className="bg-gray-700 border-b border-gray6 last:border-0 text-start mx-9 text-white">
                    <td className="py-3 font-normal w-[50%]">Địa chỉ</td>
                    <td className="py-3 text-end">{order?.address}</td>
                  </tr>
                  <tr className="bg-gray-700 border-b border-gray6 last:border-0 text-start mx-9 text-white">
                    <td className="py-3 font-normal w-[50%]">
                      Tình trạng vận chuyển
                    </td>
                    <td className="py-3 text-end">{order?.delivery_status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 desktop2xl:col-span-8">
            <div className="bg-gray-700 rounded-t-md rounded-b-md shadow-xs py-8">
              <div className="relative overflow-x-auto  mx-8">
                <table className="w-[975px] ipad:w-full text-base text-left text-white">
                  <thead className="bg-gray-700">
                    <tr className="border-b border-gray6 text-tiny">
                      <th
                        scope="col"
                        className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
                      >
                        Sản phẩm
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
                      >
                        Đơn giá
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
                      >
                        Số lượng
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
                      >
                        Tổng
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.products.map((orderProduct, index) => (
                      <tr
                        className="bg-gray-700 border-b border-gray6 last:border-0 text-start mx-9"
                        key={index}
                      >
                        <td className="pr-8 py-5 whitespace-nowrap">
                          <a href="#" className="flex items-center space-x-5">
                            <img
                              className="w-[60px] h-[60px] rounded-md flex-shrink-0"
                              src={orderProduct.product.thumb}
                            />
                            <span className="font-medium text-heading text-hover-primary transition flex-1 min-w-[200px] whitespace-normal">
                              {orderProduct.product.name}
                            </span>
                          </a>
                        </td>
                        <td className="px-3 py-3 font-normal text-end">
                          {formatCurrency(orderProduct.product.price)} VND
                        </td>
                        <td className="px-3 py-3 font-normal text-end">
                          {orderProduct.count}
                        </td>
                        <td className="px-3 py-3 font-normal text-end">
                          {formatCurrency(
                            orderProduct.count * orderProduct.product.price
                          )}{" "}
                          VND
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-span-12 desktop2xl:col-span-4">
            <div className="bg-gray-700 rounded-t-md rounded-b-md shadow-xs py-8 px-8">
              <h5 className="text-lg font-medium mb-[15px] text-white">
                Tổng đơn hàng
              </h5>
              <div className="relative overflow-x-auto">
                <table className="w-full text-base text-left text-gray-500">
                  <tbody>
                    <tr className="bg-gray-700 border-b border-gray6 last:border-0 text-start mx-9">
                      <td className="pr-3 py-3 pt-6 font-normal text-white text-start">
                        Tổng phụ
                      </td>
                      <td className="px-3 py-3 pt-6 font-normal text-white text-end">
                        {formatCurrency(order?.total)} VND
                      </td>
                    </tr>
                    <tr className="bg-gray-700 border-b border-gray6 last:border-0 text-start mx-9">
                      <td className="pr-3 py-3 font-normal text-white text-start">
                        Phí vận chuyển
                      </td>
                      <td className="px-3 py-3 font-normal text-white text-end">
                        0,00 VND
                      </td>
                    </tr>
                    <tr className="bg-gray-700 border-b border-gray-600 last:border-0 text-start mx-9">
                      <td className="pr-3 py-3 font-normal text-white text-start">
                        Tổng cộng:
                      </td>
                      <td className="px-3 py-3 text-white text-end text-lg font-semibold">
                        {formatCurrency(order?.total)} VND
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateOrderPage;
