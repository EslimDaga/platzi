import Toggle from "../../components/DarkMode/ThemeToggle";

const Login = () => {
  return (
    <main>
      <section className="absolute w-full h-full bg-[#181b32] dark:">
        <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
          <Toggle />
        </div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#22253D] border-0">
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
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block text-white font-urbanist text-base font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Correo Electronico
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-100 bg-[#3F425E] rounded font-urbanist text-base font-medium shadow focus:outline-none focus:ring-none w-full"
                        placeholder="Ingrese su correo electronico"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block text-white font-urbanist text-base font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-100 bg-[#3F425E] rounded font-urbanist text-base font-medium shadow focus:outline-none focus:ring-none w-full"
                        placeholder="Ingrese su contraseña"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                          style={{ transition: "all .15s ease" }}
                        />
                        <span className="ml-2 font-urbanist text-base font-semibold text-white">
                          Recordar Sesión
                        </span>
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-base font-urbanist font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Iniciar sesión
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6">
                <div className="w-1/2">
                  <a
                    className="text-gray-300 font-urbanist font-medium"
                    href="/"
                  >
                    <small>¿Olvido su contraseña?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <a
                    className="text-gray-300 font-urbanist font-medium"
                    href="/"
                  >
                    <small className="">Crea una cuenta nueva</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
  }

export default Login;