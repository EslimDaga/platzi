import { api } from "../../constants/global";

export async function loginUser(dispatch, loginPayload) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(loginPayload),
	};

	try {
		dispatch({ type: "REQUEST_LOGIN" });
		let response = await fetch(`${api}/auth/login`, requestOptions);
		let data = await response.json();

		if (data.access_token) {
			dispatch({ type: "LOGIN_SUCCESS", payload: data.access_token });
			const { access_token } = data;
			localStorage.setItem("currentToken", JSON.stringify(access_token));
			return data;
		}

		dispatch({
			type: "LOGIN_ERROR",
			error: "Usuario y/o contraseña incorrectos",
		});
		return;
	} catch (error) {
		dispatch({ type: "LOGIN_ERROR", error: "Error en la aplicación" });
	}
}

export async function logout(dispatch) {
	dispatch({ type: "LOGOUT" });
	localStorage.removeItem("currentToken");
	localStorage.removeItem("token");
}
