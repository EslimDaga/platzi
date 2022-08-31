import { FaAngleRight, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Breadcumb = ({ link, title }) => {
	return (
		<div className="relative">
			<nav className="flex px-4" aria-label="Breadcrumb">
				<ol className="inline-flex items-center space-x-1 md:space-x-3">
					<li className="inline-flex items-center">
						<Link
							to="/dashboard"
							className="text-gray-700 dark:text-white text-base font-urbanist font-semibold hover:text-gray-900 inline-flex items-center"
						>
							<FaHome />
						</Link>
					</li>
					<li className="ml-2">
						<div className="flex items-center">
							<FaAngleRight className="text-gray-700 dark:text-white" />
							<Link
								to={`/` + link}
								className="text-gray-700 dark:text-white text-base font-urbanist font-semibold hover:text-gray-900 ml-1 md:ml-2"
							>
								{title}
							</Link>
						</div>
					</li>
				</ol>
			</nav>
		</div>
	);
};

export default Breadcumb;
