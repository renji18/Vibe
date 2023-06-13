import React, { useState } from "react";
import images from "../../assets";
import { Menu } from "../";
import { Link } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { BiSearchAlt2, BiChat } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";
import { useSelector } from "react-redux";
import { TbNotification } from "react-icons/tb";

const Sidebar = ({ themeSwitch }) => {
  const [hideMenu, setHideMenu] = useState(true);
  const { profile } = useSelector((state) => state.userData);
  const { isDarkTheme } = useSelector((state) => state.themeReducer);

  const menuHandler = () => {
    setHideMenu(!hideMenu);
  };

  const handleCreatePost = () => {
    const createPostModalRef = document.getElementById("createPostModal");
    createPostModalRef.classList.replace("hidden", "flex");
  };

  return (
    <div className="h-full fixed z-10 flex items-center">
      <div className="flex justify-between items-center flex-col mx-4 h-[93vh]">
        <div className="flex-1 flex flex-col justify-between items-center bg-purple-500 dark:bg-my-black-1 rounded-[20px] w-[76px] py-4">
          <Link to="/">
            {isDarkTheme ? (
            <img src={images.dark_symbol} alt="vibe" className="w-8" />
            ) : (
              <img src={images.light_symbol} alt="vibe" className="w-8" />
            )
            }
          </Link>
          <div className="flex flex-col justify-start items-center gap-7 h-full mt-8">
            <Link to="/">
              <GrHomeRounded
                size={24}
                className="cursor-pointer dark:filter dark:invert"
                title="Home"
              />
            </Link>
            <Link to="/">
              <BiSearchAlt2
                size={30}
                className="cursor-pointer dark:filter dark:invert"
                title="Search"
              />
            </Link>
            <Link to="/">
              <MdOutlineExplore
                size={30}
                className="cursor-pointer dark:filter dark:invert"
                title="Explore"
              />
            </Link>
            <Link to="/">
              <BiChat
                size={29}
                className="cursor-pointer dark:filter dark:invert"
                title="Chat"
              />
            </Link>
            <Link to="/">
              <TbNotification
                size={32}
                className="cursor-pointer dark:filter dark:invert"
                title="Notifications"
              />
            </Link>
            <Link to="/">
              <FiPlusSquare
                size={26}
                className="cursor-pointer dark:filter dark:invert"
                title="Create"
                onClick={handleCreatePost}
              />
            </Link>
          </div>
          <div className="flex relative">
            <div className="flex flex-col items-center">
              <Link to="/">
                <div
                  title="Profile"
                  className="w-7 h-7 bg-my-black-1 dark:bg-my-gray-1 rounded-full flex items-center justify-center overflow-hidden"
                >
                  {profile.profilePic ? (
                    <img
                      src={profile.profilePic}
                      alt="profile"
                      className="rounded-full h-full scale-95"
                    />
                  ) : (
                    <FaUser
                      className="cursor-pointer dark:filter-none invert"
                    />
                  )}
                </div>
              </Link>

              <AiOutlineMenu
                size={25}
                className="cursor-pointer mt-5 dark:filter dark:invert"
                title="More"
                onClick={menuHandler}
              />
            </div>
            <div className="relative">
              {!hideMenu && (
                <Menu themeSwitch={themeSwitch} setHideMenu={setHideMenu} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
