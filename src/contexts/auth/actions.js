import { Login } from "../../services/auth";

export async function loginUser(dispatch, loginPayload) {
	try {
		dispatch({ type: "REQUEST_LOGIN" });
		const { email, password } = loginPayload;
		let response = await Login(email, password).then(function (response) {
			const { data } = response;
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
		});
		return response;
	} catch (error) {
		dispatch({ type: "LOGIN_ERROR", error: "Error en la aplicación" });
	}
}

export async function logout(dispatch) {
	dispatch({ type: "LOGOUT" });
	localStorage.removeItem("currentToken");
	localStorage.removeItem("token");
}
