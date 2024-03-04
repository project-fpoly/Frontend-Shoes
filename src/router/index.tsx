import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/Mainlayout";
import Home from "../pages/Home";
import SigninPage from "../pages/client/signin";
import SignupPage from "../pages/client/signup";
import Cart from "../pages/Cart";
import Guest_Checkout from "../pages/Guest_Checkout";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/Admin";
import UserManager from "../pages/Admin/Users";
import CommentManager from "../pages/Admin/Comment";
import CategoriesManager from "../pages/Admin/Categories";
import ProductsManager from "../pages/Admin/Products";
import OrderManager from "../pages/Admin/Order";
import NotificationsAdmin from "../pages/Admin/Notification";
import Password from "../pages/client/password";
import GreaUp from "../pages/GreaUp";
import DetailShoe from "../pages/Detail";
import SizeGuide from "../pages/SizeGuide";
import ResetPassword from "../pages/client/reset-password.tsx";
import ForgotPassword from "../pages/client/forgotpassword/ForgotPassword.tsx";
import VerifyEmail from "../pages/client/verify-email";


const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/greaup" element={<GreaUp />} />
          <Route path="/detail/:id" element={<DetailShoe />} />
          <Route path="/sizeguide" element={<SizeGuide />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/guest_checkout" element={<Guest_Checkout />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManager />} />
          <Route path="/admin/product" element={<ProductsManager />} />
          <Route path="/admin/categories" element={<CategoriesManager />} />
          <Route path="/admin/comment" element={<CommentManager />} />
          <Route path="/admin/orders" element={<OrderManager />} />
          <Route path="/admin/notification/:id" element={<NotificationsAdmin />} />
        </Route>

        <Route path="signin" element={<SigninPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
        <Route path="password" element={<Password />}></Route>
        <Route path="reset-password" element={<ResetPassword />}></Route>
        <Route path="forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="verify-email" element={<VerifyEmail />}></Route>
      </Routes>
    </>
  );
};

export default Router;
