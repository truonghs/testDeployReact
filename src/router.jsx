import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  Register,
  Login,
  Dashboard,
  AddProduct,
  ViewProduct,
  ProductDetail,
  EditProduct,
  Profile,
  UpdateProfile,
  UserAccount,
  Message,
  Order,
  Home,
  OrderClient,
  Cart,
  Favourite,
  ViewOrder,
  Shop,
  View1Product,
  AboutUs,
  Checkout,
  SearchResult,
  Contact,
  UserProfile,
  UpdateUserProfile
} from "./pages";

import { DefaultLayout, GuestLayout, AdminLayout } from "./layouts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Navigate to="/" />,
      },
      {
        path: "/order",
        element: <OrderClient />,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
      {
        path: "/favourite",
        element: <Favourite/>,
      },
      {
        path: "/order/vieworder/:id",
        element: <ViewOrder/>,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/view1product/:productId",
        element: <View1Product />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/searchresult",
        element: <SearchResult />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/profile/updateprofile",
        element: <UpdateUserProfile />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin/login",
        element: <Login />,
      },
      {
        path: "/admin/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin",
        element: <Navigate to="/admin/dashboard" />,
      },
      {
        path: "/admin/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/admin/viewproduct",
        element: <ViewProduct />,
      },
      {
        path: "/admin/productdetail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/admin/editproduct/:id",
        element: <EditProduct />,
      },
      {
        path: "/admin/profile",
        element: <Profile />,
      },
      {
        path: "/admin/updateprofile",
        element: <UpdateProfile />,
      },
      {
        path: "/admin/useraccount",
        element: <UserAccount />,
      },
      {
        path: "/admin/message",
        element: <Message />,
      },
      {
        path: "/admin/order",
        element: <Order />,
      },
     
    ],
  },
 
]);

export default router;
