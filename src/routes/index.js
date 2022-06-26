import { Navigate } from "react-router-dom";
import Login from "../views/auth/Login";
import Dashboard from "../views/dashboard/index";

const routes = [
  {
    path: "/",
    component: <Navigate to="/login" />,
    isPrivate: false
  },
  {
    path: "/login",
    component: <Login />,
    isPrivate: false
  },{
    path: "/dashboard",
    component: <Dashboard />,
    isPrivate: true
  }
];

export default routes;