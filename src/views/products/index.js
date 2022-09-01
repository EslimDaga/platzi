import { useContext, useEffect, useMemo, useState } from "react";
import Breadcumb from "../../components/app/Breadcumb";
import { AgGridReact } from "ag-grid-react";
import { ThemeContext } from "../../contexts/darkmode/ThemeContext";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";
import { getProducts } from "../../services/products";
import { AG_GRID_LOCALE_ES } from "../../i18n/locale.es";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Products = () => {
	const { theme } = useContext(ThemeContext);

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

	return (
		<div className="flex-1 overflow-y-auto w-full">
			<div className="flex items-center justify-between pt-8">
				<Breadcumb link="products" title="Productos" />
				<button className="flex font-urbanist font-bold text-base text-white bg-[#98ca3f] items-center rounded-md mx-4 py-2 px-4">
					Agregar Producto
					<FaPlusCircle className="ml-2" />
				</button>
			</div>
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
	);
};

export default Products;
