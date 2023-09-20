import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { LoadingToRedirect } from "..";

const ProtectedRoute = ({ children }: { children: any }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  return token ? (
    children
  ) : (
    <LoadingToRedirect
      title="Vui lòng đăng nhập để truy cập trang này"
      text="Chuyền đến trang đăng nhập trong"
    />
  );
};

export default ProtectedRoute;
