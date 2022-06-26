import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const isAuth = localStorage.getItem("currentToken");
  return isAuth;
};

const PublicRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;