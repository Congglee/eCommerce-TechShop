import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../features/auth/auth.service";
import { useUpdateUserOrderMutation } from "../../features/user/user.services";
import { toast } from "react-toastify";
import { decryptData, encryptData } from "../../utils/fn";
import { RotatingSpinner } from "../../components/common";

const { BiChevronRight } = icons;

interface initialState {
  address: string;
  name: string;
  email: string;
  mobile: string;
}

type FormErrors = {
  [key in keyof initialState]?: string;
};

type Props = {};

const CheckoutInfoPage = (props: Props) => {
  const { data } = useGetCurrentUserQuery();
  const initalState: initialState = {
    address: "",
    name: "",
    email: "",
    mobile: "",
  };
  const [formData, setFormData] = useState(initalState);

  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const [updateUserOrder, updateUserOrderResult] = useUpdateUserOrderMutation();

  const encryptedData = localStorage.getItem("orderInfo");
  const decryptedUserData: initialState = decryptData(
    encryptedData,
    import.meta.env.VITE_APP_SECRET_KEY
  );

  useEffect(() => {
    if (data?.userData) {
      setFormData({
        address: !decryptedUserData
          ? (data.userData.address as string)
          : decryptedUserData.address,
        name: !decryptedUserData ? data.userData.name : decryptedUserData.name,
        email: !decryptedUserData
          ? data.userData.email
          : decryptedUserData.email,
        mobile: !decryptedUserData
          ? (data.userData.mobile as string)
          : decryptedUserData.mobile,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.address) {
      newErrors.address = "Địa chỉ là bắt buộc";
    }

    if (!formData.name) {
      newErrors.name = "Họ và tên là bắt buộc";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Số điện thoại là bắt buộc";
    } else if (!(formData.mobile.length === 10)) {
      newErrors.mobile = "Số điện thoại định dạng không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      await updateUserOrder(formData);
    }
  };

  useEffect(() => {
    if (updateUserOrderResult.isSuccess) {
      const encryptedUserData = encryptData(
        formData,
        import.meta.env.VITE_APP_SECRET_KEY
      );
      localStorage.setItem("orderInfo", encryptedUserData);
      navigate("/checkout/payment");
    }
  }, [updateUserOrderResult.isSuccess]);

  useEffect(() => {
    if (updateUserOrderResult.isError) {
      toast.error((updateUserOrderResult.error as any).data.message);
    }
  }, [updateUserOrderResult.isError]);

  return (
    <>
      <div className="flex items-center gap-x-1 mb-7 flex-wrap">
        <div className="flex items-center gap-x-1">
          <Link to="/cart">
            <span className="text-sm text-[#349fe2]">Giỏ hàng</span>
          </Link>
          <span>
            <BiChevronRight size={18} />
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <Link to="/checkout/info">
            <span className="text-sm">Thông tin</span>
          </Link>
          <span>
            <BiChevronRight size={18} />
          </span>
        </div>
        <div className="flex items-center gap-x-1">
          <span className="text-sm text-[#349fe2]">Thanh toán</span>
        </div>
      </div>

      <div className="mb-7">
        <h2 className="text-[17px] font-medium mb-2">Thông tin liên hệ</h2>
        <div className="flex flex-col text-sm gap-y-1 mb-[10px]">
          <span className="">
            {data?.userData.name} ({data?.userData.email})
          </span>
          <span className="text-[#349fe2] underline">Log out</span>
        </div>

        <div className="flex items-center">
          <input
            id="default-checkbox"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 cursor-pointer"
          />
          <label
            htmlFor="default-checkbox"
            className="ml-3 text-sm text-gray-900 cursor-pointer"
          >
            Gửi email cho tôi với các tin tức và ưu đãi
          </label>
        </div>
      </div>

      <div className="mb-[56px]">
        <form onSubmit={handleSubmit}>
          <h2 className="text-[17px] font-medium mb-2">Địa chỉ giao hàng</h2>

          <div className="flex flex-col gap-y-[16px] mb-[27px]">
            <div>
              <input
                type="text"
                placeholder="Địa chỉ"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-[11px] py-[10px] text-sm border-2 ${
                  errors.address ? "border-red-500" : "border-[#e9e9e9]"
                } focus:ring-0 focus:border-[#1773b0] rounded transition-all duration-200 ease-linear`}
              />

              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Họ và tên"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-[11px] py-[10px] text-sm border-2 ${
                  errors.name ? "border-red-500" : "border-[#e9e9e9]"
                } focus:ring-0 focus:border-[#1773b0] rounded transition-all duration-200 ease-linear`}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full px-[11px] py-[10px] text-sm border-2 border-[#e9e9e9] focus:ring-0 focus:border-[#1773b0] rounded transition-all duration-200 ease-linear"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Số điên thoại"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full px-[11px] py-[10px] text-sm border-2 ${
                  errors.mobile ? "border-red-500" : "border-[#e9e9e9]"
                } focus:ring-0 focus:border-[#1773b0] rounded transition-all duration-200 ease-linear`}
              />

              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>
          </div>

          <div className="text-right">
            <button className="px-5 h-12 bg-[#333333] opacity-90 text-white text-sm rounded-md hover:opacity-100">
              <div className="flex items-center gap-x-2">
                <span>Tiếp tục vận chuyển</span>
                {updateUserOrderResult.isLoading && <RotatingSpinner />}
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutInfoPage;
