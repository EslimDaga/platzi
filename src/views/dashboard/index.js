import { Link } from "react-router-dom";
import { FaAngleRight, FaHome } from "react-icons/fa";

const Dashboard = () => {
	return (
		<div className="flex-1 overflow-y-auto w-full">
			<div className="relative pt-8">
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
									to="/dashboard"
									className="text-gray-700 dark:text-white text-base font-urbanist font-semibold hover:text-gray-900 ml-1 md:ml-2"
								>
									Dashboard
								</Link>
							</div>
						</li>
					</ol>
				</nav>
			</div>
			<div className="relative bg-lightBlue-600 pt-8">
				<div className="mx-auto w-full">
					<div>
						<div className="flex flex-wrap">
							<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
								<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
									<div className="flex-auto p-4">
										<div className="flex flex-wrap">
											<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
												<h5 className="text-blueGray-400 uppercase font-bold text-xs">
													TRAFFIC
												</h5>
												<span className="font-semibold text-xl text-blueGray-700">
													350,897
												</span>
											</div>
											<div className="relative w-auto pl-4 flex-initial">
												<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
													<i className="far fa-chart-bar"></i>
												</div>
											</div>
										</div>
										<p className="text-sm text-blueGray-400 mt-4">
											<span className="text-emerald-500 mr-2">
												<i className="fas fa-arrow-up"></i> 3.48%
											</span>
											<span className="whitespace-nowrap">
												Since last month
											</span>
										</p>
									</div>
								</div>
							</div>
							<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
								<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
									<div className="flex-auto p-4">
										<div className="flex flex-wrap">
											<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
												<h5 className="text-blueGray-400 uppercase font-bold text-xs">
													NEW USERS
												</h5>
												<span className="font-semibold text-xl text-blueGray-700">
													2,356
												</span>
											</div>
											<div className="relative w-auto pl-4 flex-initial">
												<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
													<i className="fas fa-chart-pie"></i>
												</div>
											</div>
										</div>
										<p className="text-sm text-blueGray-400 mt-4">
											<span className="text-red-500 mr-2">
												<i className="fas fa-arrow-down"></i> 3.48%
											</span>
											<span className="whitespace-nowrap">Since last week</span>
										</p>
									</div>
								</div>
							</div>
							<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
								<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
									<div className="flex-auto p-4">
										<div className="flex flex-wrap">
											<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
												<h5 className="text-blueGray-400 uppercase font-bold text-xs">
													SALES
												</h5>
												<span className="font-semibold text-xl text-blueGray-700">
													924
												</span>
											</div>
											<div className="relative w-auto pl-4 flex-initial">
												<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
													<i className="fas fa-users"></i>
												</div>
											</div>
										</div>
										<p className="text-sm text-blueGray-400 mt-4">
											<span className="text-orange-500 mr-2">
												<i className="fas fa-arrow-down"></i> 1.10%
											</span>
											<span className="whitespace-nowrap">Since yesterday</span>
										</p>
									</div>
								</div>
							</div>
							<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
								<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
									<div className="flex-auto p-4">
										<div className="flex flex-wrap">
											<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
												<h5 className="text-blueGray-400 uppercase font-bold text-xs">
													PERFORMANCE
												</h5>
												<span className="font-semibold text-xl text-blueGray-700">
													49,65%
												</span>
											</div>
											<div className="relative w-auto pl-4 flex-initial">
												<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">
													<i className="fas fa-percent"></i>
												</div>
											</div>
										</div>
										<p className="text-sm text-blueGray-400 mt-4">
											<span className="text-emerald-500 mr-2">
												<i className="fas fa-arrow-up"></i> 12%
											</span>
											<span className="whitespace-nowrap">
												Since last month
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
