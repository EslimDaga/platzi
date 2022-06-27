import { useLocation } from "react-router-dom";
import Header from "../components/app/Header";

const Layout = (props) => {
  let location = useLocation();
  console.log(location);
  return (
    <>
      {location.pathname === "/login" || location.pathname === "/register" ? (
        props.children
      ) : (
        <>
          <Header />
          {props.children}
        </>
      )}
    </>
  );
}

export default Layout;