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
