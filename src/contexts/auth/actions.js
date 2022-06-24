const ROOT_URL = "https://api.escuelajs.co/api/v1/auth/login";

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(`${ROOT_URL}`, requestOptions);
    let data = await response.json();

    if (data.access_token) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data.access_token });
      const { access_token } = data;
      localStorage.setItem("currentUser", JSON.stringify(access_token));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: "Usuario y/o contraseña incorrectos" });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: "Error en la aplicación" });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}