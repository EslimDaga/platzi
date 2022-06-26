import { Formik } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Toggle from "../../components/darkmode/ThemeToggle";

const Register = () => {
  //Hook Show Password
  const [passwordShow, setPasswordShow] = useState(false);

  const togglePasswordShow = () => {
    setPasswordShow(passwordShow ? false : true);
  };

  const validateRegister = (values) => {
    const errors = {};
    /* Name validation */
    if(!values.name){
      errors.name = "Campo requerido";
    } else if (!/^[a-zA-Z ]*$/i.test(values.name)) {
      errors.name = "Por favor, ingrese un nombre válido";
    }

    /* Email validation */
    if (!values.email) {
      errors.email = "Campo requerido";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Por favor, ingresa un email válido.";
    }

    /* Password validation */
    if (!values.password) {
      errors.password = "Campo requerido";
    } else if (values.password.length <= 6) {
      errors.password = "Tu contraseña debe de tener al menos 6 caracteres";
    }
    return errors;
  };

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
                      Crea tu cuenta hoy
                    </h1>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <Formik initialValues={{ name:"", email: "", password: "" }} validate={validateRegister}>
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
                            htmlFor="name"
                          >
                            Nombre completos
                          </label>
                          <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 dark:text-gray-100 bg-[#EEEEEE] dark:bg-[#3F425E] rounded-md font-urbanist text-base font-medium shadow focus:outline-none focus:ring-none w-full"
                            placeholder="Ingrese su nombre completo"
                          />
                          {errors.name && touched.name && (
                            <label
                              className="text-[#e6215d] text-sm font-urbanist font-semibold"
                              htmlFor="error-alert-for-email"
                            >
                              {errors.name}
                            </label>
                          )}
                        </div>
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
                            className="bg-[#6f4ef6] text-white text-base font-urbanist font-bold px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="submit"
                          >
                            <div className="inline-flex items-center">
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
                  <Link
                    className="text-gray-800 dark:text-[#34d69b] font-urbanist font-medium text-sm flex items-center"
                    to="/login"
                  >
                    <FaArrowLeft className="mr-2"/> Volver al inicio de sesión
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register