import Toggle from "../../components/darkmode/ThemeToggle";
import { Formik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react";
import { loginUser, useAuthDispatch, useAuthState, } from "../../contexts/auth/index";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {

  //Hook Show Password
  const [passwordShow, setPasswordShow] = useState(false);

  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const { loading, errorMessage } = useAuthState();

  const togglePasswordShow = () => {
    setPasswordShow(passwordShow ? false : true);
  }

  const validateLogin = (values) => {
    const errors = {};
    /* Email validation */
    if (!values.email) {
      errors.email = "Campo requerido";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        values.email
      )
    ) {
      errors.email = "Por favor, ingresa un email válido.";
    }

    /* Password validation */
    if (!values.password) {
      errors.password = "Campo requerido";
    } else if (values.password.length <= 6) {
      errors.password =
        "Tu contraseña debe de tener al menos 6 caracteres";
    }
    return errors;
  }

  const handleSubmit = async(values) => {
    const { email, password } = values;
    try {
      let response = await loginUser(dispatch, {
        email,
        password,
      });
      if (!response) {
        toast.error(errorMessage);
      } else {
        toast.success("Bienvenido a Platzi Shop");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <section className="absolute w-full h-full bg-[#EEEEEE] dark:bg-[#181b32]">
        <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
          <Toggle />
        </div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-2/4 xl:w-2/5 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-2xl bg-[#FFFFFF] dark:bg-[#22253D] border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="p-4">
                    <figure>
                      <img
                        src="https://static.platzi.com/media/platzi-isotipo@2x.png"
                        alt="Platzi logo"
                        className="m-auto"
                      />
                    </figure>
                  </div>
                  <div className="text-center">
                    <h1 className="text-black dark:text-white font-urbanist font-extrabold text-xl">
                      Bienvenido de Vuelta
                    </h1>
                    <h2 className="text-[#B5B5C3] font-urbanist font-bold text-lg">
                      Que bueno verte otra vez 😀
                    </h2>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validate={validateLogin}
                    onSubmit={handleSubmit}
                  >
                    {({
                      values,
                      touched,
                      errors,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    }) => (
                      <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="relative w-full mb-3">
                          <label
                            className="block text-gray-900 dark:text-white font-urbanist text-base font-bold mb-2"
                            htmlFor="email"
                          >
                            Correo Electronico
                          </label>
                          <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-none focus:ring-none w-full"
                            placeholder="Ingrese su correo electronico"
                            disabled={loading}
                          />
                          {errors.email && touched.email && (
                            <label
                              className="text-[#e6215d] text-sm font-urbanist font-semibold"
                              htmlFor="error-alert-for-email"
                            >
                              {errors.email}
                            </label>
                          )}
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block text-gray-900 dark:text-white font-urbanist text-base font-bold mb-2"
                            htmlFor="password"
                          >
                            Contraseña
                          </label>
                          <input
                            type={passwordShow ? "text" : "password"}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-none focus:ring-none w-full"
                            placeholder="Ingrese su contraseña"
                            disabled={loading}
                          />
                          <div
                            onClick={togglePasswordShow}
                            className="cursor-pointer"
                          >
                            {passwordShow ? (
                              <FaEye className="h-5 w-5 text-dark-500 dark:text-gray-100 float-right relative bottom-[2.1rem] right-4" />
                            ) : (
                              <FaEyeSlash className="h-5 w-5 text-dark-500 dark:text-gray-100 float-right relative bottom-[2.1rem] right-4" />
                            )}
                          </div>
                          {errors.password && touched.password && (
                            <label
                              className="text-[#e6215d] text-sm font-urbanist font-semibold"
                              htmlFor="error-alert-for-email"
                            >
                              {errors.password}
                            </label>
                          )}
                        </div>
                        <div className="text-center mt-6">
                          <button
                            className={
                              !loading
                                ? `bg-[#6f4ef6] text-white text-base font-urbanist font-bold px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ` +
                                  (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    values.email
                                  ) && values.password.length >= 6
                                    ? "active:bg-[#3417aa]"
                                    : "cursor-not-allowed opacity-50")
                                : "bg-[#6f4ef6] text-white text-base font-urbanist font-bold px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full cursor-not-allowed opacity-50"
                            }
                            type="submit"
                            disabled={
                              !loading &&
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                values.email
                              ) &&
                              values.password.length >= 6
                                ? false
                                : true
                            }
                          >
                            <div className="inline-flex items-center">
                              {loading && (
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                              )}
                              Iniciar sesión
                            </div>
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="flex flex-wrap mt-6">
                <div className="w-1/2">
                  <a
                    className="text-gray-800 dark:text-[#34d69b] font-urbanist font-medium text-sm"
                    href="/"
                  >
                    ¿Olvido su contraseña?
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <a
                    className="text-gray-800 dark:text-[#34d69b] font-urbanist font-medium text-sm"
                    href="/"
                  >
                    Crea una cuenta nueva
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster
          toastOptions={{
            className: "font-urbanist font-bold",
            error: {
              icon: "😕",
              iconTheme: {
                primary: "white",
                secondary: "#E6215D",
              },
              style: {
                background: "#E6215D",
                color: "#FFFFFF",
              },
            },
            success: {
              icon: "😎",
              iconTheme: {
                primary: "white",
                secondary: "#00ab55",
              },
              style: {
                background: "#00ab55",
                color: "#FFFFFF",
              },
            },
          }}
        />
      </section>
    </main>
  );
}

export default Login;