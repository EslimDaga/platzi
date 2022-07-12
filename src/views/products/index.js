import Breadcumb from "../../components/app/Breadcumb";

const Products = () => {
	return (
		<div className="flex-1 overflow-y-auto w-full">
			<Breadcumb link="products" title="Productos" />
			<div className="relative bg-lightBlue-600 pt-8">
				<div className="w-full px-4 rounded-xl">Jeje</div>
			</div>
		</div>
	);
};

export default Products;
