import { createBrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import App from "../App";
import { Home } from "../pages/home/Home";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { CartPage } from "../pages/plants/CartPage";
import { CheckoutPage } from "../pages/plants/CheckoutPage";
import { SinglePlant } from "../pages/plants/SinglePlant";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/plants/OrderPage";
import AdminLogin from "../components/AdminLogin";
import AdminRoute from "./AdminRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import AddPlant from "../pages/dashboard/addPlant/AddPlant";
import ManagePlants from "../pages/dashboard/managePlants/ManagePlants";
import UpdatePlant from "../pages/dashboard/editPlant/UpdatePlant";
import UserDashboard from "../pages/dashboard/users/UserDashboard";


const ScrollToTopWrapper = ({ children }) => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);
  
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ScrollToTopWrapper><App /></ScrollToTopWrapper>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: <PrivateRoute><OrderPage /></PrivateRoute>,
      },
      {
        path: "/about",
        element: <div>TODO - About</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <PrivateRoute><CheckoutPage /></PrivateRoute>,
      },
      {
        path: "/plants/:id",
        element: <SinglePlant />,
      },
      {
        path: "/user-dashboard",
        element: <PrivateRoute><UserDashboard /></PrivateRoute>,
      },
    ],
  },
  {
    path: "/admin",
    element: <ScrollToTopWrapper><AdminLogin /></ScrollToTopWrapper>,
  },
  {
    path: "/dashboard",
    element: 
      <ScrollToTopWrapper>
        <AdminRoute>
        <DashboardLayout />
        </AdminRoute>
      </ScrollToTopWrapper>,
    children: [
      {
        path: "",
        element: <AdminRoute><Dashboard /></AdminRoute>,
      },
      {
        path: "add-new-plant",
        element: <AdminRoute>
          <AddPlant />
        </AdminRoute>,
      },
      {
        path: "edit-plant/:id",
        element: <AdminRoute>
          <UpdatePlant />
        </AdminRoute>,
      },
      {
        path: "manage-plants",
        element: <AdminRoute>
          <ManagePlants />
        </AdminRoute>,
      },
    ],
  },
]);

export default router;
