import { useLocation } from "react-router-dom";
import Header from "../components/app/Header";

const Layout = props => {
	let location = useLocation();
	return (
		<>
			{location.pathname === "/login" || location.pathname === "/register" ? (
				props.children
			) : (
				<main className="bg-gray-100 dark:bg-[#282b42] h-screen flex flex-col">
					<Header />
					{props.children}
				</main>
			)}
		</>
	);
};

export default Layout;
