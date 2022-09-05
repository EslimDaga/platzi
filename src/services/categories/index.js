import axios from "axios";
import { api } from "../../constants/global";

export const getCategoriesForSelect = async () => {
	const response = await axios.get(`${api}/categories`);
	const data = response.data;
	const options = data.map(category => {
		return {
			value: category.id,
			label: category.name,
		};
	});
	return options;
};
