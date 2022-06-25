import Login from "../views/auth/Login";
import Dashboard from "../views/dashboard/index";

const routes = [
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