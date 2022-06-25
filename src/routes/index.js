import Login from "../views/auth/Login";
import Dashboard from "../views/dashboard/index";

const routes = [
  {
    path: "/login",
    component: <Login />
  },{
    path: "/dashboard",
    component: <Dashboard />
  }
];

export default routes;