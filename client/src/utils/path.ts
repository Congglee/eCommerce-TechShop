const path = {
  HOME_PAGE: "/",
  PRODUCT_PAGE: "products",
  PRODUCT_DETAIL_PAGE: ":slug",

  PRODUCT_CATEGORY_PAGE: "category/:category",
  PRODUCT_DETAIL_CATEGORY_PAGE: "category/:category/:slug",

  LOGIN_PAGE: "login",
  REGISTER_PAGE: "register",
  FINAL_REGISTER_PAGE: "finalregister/:status",
  FORGOT_PASSWORD_PAGE: "forgotpassword",
  RESET_PASSWORD_PAGE: "resetpassword/:token",

  CART_PAGE: "cart",
  CHECKOUT_PAGE: "checkout",
  CHECKOUT_INFO_PAGE: "info",
  CHECKOUT_PAYMENT_PAGE: "payment",
  CHECKOUT_SUCCESS_PAGE: "success",

  PROFILE_PAGE: "profile",
  PROFILE_ORDER_DETAIL_PAGE: "order/:id",
  PROFILE_EDIT_PAGE: "edit",

  NOT_FOUND_PAGE: "*",

  ADMIN_DASHBOARD: "admin",
  ADMIN_PRODUCT_PAGE: "products",
  ADMIN_CATEGORY_PAGE: "categories",
  ADMIN_USER_PAGE: "users",
  ADMIN_ORDER_PAGE: "orders",

  ADMIN_CREATE_PAGE: "create",
  ADMIN_UPDATE_PAGE: "update/:id",
};

export default path;
