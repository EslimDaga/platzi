import Toggle from "./../../components/darkmode/ThemeToggleGeneral";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { logout, useAuthDispatch } from "../../contexts/auth";
import { Link, useNavigate } from "react-router-dom";
import {
	FaBars,
	FaBoxes,
	FaBoxOpen,
	FaDoorClosed,
	FaHome,
	FaIdCard,
	FaMoon,
	FaSignOutAlt,
	FaTimes,
	FaUserCircle,
	FaUsers,
} from "react-icons/fa";

const navigation = {
	pages: [
		{ name: "Dashboard", href: "/dashboard", icon: FaHome },
		{ name: "Productos", href: "/products", icon: FaBoxes },
		{ name: "Categorías", href: "/categories", icon: FaBoxOpen },
		{ name: "Usuarios", href: "/users", icon: FaUsers },
	],
};

const Header = () => {
	const dispatch = useAuthDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout(dispatch);
		navigate("/login");
	};
	return (
		<Popover className="relative bg-white dark:bg-[#181B32] shadow-xl">
			<div className="w-full mx-auto px-6 sm:px-6">
				<div className="flex justify-between items-center py-4 md:space-x-10">
					<div className="flex justify-start">
						<a href="/">
							<span className="sr-only">Logo Platzi</span>
							<figure>
								<img
									src="https://static.platzi.com/media/platzi-isotipo@2x.png"
									alt="Platzi logo"
									className="m-auto"
									width={40}
								/>
							</figure>
						</a>
					</div>
					<div className="-mr-2 -my-2 lg:hidden">
						<Popover.Button className="bg-white dark:bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 dark:text-gray-300 hover:text-gray-500 hover:bg-gray-100">
							<span className="sr-only">Open menu</span>
							<FaBars className="h-7 w-7" aria-hidden="true" />
						</Popover.Button>
					</div>
					<div className="hidden sm:hidden lg:flex items-center justify-end md:flex-1 lg:w-0">
						<Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
							<div className="h-full flex space-x-8">
								{navigation.pages.map(page => (
									<Link
										key={page.name}
										to={page.href}
										className="flex items-center font-urbanist font-bold text-base text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
									>
										{page.name}
									</Link>
								))}
							</div>
						</Popover.Group>
						<Menu as="div" className="ml-10 relative">
							<div>
								<Menu.Button className="bg-white flex text-sm rounded-full">
									<span className="sr-only">Open user menu</span>
									<FaUserCircle className="w-8 h-8 rounded-full text-gray-900 dark:text-gray-500" />
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
									<Menu.Item className="p-3 flex text-gray-900 dark:text-white font-urbanist font-bold text-base items-center">
										<a href="/" className="">
											<FaIdCard className="w-6 h-6 mr-2 text-gray-900 dark:text-white" />{" "}
											Mi perfil
										</a>
									</Menu.Item>
									<Menu.Item className="p-3 flex text-gray-900 dark:text-white font-urbanist font-bold text-base items-center">
										<button onClick={handleLogout}>
											<FaSignOutAlt className="w-6 h-6 mr-2 text-gray-900 dark:text-white" />{" "}
											Cerrar Sesión
										</button>
									</Menu.Item>
									<div className="p-3 flex text-gray-900 dark:text-white font-urbanist font-bold text-base items-center justify-between">
										<div className="flex">
											<FaMoon className="w-6 h-6 mr-2 text-gray-900 dark:text-white" />{" "}
											Modo Nocturno
										</div>
										<Toggle />
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>
			</div>
			<Transition
				as={Fragment}
				enter="duration-200 ease-out"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="duration-100 ease-in"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<Popover.Panel
					focus
					className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden z-10"
				>
					<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 divide-y-2 divide-gray-50 dark:divide-gray-700">
						<div className="pt-5 pb-6 px-5">
							<div className="flex items-center justify-between">
								<div>
									<figure>
										<img
											src="https://static.platzi.com/media/platzi-isotipo@2x.png"
											alt="Platzi logo"
											className="m-auto"
											width={40}
										/>
									</figure>
								</div>
								<div className="-mr-2">
									<Popover.Button className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
										<span className="sr-only">Close menu</span>
										<FaTimes className="h-6 w-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
							<div className="mt-6">
								<nav className="grid gap-y-2">
									{navigation.pages.map(item => (
										<Link
											key={item.name}
											to={item.href}
											className="flex w-full py-4 font-urbanist font-bold text-base text-left text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 bg-white dark:bg-gray-800 rounded-lg "
										>
											<item.icon className="w-5 h-5 mr-2" />
											<span>{item.name}</span>
										</Link>
									))}
									<div className="py-4 flex text-gray-500 dark:text-gray-300 font-urbanist font-bold text-base items-center justify-between">
										<div className="flex">
											<FaMoon className="w-6 h-6 mr-2 text-gray-500 dark:text-gray-300" />
											Modo Nocturno
										</div>
										<Toggle />
									</div>
								</nav>
							</div>
						</div>
						<div className="py-6 px-5 space-y-6">
							<div className="flex">
								<a
									href="/"
									className="w-full flex items-center justify-center px-4 mx-2 py-2 border border-transparent rounded-md shadow-sm font-urbanist font-bold text-base text-white bg-blue-600 hover:bg-blue-500"
								>
									<FaUserCircle className="w-4 h-4 mr-1" />
									Mi perfil
								</a>
								<button
									onClick={handleLogout}
									className="w-full flex items-center justify-center px-4 mx-2 py-2 border border-transparent rounded-md shadow-sm font-urbanist font-bold text-base text-white bg-blue-600 hover:bg-blue-500"
								>
									<FaDoorClosed className="w-4 h-4 mr-1" />
									Cerrar Sesión
								</button>
							</div>
						</div>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};

export default Header;
