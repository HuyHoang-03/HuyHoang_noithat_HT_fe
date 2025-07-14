import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import PrivateRoute from "../PrivateRoute.jsx";
import PrivateRouteAdmin from "../PrivateRouteAdmin.jsx";
import Login from "../pages/LoginPage.jsx";
import Home from "../pages/clients/HomePage.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import DiscountPage from "../pages/DiscountPage.jsx";
import CustomerPage from "../pages/CustomerPage.jsx";
import WarehousePage from "../pages/WarehousePage.jsx";
import OrderPage from "../pages/OrderPage.jsx";
import LoginPage from "../pages/clients/LoginPage.jsx";
import ProductPageClient from "../pages/clients/ProductPage.jsx";
import DetailProductPage from "../pages/clients/DetailProductPage.jsx";
import CartPage from "../pages/clients/CartPage.jsx";
import OrderUserPage from "../pages/clients/OrderPage.jsx";
import ReportDashboard from "../pages/ReportDashboard.jsx";
import PaymentForm from "../components/clients/order/PaymentForm.jsx";
import ContactPage from "../pages/clients/ContactPage.jsx";
import AboutPage from "../pages/clients/AboutPage.jsx";
import RegisterPage from "../pages/clients/RegisterPage.jsx"
// import UserInfo from "../pages/clients/UserInfo.jsx";


const routers = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <ProductPageClient />,
      },
      {
        path: "products/detail/:id",
        element: <DetailProductPage />,
      },
      // {
      //   path: "/myinfo",
      //   element: <UserInfo />,
      // },
      {
        path: "/cart",
        element: <CartPage />,
        // element: <PrivateRoute element={<CartPage />} />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/aboutus",
        element: <AboutPage />,
      },
      {
        path: "/order",
        element: <OrderUserPage />,
      },
      {
        path: "/order/paymentmomo",
        element: <PaymentForm />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <PrivateRouteAdmin element={<Dashboard />} />,
    children: [
      {
        index: true,
        path: "/admin/products",
        element: <ProductPage />,
      },
      {
        path: "/admin/categories",
        element: <CategoryPage />,
      },
      {
        path: "/admin/discounts",
        element: <DiscountPage />,
      },
      {
        path: "/admin/customers",
        element: <CustomerPage />,
      },
      {
        path: "/admin/warehouse",
        element: <WarehousePage />,
      },
      {
        path: "/admin/orders",
        element: <OrderPage />,
      },
      {
        path: "/admin/report",
        element: <ReportDashboard />,
      },
    ],
  },
]);


export default routers;
