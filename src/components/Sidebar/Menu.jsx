import React, { useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { FiSettings, FiBookmark } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";
import { themeSwitchAction } from "../../redux/actions";

const Menu = ({ themeSwitch, setHideMenu }) => {
  const [isDark, setIsDark] = useState(true);
  const { isDarkTheme } = useSelector((state) => state.themeReducer);

  const handleModeClick = () => {
    themeSwitch();
    // console.log(isDarkTheme)
    setHideMenu(true);
    setIsDark(!isDark);
  };

  const handleSavedClick = () => {
    setHideMenu(true);
  };

  const handleSettingsClick = () => {
    setHideMenu(true);
  };

  return (
    <div className="bg-my-light dark:bg-my-black-2 w-[250px] rounded-lg overflow-hidden absolute bottom-8 -left-10 ">
      <div className="w-full">
        <div
          onClick={handleModeClick}
          className="flex items-center pl-4 py-3 dark:hover:bg-my-black-3 cursor-pointer"
        >
          {isDark ? (
            <BsFillSunFill className=" filter invert ml-2" size={20} />
          ) : (
            <FaMoon className="ml-2" color="#24252D" size={20} />
          )}
          <span className="text-black dark:text-white ml-4">Switch Mode</span>
        </div>
        <div
          onClick={handleSavedClick}
          className="flex items-center pl-4 py-3 dark:hover:bg-my-black-3 cursor-pointer"
        >
          <FiBookmark className="filter invert ml-2" size={20} />
          <span className="text-black dark:text-white ml-4">Saved Posts</span>
        </div>
        <div
          onClick={handleSettingsClick}
          className="flex items-center pl-4 py-3 -mb-3 dark:hover:bg-my-black-3 cursor-pointer"
        >
          <FiSettings className="filter invert ml-2" size={20} />
          <span className="text-black dark:text-white ml-4 ">Settings</span>
        </div>
      </div>
      <div className="flex items-center mt-3 border-t border-my-black-1 dark:border-my-gray-3 pl-4 py-3 dark:hover:bg-my-black-3 cursor-pointer">
        <TbLogout className="filter invert ml-2" size={20} />
        <span className="text-black dark:text-white ml-4">Logout</span>
      </div>
    </div>
  );
};

export default Menu;
