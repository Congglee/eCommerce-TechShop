import { Route, Routes } from "react-router-dom";
import { AdminLayout, ClientLayout } from "./layouts";
import {
  CategoryManagePage,
  CreateCategory,
  CreateProduct,
  CreateUser,
  Dashboard,
  ProductManagePage,
  UpdateCategory,
  UpdateProduct,
  UpdateUser,
  UserManagePage,
} from "./pages/admin";
import {
  HomePage,
  ProductDetailPage,
  ProductPage,
  RegisterPage,
  LoginPage,
} from "./pages/user";
import path from "./utils/path";

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
          <Route path={path.LOGIN_PAGE} element={<LoginPage />} />
          <Route path={path.REGISTER_PAGE} element={<RegisterPage />} />
        </Route>

        <Route path={path.ADMIN_DASHBOARD} element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path={path.ADMIN_PRODUCT_PAGE}>
            <Route index element={<ProductManagePage />} />
            <Route path={path.ADMIN_CREATE_PAGE} element={<CreateProduct />} />
            <Route path={path.ADMIN_UPDATE_PAGE} element={<UpdateProduct />} />
          </Route>
          <Route path={path.ADMIN_CATEGORY_PAGE}>
            <Route index element={<CategoryManagePage />} />
            <Route path={path.ADMIN_CREATE_PAGE} element={<CreateCategory />} />
            <Route path={path.ADMIN_UPDATE_PAGE} element={<UpdateCategory />} />
          </Route>
          <Route path={path.ADMIN_USER_PAGE}>
            <Route index element={<UserManagePage />} />
            <Route path={path.ADMIN_CREATE_PAGE} element={<CreateUser />} />
            <Route path={path.ADMIN_UPDATE_PAGE} element={<UpdateUser />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
