import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Breadcumb from "../../components/app/Breadcumb";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import {
	FaBoxes,
	FaBoxOpen,
	FaMoneyBillAlt,
	FaMoneyCheckAlt,
	FaUsers,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/darkmode/ThemeContext";

const Dashboard = () => {
	const { theme } = useContext(ThemeContext);

	const options = {
		colors: [theme === "light" ? "#181B32" : "#FFFFFF"],
		chart: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
				stops: [
					[0, theme === "light" ? "#FFFFFF" : "#181B32"],
					[1, theme === "light" ? "#FFFFFF" : "#181B32"],
				],
			},
			style: {
				fontFamily: "'Urbanist', sans-serif",
				fontWeight: "700",
			},
			type: "spline",
		},
		title: {
			style: {
				color: theme === "light" ? "#181B32" : "#FFFFFF",
				textTransform: "capitalize",
				fontSize: "16px",
			},
			text: "Gráfico de ventas",
		},
		series: [
			{
				data: [1, 2, 1, 4, 3, 6],
			},
		],
		accessibility: {
			enabled: false,
		},
		yAxis: [
			{
				//--- Primary yAxis
				title: {
					style: {
						color: theme === "light" ? "#181B32" : "#FFFFFF",
					},
					text: "Cantidad",
				},
			},
			{
				//--- Secondary yAxis
				title: {
					style: {
						color: theme === "light" ? "#181B32" : "#FFFFFF",
					},
					text: "Cantidad",
				},
				opposite: true,
			},
		],
	};
	return (
		<>
			<div className="py-5">
				<Breadcumb link="dashboard" title="Dashboard" />
			</div>
			<div className="flex-1 overflow-y-auto w-full">
				<div className="relative bg-lightBlue-600 pb-5">
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
							<div className="w-full px-4">
								<div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#181B32] rounded-xl mb-6 xl:mb-0 shadow-lg px-1 pt-2">
									<HighchartsReact highcharts={Highcharts} options={options} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
