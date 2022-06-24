import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth/context";
import routes from "./routes/index";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </AuthProvider>
  );
}

export default App;