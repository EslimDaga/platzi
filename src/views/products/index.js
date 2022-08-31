import { useContext, useEffect, useMemo, useState } from "react";
import Breadcumb from "../../components/app/Breadcumb";
import { AgGridReact } from "ag-grid-react";
import { ThemeContext } from "../../contexts/darkmode/ThemeContext";
import { FaPlusCircle } from "react-icons/fa";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getProducts } from "../../services/products";
import { AG_GRID_LOCALE_ES } from "../../i18n/locale.es";

const Products = () => {
	const { theme } = useContext(ThemeContext);

	const [rowData, setRowData] = useState();

	const columnDefs = [
		{ field: "title", headerName: "Nombre", filter: "agTextColumnFilter" },
		{ field: "price", headerName: "Precio", filter: "agNumberColumnFilter" },
		{
			field: "description",
			headerName: "Descripción",
			filter: "agTextColumnFilter",
		},
		{
			field: "category.name",
			headerName: "Categoría",
			filter: "agTextColumnFilter",
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
				<button className="flex font-urbanist font-bold text-base text-white bg-[#98ca3f] items-center rounded-md mx-4 p-2">
					Agregar Producto
					<FaPlusCircle className="ml-2" />
				</button>
			</div>
			<div className="w-full h-[70%] py-8 px-4">
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
