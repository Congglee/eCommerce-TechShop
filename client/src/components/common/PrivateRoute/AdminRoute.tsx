import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import jwt_decode from "jwt-decode";
import { LoadingToRedirect } from "..";

const PrivateRoute = ({ children }: { children: any }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  let isAdmin: boolean = false;

  if (token) {
    const decodedToken = jwt_decode(token) as { isAdmin: boolean };
    isAdmin = decodedToken.isAdmin;
  }

  return isAdmin ? (
    children
  ) : (
    <LoadingToRedirect
      title="Bạn không có quyền để truy cập trang này"
      text="Chuyển về trang chủ trong"
      isAdmin
    />
  );
};

export default PrivateRoute;
