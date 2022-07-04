import { Link } from "react-router-dom";
import {
	FaAngleRight,
	FaBoxes,
	FaBoxOpen,
	FaHome,
	FaMoneyBillAlt,
	FaMoneyCheckAlt,
	FaUsers,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

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
						<Swiper
							slidesPerView={1}
							spaceBetween={5}
							freeMode={true}
							modules={[FreeMode, Pagination]}
							className="mySwiper cursor-grab pb-10"
							pagination={{
								clickable: true,
								currentClass: "d-none",
							}}
							breakpoints={{
								640: {
									slidesPerView: 1,
									spaceBetween: 20,
								},
								768: {
									slidesPerView: 2,
									spaceBetween: 20,
								},
								1024: {
									slidesPerView: 3,
									spaceBetween: 20,
								},
								1440: {
									slidesPerView: 4,
									spaceBetween: 20,
								},
							}}
						>
							<SwiperSlide>
								<div className="w-full px-4">
									<div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#181B32] rounded-xl mb-6 xl:mb-0 shadow-xl">
										<div className="flex-auto p-4">
											<div className="flex flex-wrap">
												<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
													<h5 className="text-gray-700 dark:text-white font-urbanist font-bold text-lg">
														Productos
													</h5>
												</div>
												<div className="relative w-auto pl-4 flex-initial">
													<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#98ca3f]">
														<FaBoxes className="w-5" />
													</div>
												</div>
											</div>
											<span className="text-gray-700 dark:text-white font-urbanist font-bold text-lg">
												190
											</span>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="w-full px-4">
									<div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#181B32] rounded-xl mb-6 xl:mb-0 shadow-xl">
										<div className="flex-auto p-4">
											<div className="flex flex-wrap">
												<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
													<h5 className="text-gray-700 dark:text-white font-urbanist font-bold text-lg">
														Categorías
													</h5>
												</div>
												<div className="relative w-auto pl-4 flex-initial">
													<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#98ca3f]">
														<FaBoxOpen className="w-5" />
													</div>
												</div>
											</div>
											<span className="text-gray-700 dark:text-white font-urbanist font-bold text-lg">
												12
											</span>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="w-full px-4">
									<div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#181B32] rounded-xl mb-6 xl:mb-0 shadow-lg">
										<div className="flex-auto p-4">
											<div className="flex flex-wrap">
												<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
													<h5 className="text-gray-700 dark:text-white font-urbanist font-bold text-lg">
														Usuarios
													</h5>
												</div>
												<div className="relative w-auto pl-4 flex-initial">
													<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#98ca3f]">
														<FaUsers className="w-6" />
													</div>
												</div>
											</div>
											<span className="text-gray-700 dark:text-white font-urbanist font-bold text-lg">
												10
											</span>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="w-full px-4">
									<div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#181B32] rounded-xl mb-6 xl:mb-0 shadow-lg">
										<div className="flex-auto p-4">
											<div className="flex flex-wrap">
												<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
													<h5 className="text-gray-700 dark:text-white font-urbanist font-bold text-lg">
														Compras en total
													</h5>
												</div>
												<div className="relative w-auto pl-4 flex-initial">
													<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#98ca3f]">
														<FaMoneyBillAlt className="w-6" />
													</div>
												</div>
											</div>
											<span className="text-gray-700 dark:text-white font-urbanist font-bold text-lg">
												10
											</span>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="w-full px-4">
									<div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#181B32] rounded-xl mb-6 xl:mb-0 shadow-lg">
										<div className="flex-auto p-4">
											<div className="flex flex-wrap">
												<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
													<h5 className="text-gray-700 dark:text-white font-urbanist font-bold text-lg">
														Compras por día
													</h5>
												</div>
												<div className="relative w-auto pl-4 flex-initial">
													<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#98ca3f]">
														<FaMoneyCheckAlt className="w-6" />
													</div>
												</div>
											</div>
											<span className="text-gray-700 dark:text-white font-urbanist font-bold text-lg">
												10
											</span>
										</div>
									</div>
								</div>
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
