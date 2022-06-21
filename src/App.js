import { Route, Routes } from "react-router-dom";
import AuthLogin from "./views/auth/index";

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<AuthLogin />} />
      </Routes>
  );
}

export default App;