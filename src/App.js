import { Route, Routes } from "react-router-dom";
import routes from "./routes/index";

const App = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.component}
        />
      ))}
    </Routes>
  );
}

export default App;