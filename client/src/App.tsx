import { Route, Routes } from "react-router-dom";
import {
  AdminLayout,
  CheckoutLayout,
  ClientLayout,
  ProfileLayout,
} from "./layouts";
import {
  CategoryManagePage,
  CreateCategoryPage,
  CreateProductPage,
  DashboardPage,
  ProductManagePage,
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
  HomePage,
  LoginPage,
  ProductDetailPage,
  ProductPage,
  ProfileOrderDetailPage,
  ProfilePage,
  RegisterPage,
} from "./pages/guest";
import path from "./utils/path";
import ProfileEditPage from "./pages/guest/ProfileEditPage";

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
          <Route path={path.CART_PAGE} element={<CartPage />} />

          <Route path={path.PROFILE_PAGE} element={<ProfileLayout />}>
            <Route index element={<ProfilePage />} />
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

        <Route path={path.CHECKOUT_PAGE} element={<CheckoutLayout />}>
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

        <Route path={path.ADMIN_DASHBOARD} element={<AdminLayout />}>
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
          <Route path={path.ADMIN_USER_PAGE}>
            <Route index element={<UserManagePage />} />
            <Route path={path.ADMIN_UPDATE_PAGE} element={<UpdateUserPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
