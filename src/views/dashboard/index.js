import { Popover, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { logout, useAuthDispatch } from "../../contexts/auth/index";
import { FaArrowDown, FaBars, FaChartBar, FaHamburger, FaICursor, FaMarkdown, FaPhone, FaPlay, FaSupple, FaTimes } from "react-icons/fa";
import { Fragment } from "react";

const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: FaChartBar,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: FaICursor,
  }
];
const callsToAction = [
  { name: "Watch Demo", href: "#", icon: FaPlay },
  { name: "Contact Sales", href: "#", icon: FaPhone },
];
const resources = [
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
    icon: FaSupple,
  },
];
const recentPosts = [
  { id: 1, name: "Boost your conversion rate", href: "#" },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
  },
  { id: 3, name: "Improve your customer experience", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard = () => {

  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  }

  return (
    <Popover className="relative bg-white dark:bg-gray-900 shadow-xl">
      <div className="w-full mx-auto px-6 sm:px-6">
        <div className="flex justify-between items-center py-5 md:space-x-10">
          <div className="flex justify-start">
            <Link to="#">
              <span className="sr-only">platzi logo</span>
              <figure>
                <img
                  src="https://static.platzi.com/media/platzi-isotipo@2x.png"
                  alt="Platzi logo"
                  className="m-auto"
                  width={40}
                />
              </figure>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Link
              to="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Pricing
            </Link>
            <Link
              to="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Docs
            </Link>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link
              to="#"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link
              to="#"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </Link>
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
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
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
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <FaTimes className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link
                  to="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Pricing
                </Link>

                <Link
                  to="#"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Docs
                </Link>
              </div>
              <div>
                <Link
                  to="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Dashboard;