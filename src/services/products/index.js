import axios from "axios";
import { api } from "../../constants/global";

export const getProducts = async token => {
	const response = await axios.get(`${api}/products`);
	const data = response.data;
	return data;
};
