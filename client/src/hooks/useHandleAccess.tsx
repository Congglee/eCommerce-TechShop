import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useAccessDeniedHandler = () => {
  const navigate = useNavigate();

  const handleAccessDenied = async () => {
    try {
      const result = await Swal.fire({
        title: "Truy cập bị từ chối",
        text: "Vui lòng đăng nhập để truy cập trang này.",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
      });

      if (result.isConfirmed) {
        navigate("/login");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return handleAccessDenied;
};

const useRoleAccessDeniedHandler = () => {
  const navigate = useNavigate();

  const handleAccessDenied = async () => {
    try {
      await Swal.fire({
        title: "Bạn có không có quyền để truy cập trang này",
        text: "Vui lòng quay lại trang chủ",
        icon: "error",
        confirmButtonText: "Quay lại",
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return handleAccessDenied;
};

export { useAccessDeniedHandler, useRoleAccessDeniedHandler };
