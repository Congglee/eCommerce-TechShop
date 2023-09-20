import { Route, Routes } from "react-router-dom";
import {
  AdminLayout,
  CheckoutLayout,
  ClientLayout,
  ProfileLayout,
} from "./layouts";
import {
  BrandManagePage,
  CategoryManagePage,
  CreateBrandPage,
  CreateCategoryPage,
  CreateProductPage,
  DashboardPage,
  ProductManagePage,
  UpdateBrandPage,
  UpdateCategoryPage,
  UpdateProductPage,
  UpdateUserPage,
  UserManagePage,
} from "./pages/admin";
import {
  CartPage,
  CheckoutInfoPage,
  CheckoutPaymentPage,
  CheckoutSuccessPage,
  FinalRegisterPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProductDetailPage,
  ProductPage,
  ProfileOrderDetailPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from "./pages/guest";
import path from "./utils/path";
import ProfileEditPage from "./pages/guest/ProfileEditPage";
import OrderManagePage from "./pages/admin/orders/OrderManagePage";
import UpdateOrderPage from "./pages/admin/orders/UpdateOrderPage";
import { AdminRoute, ProtectedRoute } from "./components/common";

function App() {
  return (
    <>
      <Routes>
        <Route path={path.HOME_PAGE} element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path={path.PRODUCT_PAGE}>
            <Route index element={<ProductPage />} />
            <Route
              path={path.PRODUCT_DETAIL_PAGE}
              element={<ProductDetailPage />}
            />
          </Route>
          <Route path={path.PRODUCT_CATEGORY_PAGE} element={<ProductPage />} />
          <Route
            path={path.PRODUCT_DETAIL_CATEGORY_PAGE}
            element={<ProductDetailPage />}
          />
          <Route path={path.LOGIN_PAGE} element={<LoginPage />} />
          <Route path={path.REGISTER_PAGE} element={<RegisterPage />} />
          <Route
            path={path.FINAL_REGISTER_PAGE}
            element={<FinalRegisterPage />}
          />
          <Route
            path={path.FORGOT_PASSWORD_PAGE}
            element={<ForgotPasswordPage />}
          />
          <Route
            path={path.RESET_PASSWORD_PAGE}
            element={<ResetPasswordPage />}
          />
          <Route path={path.CART_PAGE} element={<CartPage />} />

          <Route
            path={path.PROFILE_PAGE}
            element={
              <ProtectedRoute>
                <ProfileLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path={path.PROFILE_PAGE} element={<ProfilePage />} />
            <Route
              path={path.PROFILE_ORDER_DETAIL_PAGE}
              element={<ProfileOrderDetailPage />}
            />
            <Route
              path={path.PROFILE_EDIT_PAGE}
              element={<ProfileEditPage />}
            />
          </Route>
        </Route>

        <Route
          path={path.CHECKOUT_PAGE}
          element={
            <ProtectedRoute>
              <CheckoutLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CheckoutInfoPage />} />
          <Route
            path={path.CHECKOUT_INFO_PAGE}
            element={<CheckoutInfoPage />}
          />
          <Route
            path={path.CHECKOUT_PAYMENT_PAGE}
            element={<CheckoutPaymentPage />}
          />
          <Route
            path={path.CHECKOUT_SUCCESS_PAGE}
            element={<CheckoutSuccessPage />}
          />
        </Route>

        <Route
          path={path.ADMIN_DASHBOARD}
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path={path.ADMIN_PRODUCT_PAGE}>
            <Route index element={<ProductManagePage />} />
            <Route
              path={path.ADMIN_CREATE_PAGE}
              element={<CreateProductPage />}
            />
            <Route
              path={path.ADMIN_UPDATE_PAGE}
              element={<UpdateProductPage />}
            />
          </Route>
          <Route path={path.ADMIN_CATEGORY_PAGE}>
            <Route index element={<CategoryManagePage />} />
            <Route
              path={path.ADMIN_CREATE_PAGE}
              element={<CreateCategoryPage />}
            />
            <Route
              path={path.ADMIN_UPDATE_PAGE}
              element={<UpdateCategoryPage />}
            />
          </Route>
          <Route path={path.ADMIN_BRAND_PAGE}>
            <Route index element={<BrandManagePage />} />
            <Route
              path={path.ADMIN_CREATE_PAGE}
              element={<CreateBrandPage />}
            />
            <Route
              path={path.ADMIN_UPDATE_PAGE}
              element={<UpdateBrandPage />}
            />
          </Route>
          <Route path={path.ADMIN_USER_PAGE}>
            <Route index element={<UserManagePage />} />
            <Route path={path.ADMIN_UPDATE_PAGE} element={<UpdateUserPage />} />
          </Route>
          <Route path={path.ADMIN_ORDER_PAGE}>
            <Route index element={<OrderManagePage />} />
            <Route
              path={path.ADMIN_UPDATE_PAGE}
              element={<UpdateOrderPage />}
            />
          </Route>
        </Route>

        <Route path={path.NOT_FOUND_PAGE} element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
