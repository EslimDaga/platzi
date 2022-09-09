import { useContext, useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import { AgGridReact } from "ag-grid-react";
import { ThemeContext } from "../../contexts/darkmode/ThemeContext";
import { FaPen, FaPlusCircle, FaTimes, FaTrash } from "react-icons/fa";
import {
	createProduct,
	getProduct,
	getProducts,
} from "../../services/products";
import { AG_GRID_LOCALE_ES } from "../../i18n/locale.es";
import { useDropzone } from "react-dropzone";
import Breadcumb from "../../components/app/Breadcumb";
import Select from "react-select";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "animate.css";
import { getCategoriesForSelect } from "../../services/categories";
import axios from "axios";
import Swal from "sweetalert2";

const Products = () => {
	const { theme } = useContext(ThemeContext);

	const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
	const [showModalEditProduct, setShowModalEditProduct] = useState(false);
	const [fileName, setFileName] = useState([]);
	const [rowData, setRowData] = useState();
	const [categories, setCategories] = useState([]);
	const [product, setProduct] = useState({});

	const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
		useDropzone({
			accept: {
				"image/jpeg": [],
				"image/png": [],
			},
			maxFiles: 3,
			maxSize: 1000000,
			onDrop: acceptedFiles => {
				setFileName(acceptedFiles.map(file => file.path));
			},
		});

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
						<button
							onClick={() => {
								openModalEditProduct(params.value);
							}}
							className="flex items-center text-white font-bold bg-blue-900 opacity-70 rounded-md px-3 mr-2"
						>
							<FaPen className="mr-2" />
							Editar
						</button>
						<button
							onClick={() => {
								handleDelete(params.value);
							}}
							className="flex items-center text-white font-bold bg-red-500 opacity-70 rounded-md px-3"
						>
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
		getCategoriesForSelect().then(data => {
			setCategories(data);
		});
	}, []);

	const openModalCreateProduct = () => {
		setShowModalCreateProduct(true);
	};

	const openModalEditProduct = id => {
		getProduct(id).then(data => {
			setProduct(data);
		});
		setShowModalEditProduct(true);
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
		}, 150);
	};

	const closeModalEditProduct = () => {
		document
			.getElementById("modal-edit-product")
			.classList.remove("animate__fadeInDown");
		document
			.getElementById("modal-edit-product")
			.classList.add("animate__fadeOutUp");

		setTimeout(() => {
			setShowModalEditProduct(false);
		}, 150);
	};

	const validateLogin = values => {
		const errors = {};
		/* Name validation */
		if (!values.name) {
			errors.name = "El nombre es requerido";
		}
		/* Description validation */
		if (!values.description) {
			errors.description = "La descripción es requerida";
		}

		/* Category validation */
		if (!values.category) {
			errors.category = "La categoría es requerida";
		}

		/* Price validation */
		if (!values.price) {
			errors.price = "El precio es requerido";
		} else if (values.price < 0) {
			errors.price = "El precio debe ser mayor a 0";
		}

		/* Image dropzone validation */
		if (fileName.length === 0) {
			errors.image = "La imagen es requerida";
		}

		return errors;
	};

	const handleSubmit = values => {
		values["image"] = fileName;
		const { name, description, price, category, image } = values;
		createProduct(name, description, price, category, image).then(data => {
			if (data.status === 201) {
				setShowModalCreateProduct(false);
				setRowData([...rowData, data.data]);
			}
		});
	};

	const handleDelete = id => {
		Swal.fire({
			title: "¿Estás seguro?",
			text: "No podrás revertir esta acción",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#1E3A8A",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar",
			customClass: {
				title:
					theme === "dark"
						? "text-white font-urbanist font-bold"
						: "text-gray-900 font-urbanist font-bold",
				htmlContainer:
					theme === "dark"
						? "text-white font-urbanist"
						: "text-gray-900 font-urbanist",
				confirmButton:
					"bg-red-500 hover:bg-red-600 text-white font-urbanist font-bold focus:outline-none focus:ring-none",
			},
			background: theme === "dark" ? "#1F2937" : "#fff",
		}).then(result => {
			if (result.isConfirmed) {
				axios
					.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
					.then(res => {
						if (res.status === 200) {
							setRowData(rowData.filter(item => item.id !== id));
						}
					});
			}
		});
	};

	const customStylesWhiteMode = {
		control: (provided, state) => ({
			...provided,
			background: "#eeeeee",
			borderRadius: "0.5rem",
			borderColor: state.isFocused ? "#eeeeee" : "#eeeeee",
			minHeight: state.isSelected ? "56px" : "56px",
		}),
		option: (provided, state) => ({
			...provided,
			background: state.isFocused ? "#2563eb" : "#eeeeee",
			color: state.isFocused ? "#fff" : "#333333",
			cursor: "pointer",
			"&:hover": {
				backgroundColor: "#2563eb",
				color: "#fff",
			},
		}),
		placeholder: base => ({
			...base,
		}),
	};

	const customStylesDarkMode = {
		control: (provided, state) => ({
			...provided,
			background: "#3F425E",
			borderRadius: "0.5rem",
			borderColor: "#3F425E",
			color: state.isSelected ? "#fff" : "#fff",
			minHeight: state.isSelected ? "56px" : "56px",
		}),
		singleValue: (provided, state) => ({
			...provided,
			color: state.isSelected ? "#fff" : "#fff",
		}),
		placeholder: (provided, state) => ({
			...provided,
			color: state.isSelected ? "#fff" : "#fff",
		}),
		menuList: (provided, state) => ({
			...provided,
			background: "#3F425E",
		}),
		option: (provided, state) => ({
			...provided,
			background: state.isFocused ? "#5c608a" : "#3F425E",
			color: state.isFocused ? "#fff" : "#fff",
			"&:hover": {
				backgroundColor: "#5c608a",
				color: "#fff",
			},
		}),
	};

	return (
		<>
			{showModalCreateProduct && (
				<>
					<div
						id="modal-create-product"
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none animate__animated animate__fadeInDown"
					>
						<div className="relative w-full h-full py-6 px-4 max-w-3xl">
							<div className="my-auto border-0 rounded-lg shadow-lg relative flex flex-col bg-white dark:bg-[#282b42] outline-none focus:outline-none">
								<div className="flex items-start justify-between px-6 py-5 border-blueGray-200 rounded-t">
									<h3 className="dark:text-gray-100 text-base font-urbanist font-bold self-center">
										Agregar Producto
									</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={closeModalCreateProduct}
									>
										<span className="bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-100 h-6 w-6 text-xl block outline-none focus:outline-none">
											<FaTimes className="mt-1" />
										</span>
									</button>
								</div>
								<div className="relative">
									<div className="w-full">
										<div className="bg-white dark:bg-[#282b42] rounded-lg shadow-sm">
											<Formik
												initialValues={{
													name: "",
													description: "",
													category: "",
													price: "",
													image: "",
												}}
												validate={validateLogin}
												onSubmit={handleSubmit}
											>
												{({
													values,
													errors,
													handleChange,
													setFieldValue,
													handleSubmit,
												}) => (
													<form onSubmit={handleSubmit}>
														<div className="gap-6 px-6 pb-6">
															<div className="justify-center w-full">
																<div className="w-full">
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
																				name="name"
																				id="name"
																				onChange={handleChange}
																				value={values.name}
																				className={
																					"border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-gray-700 w-full" +
																					(errors.name
																						? " border-red-500 border-[1px] focus:outline-red-500"
																						: "")
																				}
																			/>
																			{errors.name && (
																				<label
																					className="text-[#e6215d] text-sm font-urbanist font-semibold"
																					htmlFor="error-alert-for-name"
																				>
																					{errors.name}
																				</label>
																			)}
																		</div>
																		<div>
																			<label
																				htmlFor="description"
																				className="block text-gray-700 dark:text-white font-urbanist text-base font-bold mb-2"
																			>
																				Descripción
																			</label>
																			<textarea
																				name="description"
																				id="description"
																				onChange={handleChange}
																				value={values.description}
																				cols="30"
																				rows="3"
																				className={
																					"border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-gray-700 w-full" +
																					(errors.description
																						? " border-red-500 border-[1px] focus:outline-red-500"
																						: "")
																				}
																			></textarea>
																			{errors.description && (
																				<label
																					className="text-[#e6215d] text-sm font-urbanist font-semibold"
																					htmlFor="error-alert-for-description"
																				>
																					{errors.description}
																				</label>
																			)}
																		</div>
																		<div>
																			<label
																				htmlFor="description"
																				className="block text-gray-700 dark:text-white font-urbanist text-base font-bold mb-2"
																			>
																				Categoría
																			</label>
																			<Select
																				options={categories}
																				name="category"
																				value={categories.find(
																					option =>
																						option.value === values.category
																				)}
																				onChange={option => {
																					setFieldValue(
																						"category",
																						option.value
																					);
																				}}
																				placeholder="Selecciona una categoría"
																				className={
																					"w-full rounded-lg z-1 focus:shadow font-urbanist font-medium text-base focus:outline-gray-700" +
																					(errors.category
																						? " border-red-500 border-[1px] focus:outline-red-500"
																						: "")
																				}
																				styles={
																					theme === "light"
																						? customStylesWhiteMode
																						: customStylesDarkMode
																				}
																			/>
																			{errors.category && (
																				<label
																					className="text-[#e6215d] text-sm font-urbanist font-semibold"
																					htmlFor="error-alert-for-category"
																				>
																					{errors.category}
																				</label>
																			)}
																		</div>
																		<div>
																			<label
																				htmlFor="price"
																				className="block text-gray-700 dark:text-white font-urbanist text-base font-bold mb-2"
																			>
																				Precio
																			</label>
																			<input
																				type="number"
																				name="price"
																				id="price"
																				onChange={handleChange}
																				value={values.price}
																				className={
																					"border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-gray-700 w-full" +
																					(errors.price
																						? " border-red-500 border-[1px] focus:outline-red-500"
																						: "")
																				}
																			/>
																			{errors.price && (
																				<label className="text-[#e6215d] text-sm font-urbanist font-semibold">
																					{errors.price}
																				</label>
																			)}
																		</div>
																		<div
																			{...getRootProps()}
																			className={
																				"bg-[#EEEEEE] dark:bg-[#3F425E] flex justify-center items-center rounded-md border-2 border-dashed px-6 pt-5 pb-6 cursor-pointer" +
																				(acceptedFiles.length > 0
																					? " border-green-500"
																					: "") +
																				(errors.image ? " border-red-500" : "")
																			}
																		>
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
																						htmlFor="image"
																						className="relative cursor-pointer rounded-md font-bold text-blue-600 dark:text-[#98ca3f] focus-within:outline-none focus-within:ring-2 focus-within:ring-transparent hover:text-blue-500"
																					>
																						<span>Carga un archivo</span>
																						<input
																							{...getInputProps()}
																							onChange={handleChange}
																							id="image"
																							name="image"
																							type="file"
																							value={values.image}
																						/>
																					</label>
																					<p className="pl-1 text-gray-500 dark:text-gray-100">
																						o arrastralo y sueltalo
																					</p>
																				</div>
																				<p className="text-sm text-gray-500 dark:text-gray-300">
																					PNG, JPG tamaño maximo 10MB
																				</p>
																				<p className="text-sm text-gray-500 dark:text-gray-300">
																					(Máximo 3 archivos)
																				</p>
																			</div>
																		</div>
																		{acceptedFiles.length < 1 && (
																			<div className="text-[#e6215d] text-sm font-urbanist font-semibold">
																				{errors.image}
																			</div>
																		)}
																		{acceptedFiles.length > 0 &&
																			acceptedFiles.map(file => (
																				<li
																					key={file.path}
																					className="font-urbanist font-bold text-base text-gray-700 dark:text-gray-100"
																				>
																					{file.path} - {file.size} bytes
																				</li>
																			))}
																		{fileRejections.length > 0 &&
																			fileRejections.map(({ file, errors }) => (
																				<li
																					key={file.path}
																					className="font-urbanist font-bold text-base text-gray-700 dark:text-gray-100"
																				>
																					{file.path} - {file.size} bytes
																					<ul>
																						{errors.map(e => (
																							<li
																								key={e.code}
																								className="font-urbanist font-bold text-base text-red-500"
																							>
																								El tipo de archivo debe ser
																								imagen/jpeg, imagen/png.
																							</li>
																						))}
																					</ul>
																				</li>
																			))}
																		<div>
																			<button
																				className={`bg-[#98ca3f] text-gray-900 active:bg-gray-700 text-base font-urbanist font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full`}
																				type="submit"
																				style={{ transition: "all .15s ease" }}
																			>
																				<div className="inline-flex items-center">
																					Guardar
																				</div>
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</form>
												)}
											</Formik>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			)}
			{showModalEditProduct && (
				<>
					<div
						id="modal-edit-product"
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none animate__animated animate__fadeInDown"
					>
						<div className="relative w-full h-full py-6 px-4 max-w-3xl">
							<div className="my-auto border-0 rounded-lg shadow-lg relative flex flex-col bg-white dark:bg-[#282b42] outline-none focus:outline-none">
								<div className="flex items-start justify-between px-6 py-5 border-blueGray-200 rounded-t">
									<h3 className="dark:text-gray-100 text-base font-urbanist font-bold self-center">
										Editar Producto
									</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-gray-900 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={closeModalEditProduct}
									>
										<span className="bg-transparent text-gray-500 hover:text-gray-900 dark:text-gray-300 hover:dark:text-gray-100 h-6 w-6 text-xl block outline-none focus:outline-none">
											<FaTimes className="mt-1" />
										</span>
									</button>
								</div>
								<div className="relative">
									<div className="w-full">
										<div className="bg-white dark:bg-[#282b42] rounded-lg shadow-sm">
											<Formik
												initialValues={{
													name: "",
													description: "",
													category: "",
													price: "",
													image: "",
												}}
												validate={validateLogin}
												onSubmit={handleSubmit}
											>
												{({
													values,
													errors,
													handleChange,
													setFieldValue,
													handleSubmit,
												}) => (
													<form onSubmit={handleSubmit}>
														<div className="gap-6 px-6 pb-6">
															<div className="justify-center w-full">
																<div className="w-full">
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
																				name="name"
																				id="name"
																				onChange={handleChange}
																				value={values.name}
																				className={
																					"border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-gray-700 w-full" +
																					(errors.name
																						? " border-red-500 border-[1px] focus:outline-red-500"
																						: "")
																				}
																			/>
																			{errors.name && (
																				<label
																					className="text-[#e6215d] text-sm font-urbanist font-semibold"
																					htmlFor="error-alert-for-name"
																				>
																					{errors.name}
																				</label>
																			)}
																		</div>
																		<div>
																			<label
																				htmlFor="description"
																				className="block text-gray-700 dark:text-white font-urbanist text-base font-bold mb-2"
																			>
																				Descripción
																			</label>
																			<textarea
																				name="description"
																				id="description"
																				onChange={handleChange}
																				value={values.description}
																				cols="30"
																				rows="3"
																				className={
																					"border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-gray-700 w-full" +
																					(errors.description
																						? " border-red-500 border-[1px] focus:outline-red-500"
																						: "")
																				}
																			></textarea>
																			{errors.description && (
																				<label
																					className="text-[#e6215d] text-sm font-urbanist font-semibold"
																					htmlFor="error-alert-for-description"
																				>
																					{errors.description}
																				</label>
																			)}
																		</div>
																		<div>
																			<label
																				htmlFor="description"
																				className="block text-gray-700 dark:text-white font-urbanist text-base font-bold mb-2"
																			>
																				Categoría
																			</label>
																			<Select
																				options={categories}
																				name="category"
																				value={categories.find(
																					option =>
																						option.value === values.category
																				)}
																				onChange={option => {
																					setFieldValue(
																						"category",
																						option.value
																					);
																				}}
																				placeholder="Selecciona una categoría"
																				className={
																					"w-full rounded-lg z-1 focus:shadow font-urbanist font-medium text-base focus:outline-gray-700" +
																					(errors.category
																						? " border-red-500 border-[1px] focus:outline-red-500"
																						: "")
																				}
																				styles={
																					theme === "light"
																						? customStylesWhiteMode
																						: customStylesDarkMode
																				}
																			/>
																			{errors.category && (
																				<label
																					className="text-[#e6215d] text-sm font-urbanist font-semibold"
																					htmlFor="error-alert-for-category"
																				>
																					{errors.category}
																				</label>
																			)}
																		</div>
																		<div>
																			<label
																				htmlFor="price"
																				className="block text-gray-700 dark:text-white font-urbanist text-base font-bold mb-2"
																			>
																				Precio
																			</label>
																			<input
																				type="number"
																				name="price"
																				id="price"
																				onChange={handleChange}
																				value={values.price}
																				className={
																					"border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-gray-700 w-full" +
																					(errors.price
																						? " border-red-500 border-[1px] focus:outline-red-500"
																						: "")
																				}
																			/>
																			{errors.price && (
																				<label className="text-[#e6215d] text-sm font-urbanist font-semibold">
																					{errors.price}
																				</label>
																			)}
																		</div>
																		<div
																			{...getRootProps()}
																			className={
																				"bg-[#EEEEEE] dark:bg-[#3F425E] flex justify-center items-center rounded-md border-2 border-dashed px-6 pt-5 pb-6 cursor-pointer" +
																				(acceptedFiles.length > 0
																					? " border-green-500"
																					: "") +
																				(errors.image ? " border-red-500" : "")
																			}
																		>
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
																						htmlFor="image"
																						className="relative cursor-pointer rounded-md font-bold text-blue-600 dark:text-[#98ca3f] focus-within:outline-none focus-within:ring-2 focus-within:ring-transparent hover:text-blue-500"
																					>
																						<span>Carga un archivo</span>
																						<input
																							{...getInputProps()}
																							onChange={handleChange}
																							id="image"
																							name="image"
																							type="file"
																							value={values.image}
																						/>
																					</label>
																					<p className="pl-1 text-gray-500 dark:text-gray-100">
																						o arrastralo y sueltalo
																					</p>
																				</div>
																				<p className="text-sm text-gray-500 dark:text-gray-300">
																					PNG, JPG tamaño maximo 10MB
																				</p>
																				<p className="text-sm text-gray-500 dark:text-gray-300">
																					(Máximo 3 archivos)
																				</p>
																			</div>
																		</div>
																		{acceptedFiles.length < 1 && (
																			<div className="text-[#e6215d] text-sm font-urbanist font-semibold">
																				{errors.image}
																			</div>
																		)}
																		{acceptedFiles.length > 0 &&
																			acceptedFiles.map(file => (
																				<li
																					key={file.path}
																					className="font-urbanist font-bold text-base text-gray-700 dark:text-gray-100"
																				>
																					{file.path} - {file.size} bytes
																				</li>
																			))}
																		{fileRejections.length > 0 &&
																			fileRejections.map(({ file, errors }) => (
																				<li
																					key={file.path}
																					className="font-urbanist font-bold text-base text-gray-700 dark:text-gray-100"
																				>
																					{file.path} - {file.size} bytes
																					<ul>
																						{errors.map(e => (
																							<li
																								key={e.code}
																								className="font-urbanist font-bold text-base text-red-500"
																							>
																								El tipo de archivo debe ser
																								imagen/jpeg, imagen/png.
																							</li>
																						))}
																					</ul>
																				</li>
																			))}
																		<div>
																			<button
																				className={`bg-[#98ca3f] text-gray-900 active:bg-gray-700 text-base font-urbanist font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full`}
																				type="submit"
																				style={{ transition: "all .15s ease" }}
																			>
																				<div className="inline-flex items-center">
																					Guardar
																				</div>
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</form>
												)}
											</Formik>
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
					"flex items-center justify-between py-5"
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
				<div className="w-full h-[100%] pb-5 px-4">
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
							pagination={true}
						></AgGridReact>
					</div>
				</div>
			</div>
		</>
	);
};

export default Products;
