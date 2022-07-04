import axios from "axios";
import { api } from "../../constants/global";

export const Login = async (email, password) => {
	const getToken = await axios.post(`${api}/auth/login`, {
		email: email,
		password: password,
	});
	return getToken;
};
