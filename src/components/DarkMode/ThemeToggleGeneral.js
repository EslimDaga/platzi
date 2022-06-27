import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/darkmode/ThemeContext";

const Toggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <div
        className={
          "md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-400 dark:bg-blue-600 rounded-full p-1 cursor-pointer" +
          (theme === "dark" ? " bg-gray-900" : "")
        }
        onClick={() => {
          setToggle(!toggle);
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        <div
          className={
            "bg-gray-100 md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
            (theme === "dark" ? " transform translate-x-6" : "")
          }
          onClick={() => {
            setToggle(!toggle);
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        ></div>
      </div>
    </>
  );
};

export default Toggle;
