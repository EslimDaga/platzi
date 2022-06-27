import { Navigate } from "react-router-dom";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Categories from "../views/categories";
import Dashboard from "../views/dashboard/index";
import Products from "../views/products";
import Users from "../views/users";

const routes = [
  {
    path: "/",
    component: <Navigate to="/login" />,
    isPrivate: false,
  },
  {
    path: "/login",
    component: <Login />,
    isPrivate: false,
  },
  {
    path: "/register",
    component: <Register />,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
    isPrivate: true,
  },
  {
    path: "/products",
    component: <Products />,
    isPrivate: true,
  },
  {
    path: "/categories",
    component: <Categories />,
    isPrivate: true,
  },
  {
    path: "/users",
    component: <Users />,
    isPrivate: true,
  },
];

export default routes;