import { useContext, useEffect, useMemo, useState } from "react";
import Breadcumb from "../../components/app/Breadcumb";
import { AgGridReact } from "ag-grid-react";
import { ThemeContext } from "../../contexts/darkmode/ThemeContext";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

var filterParams = {
	comparator: (filterLocalDateAtMidnight, cellValue) => {
		var dateAsString = cellValue;
		if (dateAsString == null) return -1;
		var dateParts = dateAsString.split("/");
		var cellDate = new Date(
			Number(dateParts[2]),
			Number(dateParts[1]) - 1,
			Number(dateParts[0])
		);
		if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
			return 0;
		}
		if (cellDate < filterLocalDateAtMidnight) {
			return -1;
		}
		if (cellDate > filterLocalDateAtMidnight) {
			return 1;
		}
	},
	browserDatePicker: true,
};

const Products = () => {
	const { theme } = useContext(ThemeContext);
	console.log(theme);

	const [rowData, setRowData] = useState();

	const columnDefs = [
		{ field: "athlete" },
		{ field: "age", filter: "agNumberColumnFilter" },
		{ field: "country" },
		{ field: "year" },
		{
			field: "date",
			minWidth: 190,
			filter: "agDateColumnFilter",
			filterParams: filterParams,
		},
		{ field: "sport" },
		{ field: "gold", filter: "agNumberColumnFilter" },
		{ field: "silver", filter: "agNumberColumnFilter" },
		{ field: "bronze", filter: "agNumberColumnFilter" },
		{ field: "total", filter: "agNumberColumnFilter" },
	];

	const defaultColDef = useMemo(() => {
		return {
			editable: true,
			sortable: true,
			flex: 1,
			minWidth: 100,
			filter: true,
			floatingFilter: true,
			resizable: true,
		};
	}, []);

	useEffect(() => {
		fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
			.then(resp => resp.json())
			.then(data => {
				console.log(data);
				setRowData(data);
			});
	}, []);

	return (
		<div className="flex-1 overflow-y-auto w-full">
			<Breadcumb link="products" title="Productos" />
			<div className="w-full h-full py-8 px-4">
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
					></AgGridReact>
				</div>
			</div>
		</div>
	);
};

export default Products;
