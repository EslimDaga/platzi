import axios from "axios";
import { api } from "../../constants/global";

export const getProducts = async token => {
	const response = await axios.get(`${api}/products`);
	const data = response.data;
	return data;
};

export const getProduct = async id => {
	const response = await axios.get(`${api}/products/${id}`);
	const data = response.data;
	return data;
};

export const createProduct = async (
	name,
	description,
	price,
	category,
	image
) => {
	const response = await axios.post(`${api}/products`, {
		title: name,
		price,
		description,
		categoryId: category,
		images: image,
	});
	const data = response;
	return data;
};
