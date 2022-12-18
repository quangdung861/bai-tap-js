import { useEffect } from "react";
import "./App.css";
import jwtDecode from "jwt-decode";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import { getUserInfoAction } from "./redux/user/actions";

import LoginLayout from "./layouts/LoginLayout";
import RegisterLayout from "./layouts/RegisterLayout";
import LoginPage from "./pages/LoginPage";

import UserLayout from "./layouts/user/UserLayout";
import HomePage from "./pages/user/HomePage";
import RegisterPage from "./pages/user/RegisterPage";
import ProductListPage from "./pages/user/products/ProductListPage";
import ProductDetailPage from "./pages/user/products/ProductDetailPage";
import CartPage from "./pages/user/checkout/CartPage";
import PaymentPage from "./pages/user/checkout/PaymentPage";
import SuccessPage from "./pages/user/checkout/SuccessPage";
import ProfilePage from "./pages/user/account/ProfilePage";
import AddressPage from "./pages/user/account/AddressPage";
import PurchasePage from "./pages/user/account/PurchasePage";
import OrderDetailPage from "./pages/user/account/OrderDetailPage";

import AdminLayout from "./layouts/admin/AdminLayout";
import DashboardPageAdmin from "./pages/admin/DashboardPageAdmin";
import ProductsListPageAdmin from "./pages/admin/products/ProductsListPageAdmin";
import CreateProductsPageAdmin from "./pages/admin/products/CreateProductsPageAdmin";
import UpdateProductPageAdmin from "./pages/admin/products/UpdateProductPageAdmin";
import CustomerPageAdmin from "./pages/admin/CustomerPageAdmin";
import OrderPageAdmin from "./pages/admin/OderPageAdmin";


function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodeUserData = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: decodeUserData.sub }));
    }
  }, []);

  return (
    <div>
      {/* COMMON */}
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>

        <Route element={<RegisterLayout />}>
          <Route path={ROUTES.USER.REGISTER} element={<RegisterPage />} />
        </Route>

        {/* USER */}
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route
            path={ROUTES.USER.PRODUCT_LIST}
            element={<ProductListPage />}
          />
          <Route
            path={ROUTES.USER.PRODUCT_DETAIL}
            element={<ProductDetailPage />}
            ss
          />
          <Route path={ROUTES.USER.CART} element={<CartPage />} />
          <Route path={ROUTES.USER.PAYMENT} element={<PaymentPage />} />
          <Route path={ROUTES.USER.SUCCESS} element={<SuccessPage />} />
          <Route path={ROUTES.USER.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.USER.ADDRESS} element={<AddressPage />} />
          <Route path={ROUTES.USER.PURCHASE} element={<PurchasePage />} />
          <Route path={ROUTES.USER.ORDER_DETAIL} element={<OrderDetailPage />} />
        </Route>

        {/* ADMIN */}
        <Route element={<AdminLayout />}>
          <Route
            path={ROUTES.ADMIN.DASHBOARD}
            element={<DashboardPageAdmin />}
          />
          <Route
            path={ROUTES.ADMIN.PRODUCT_LIST}
            element={<ProductsListPageAdmin />}
          />
          <Route
            path={ROUTES.ADMIN.CREATE_PRODUCT}
            element={<CreateProductsPageAdmin />}
          />
          <Route
            path={ROUTES.ADMIN.UPDATE_PRODUCT}
            element={<UpdateProductPageAdmin />}
          />
          <Route
            path={ROUTES.ADMIN.CUSTOMER_LIST}
            element={<CustomerPageAdmin />}
          />
          <Route path={ROUTES.ADMIN.ORDERS} element={<OrderPageAdmin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
