import { useContext, useEffect, useMemo, useState } from "react";
import Breadcumb from "../../components/app/Breadcumb";
import { AgGridReact } from "ag-grid-react";
import { ThemeContext } from "../../contexts/darkmode/ThemeContext";
import { FaPen, FaPlusCircle, FaTimes, FaTrash } from "react-icons/fa";
import { getProducts } from "../../services/products";
import { AG_GRID_LOCALE_ES } from "../../i18n/locale.es";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "animate.css";

const Products = () => {
	const { theme } = useContext(ThemeContext);
	const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
	const [rowData, setRowData] = useState();

	const columnDefs = [
		{
			field: "title",
			headerName: "Nombre",
			filter: "agTextColumnFilter",
			cellClass: "text-center",
			minWidth: 200,
		},
		{
			field: "price",
			headerName: "Precio",
			filter: "agNumberColumnFilter",
			cellClass: "text-center",
			minWidth: 200,
			cellRenderer: params => {
				return `$ ${params.value}`;
			},
		},
		{
			field: "description",
			headerName: "Descripción",
			filter: "agTextColumnFilter",
			cellClass: "text-center",
			minWidth: 200,
		},
		{
			field: "category.name",
			headerName: "Categoría",
			filter: "agTextColumnFilter",
			cellClass: "text-center",
			minWidth: 200,
		},
		{
			headerName: "Acciones",
			field: "id",
			cellClass: "text-center",
			minWidth: 200,
			resizable: false,
			cellRenderer: params => {
				return (
					<div className="flex justify-center">
						<button className="flex items-center text-white font-bold bg-blue-900 rounded-md px-3 mr-2">
							<FaPen className="mr-2" />
							Editar
						</button>
						<button className="flex items-center text-white font-bold bg-red-500 rounded-md px-3">
							<FaTrash className="mr-2" />
							Eliminar
						</button>
					</div>
				);
			},
		},
	];

	const localeText = useMemo(() => {
		return AG_GRID_LOCALE_ES;
	}, []);

	const defaultColDef = useMemo(() => {
		return {
			sortable: true,
			flex: 1,
			filter: true,
			floatingFilter: true,
			resizable: true,
		};
	}, []);

	useEffect(() => {
		getProducts().then(data => setRowData(data));
	}, []);

	const openModalCreateProduct = () => {
		setShowModalCreateProduct(true);
	};

	const closeModalCreateProduct = () => {
		document
			.getElementById("modal-create-product")
			.classList.remove("animate__fadeInDown");
		document
			.getElementById("modal-create-product")
			.classList.add("animate__fadeOutUp");

		setTimeout(() => {
			setShowModalCreateProduct(false);
		}, 500);
	};

	return (
		<>
			{showModalCreateProduct && (
				<>
					<div
						id="modal-create-product"
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none animate__animated animate__fadeInDown"
					>
						<div className="relative w-full my-6 mx-4 max-w-3xl">
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white dark:bg-[#282b42] outline-none focus:outline-none">
								<div className="flex items-start justify-between p-5 border-blueGray-200 rounded-t">
									<h3 className="dark:text-gray-100 text-base font-urbanist font-bold self-center">
										Agregar Producto
									</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={closeModalCreateProduct}
									>
										<span className="bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-100 h-6 w-6 text-xl block outline-none focus:outline-none">
											<FaTimes className="mt-1" />
										</span>
									</button>
								</div>
								<div className="relative">
									<div className="w-full">
										<div className="bg-white dark:bg-[#282b42] rounded-lg shadow-sm">
											<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
												<div className="flex justify-center">
													<div className="w-full">
														<div className="h-full flex justify-center items-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
															<div className="space-y-1 text-center font-urbanist">
																<svg
																	className="mx-auto h-12 w-12 text-gray-400"
																	stroke="currentColor"
																	fill="none"
																	viewBox="0 0 48 48"
																	aria-hidden="true"
																>
																	<path
																		d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
																		strokeWidth={2}
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																</svg>
																<div className="flex text-gray-600">
																	<label
																		htmlFor="file-upload"
																		className="relative cursor-pointer rounded-md font-bold text-blue-600 dark:text-[#98ca3f] focus-within:outline-none focus-within:ring-2 focus-within:ring-transparent hover:text-blue-500"
																	>
																		<span>Carga un archivo</span>
																		<input
																			id="file-upload"
																			name="file-upload"
																			type="file"
																			className="sr-only"
																		/>
																	</label>
																	<p className="pl-1 text-gray-500 dark:text-gray-100">
																		o arrastralo y sueltalo
																	</p>
																</div>
																<p className="text-sm text-gray-500 dark:text-gray-300">
																	PNG, JPG, GIF tamaño maximo 10MB
																</p>
															</div>
														</div>
													</div>
												</div>
												<div className="flex justify-center w-full">
													<form action="" className="w-full">
														<div className="space-y-6">
															<div>
																<label
																	htmlFor="name"
																	className="block text-gray-700 dark:text-white font-urbanist text-base font-bold mb-2"
																>
																	Nombre
																</label>
																<input
																	type="text"
																	className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-gray-700 w-full"
																/>
															</div>
															<div>
																<label
																	htmlFor="description"
																	className="block text-gray-700 dark:text-white font-urbanist text-base font-bold mb-2"
																>
																	Descripción
																</label>
																<textarea
																	name=""
																	id=""
																	cols="30"
																	rows="3"
																	className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-gray-700 w-full"
																></textarea>
															</div>
															<div className="grid grid-cols-2 gap-3">
																<div>
																	<label
																		htmlFor="description"
																		className="block text-gray-700 dark:text-white font-urbanist text-base font-bold mb-2"
																	>
																		Categoría
																	</label>
																	<select
																		name="category"
																		id="category"
																		className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-gray-700 w-full"
																	>
																		<option value="1">Categoría 1</option>
																		<option value="2">Categoría 2</option>
																	</select>
																</div>
																<div>
																	<label
																		htmlFor="name"
																		className="block text-gray-700 dark:text-white font-urbanist text-base font-bold mb-2"
																	>
																		Precio
																	</label>
																	<input
																		type="text"
																		className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-gray-700 w-full"
																	/>
																</div>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			)}
			<div
				className={
					(showModalCreateProduct ? "blur-sm " : "") +
					"flex items-center justify-between pt-8"
				}
			>
				<Breadcumb link="products" title="Productos" />
				<button
					className="flex font-urbanist font-bold text-base text-white bg-[#98ca3f] items-center rounded-md mx-4 py-2 px-4 hover:bg-[#81ac35]"
					onClick={openModalCreateProduct}
				>
					Agregar Producto
					<FaPlusCircle className="ml-2" />
				</button>
			</div>
			<div
				className={
					(showModalCreateProduct ? "blur-sm " : "") +
					"flex-1 overflow-y-auto w-full"
				}
			>
				<div className="w-full h-[100%] py-8 px-4">
					<div
						className={
							theme === "light"
								? "ag-theme-alpine w-full h-full"
								: "ag-theme-alpine-dark w-full h-full"
						}
					>
						<AgGridReact
							rowData={rowData}
							columnDefs={columnDefs}
							defaultColDef={defaultColDef}
							localeText={localeText}
						></AgGridReact>
					</div>
				</div>
			</div>
		</>
	);
};

export default Products;
