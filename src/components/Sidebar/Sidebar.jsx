import React, { useState } from 'react'
import images from '../../assets';
import { Menu } from '../'
import { Link } from 'react-router-dom'
import { GrHomeRounded } from 'react-icons/gr'
import { BiSearchAlt2, BiChat } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUser } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { TbNotification } from 'react-icons/tb';

const Sidebar = ({themeSwitch}) => {
  const [hideMenu, setHideMenu] = useState(true);
  const { profile } = useSelector((state) => state.userData);

  const menuHandler = () => {
    setHideMenu(!hideMenu);
  }

  return (
    <div className="h-full fixed z-10 flex items-center">
      <div className="flex justify-between items-center flex-col mx-4 h-[93vh]">
        <div
          className="flex-1 flex flex-col justify-between items-center bg-my-light dark:bg-my-black-1
       rounded-[20px] w-[76px] py-4"
        >
          <Link to="/">
            <img src={images.dark_symbol} alt="vibe" className="w-10" />
          </Link>
          <div className="flex flex-col justify-start items-center gap-7 h-full mt-8">
            <Link to="/">
              <GrHomeRounded
                size={24}
                className="filter invert cursor-pointer"
                title="Home"
              />
            </Link>
            <Link to="/">
              <BiSearchAlt2
                size={30}
                className="filter invert cursor-pointer"
                title="Search"
              />
            </Link>
            <Link to="/">
              <MdOutlineExplore
                size={30}
                className="filter invert cursor-pointer"
                title="Explore"
              />
            </Link>
            <Link to="/">
              <BiChat
                size={29}
                className="filter invert cursor-pointer"
                title="Chat"
              />
            </Link>
            <Link to="/">
              <TbNotification
                size={32}
                className="filter invert cursor-pointer"
                title="Notifications"
              />
            </Link>
            <Link to="/">
              <FiPlusSquare
                size={26}
                className="filter invert cursor-pointer"
                title="Create"
              />
            </Link>
          </div>
            <Link to="/">
              <div
                title="Profile"
                className="w-8 h-8 bg-my-black-1 dark:bg-my-gray-1 rounded-full flex items-center justify-center overflow-hidden"
              >
                {profile.profilePic ? (
                  <img
                    src={profile.profilePic}
                    alt="profile"
                    className="rounded-full h-full scale-95"
                  />
                ) : (
                  <FaUser />
                )}
              </div>
            </Link>

          <AiOutlineMenu
            size={30} 
            className="filter mt-5 invert cursor-pointer"
            title="More"
            onClick={menuHandler}
            />
        </div>
      </div>
            {!hideMenu && (
              <Menu themeSwitch={themeSwitch} setHideMenu={setHideMenu} />
            )}
    </div>
  );
}

export default Sidebar