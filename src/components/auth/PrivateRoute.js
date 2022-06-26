import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const auth = localStorage.getItem("currentToken");
  return auth;
};

const PrivateRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
