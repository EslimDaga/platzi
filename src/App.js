import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import routes from "./routes/index";

const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute/>}>
        {routes.map((route) => {
          return (
            route.isPrivate && (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            )
          );
        })}
      </Route>
      <Route element={<PublicRoute/>}>
        {routes.map((route) => {
          return (
            !route.isPrivate && (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            )
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;