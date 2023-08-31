import React from "react";
import icons from "../../../utils/icons";
import { IProduct } from "../../../interfaces/product.interface";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import { ICategory } from "../../../interfaces/category.interface";
import { IOrder } from "../../../interfaces/order.interface";

const { BiChevronRight } = icons;

type Props = {};

interface breadCrumbProps {
  product?: IProduct;
  order?: IOrder;
  status?: string;
}

const Breadcrumb = (props: breadCrumbProps) => {
  const { product, order, status } = props;

  const routes = [
    { path: "/:slug", breadcrumb: product?.name },
    { path: "/", breadcrumb: "Trang chủ" },
    { path: "/products", breadcrumb: "Sản phẩm" },
    { path: "/category", breadcrumb: "Danh mục" },
    { path: ":category", breadcrumb: (product?.categoryId as ICategory)?.name },
    { path: "/profile", breadcrumb: "Tài khoản" },
    { path: "/profile/order", breadcrumb: "Đơn hàng" },
    { path: "/profile/order/:id", breadcrumb: `DW2${order?._id}` },
    { path: "/profile/edit", breadcrumb: "Cập nhật tài khoản" },
    { path: "/cart", breadcrumb: "Giỏ hàng" },
    { path: "/login", breadcrumb: "Đăng nhập" },
    { path: "/register", breadcrumb: "Đăng ký" },
    { path: "/finalregister", breadcrumb: "Đăng ký" },
    {
      path: "/finalregister/:status",
      breadcrumb: `${
        status === "success"
          ? "Đăng ký tài khoản thành công"
          : "Đăng ký tài khoản thất bại"
      }`,
    },
    { path: "/forgotpassword", breadcrumb: "Quên mật khẩu" },
    { path: "/resetpassword", breadcrumb: "Đổi mật khẩu" },
    { path: "/resetpassword/:token", breadcrumb: "" },
  ];

  const breadcrumb = useBreadcrumbs(routes);

  return (
    <div className="flex flex-wrap items-center text-sm text-[#1c1d1d] gap-x-1">
      {breadcrumb
        // ?.filter((item) => !item.match.route === false)
        .map(({ match, breadcrumb }, index, self) => {
          return match.route?.path !== "/resetpassword/:token" ? (
            <Link
              key={match.pathname}
              to={
                match.pathname === "/category" || "/resetpassword"
                  ? "#"
                  : match.pathname
              }
            >
              <div className="flex gap-x-1 items-center">
                <span className="hover:text-main-200 capitalize">
                  {breadcrumb}
                </span>
                {index !== self.length - 1 && <BiChevronRight size={14} />}
              </div>
            </Link>
          ) : (
            ""
          );
        })}
    </div>
  );
};

export default Breadcrumb;
