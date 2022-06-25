let token = localStorage.getItem("currentUser")

export const initialState = {
  token: "" || token,
  loading: false,
  errorMessage: "Usuario y/o contraseña incorrectos",
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        token: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: "Usuario y/o contraseña incorrectos",
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};