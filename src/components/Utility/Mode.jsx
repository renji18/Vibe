import React from "react";
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const Mode = ({ themeSwitch, classStyles }) => {
    const { isDarkTheme } = useSelector((state) => state.themeReducer);

  const toggleMode = () => {
    themeSwitch();
  };

  return (
    <div className={`${classStyles} cursor-pointer`}>
      <div
        className={`circle-mode-switch flex items-center justify-center overflow-hidden"
        }`}
      >
        <div
          className="circle  rounded-full w-10 h-10 flex items-center justify-center"
          onClick={toggleMode}
        >
          {!isDarkTheme ? (
            <FaMoon className="icon text-my-dark" />
          ) : (
            <BsFillSunFill className=" w-5 h-5 icon text-my-light" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Mode;
