import { useNavigate } from "react-router-dom";
import { logout, useAuthDispatch, useAuthState } from "../../contexts/auth/index";

const Dashboard = () => {

  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const {token} = useAuthState();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  }

  return (
    <div>
      Dashboard
      <button onClick={handleLogout}>vete a la mierda</button>
    </div>
  );
}

export default Dashboard;