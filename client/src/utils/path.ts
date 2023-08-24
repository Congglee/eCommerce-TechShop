const path = {
  HOME_PAGE: "/",
  PRODUCT_PAGE: "products",
  PRODUCT_DETAIL_PAGE: ":slug",

  PRODUCT_CATEGORY_PAGE: "category/:category",
  PRODUCT_DETAIL_CATEGORY_PAGE: "category/:category/:slug",

  LOGIN_PAGE: "login",
  REGISTER_PAGE: "register",
  CART_PAGE: "cart",

  CHECKOUT_PAGE: "checkout",
  CHECKOUT_INFO_PAGE: "info",
  CHECKOUT_PAYMENT_PAGE: "payment",
  CHECKOUT_SUCCESS_PAGE: "success",

  PROFILE_PAGE: "profile",
  PROFILE_ORDER_DETAIL_PAGE: "order/:id",
  PROFILE_EDIT_PAGE: "edit",

  ADMIN_DASHBOARD: "admin",
  ADMIN_PRODUCT_PAGE: "products",
  ADMIN_CATEGORY_PAGE: "categories",
  ADMIN_USER_PAGE: "users",
  ADMIN_CREATE_PAGE: "create",
  ADMIN_UPDATE_PAGE: "update",
};

export default path;
