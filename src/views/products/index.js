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
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white dark:bg-gray-800 outline-none focus:outline-none">
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
									<div className="w-full bg-gray-100 dark:bg-gray-800">
										<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
											<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
												<div className="flex flex-col sm:mt-0 gap-7 text-sm px-4 py-4">
													<form>
														<div className="relative w-full mb-3">
															<label
																className={`block text-gray-700 dark:text-gray-100 text-base font-bold mb-2`}
															>
																Documento de Identidad
															</label>
															<input
																type="text"
																autoComplete="off"
																name="dni"
																className={`border-2 px-3 py-3 dark:border-gray-700 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 rounded-md text-base shadow focus:outline-none focus:ring-blue-900 w-full font-bold`}
																style={{ transition: "all .15s ease" }}
															/>
														</div>
														<div className="text-center mt-6">
															<button
																className={`bg-blue-900 dark:bg-blue-900 text-white active:bg-gray-700 text-base font-bold px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full`}
																type="submit"
																style={{ transition: "all .15s ease" }}
															>
																Guardar
															</button>
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
