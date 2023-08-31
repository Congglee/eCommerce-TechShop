import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import path from "../../utils/path";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/guest/Breadcrumb/Breadcrumb";

type Props = {};

const FinalRegisterPage = (props: Props) => {
  const { status } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "failed") {
      Swal.fire("Lỗi!", "Đăng ký tài khoản không thành công", "error").then(
        () => {
          navigate(`/${path.LOGIN_PAGE}`);
        }
      );
    }

    if (status === "success") {
      Swal.fire(
        "Thành công!",
        "Đăng ký tài khoản thành công, vui lòng đăng nhập",
        "success"
      ).then(() => {
        navigate(`/${path.LOGIN_PAGE}`);
      });
    }
  }, []);

  return (
    <>
      <div className="bg-[#f7f7f7] py-[15px] mb-5">
        <div className="max-w-[1220px] mx-auto px-5">
          <div>
            <div className="text-[#151515] text-lg font-semibold uppercase mb-[10px]">
              Đăng nhập
            </div>
            <Breadcrumb status={status} />
          </div>
        </div>
      </div>
      <div className="max-w-[1220px] mx-auto h-96 px-5 mb-5 bg-gray-100"></div>
    </>
  );
};

export default FinalRegisterPage;
