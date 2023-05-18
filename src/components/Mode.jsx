import React, { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";

const Mode = ({ themeSwitch }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    themeSwitch();
  };

  return (
    <div className="absolute right-5 bottom-5 cursor-pointer">
      <div
        className={`circle-mode-switch flex items-center justify-center overflow-hidden"
        }`}
      >
        <div
          className={`circle ${
            isDarkMode ? "bg-my-light" : "bg-my-dark"
          } rounded-full w-10 h-10 flex items-center justify-center`}
          onClick={toggleMode}
        >
          {isDarkMode ? (
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
