import React from "react";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useFirebase } from "../../../firebase";

const ProfileBox = () => {
  const firebase = useFirebase();

  const { profile } = useSelector((state) => state.userData);

  return (
    <div className="bg-purple-500 dark:bg-my-black-1 p-4 flex items-center justify-between rounded-lg">
      <div className="space-x-4 flex">
        <div className="w-12 h-12 bg-my-black-1 dark:bg-my-gray-1 rounded-full flex items-center justify-center overflow-hidden">
          {profile.profilePic ? (
            <img
              src={profile.profilePic}
              alt="profile"
              className="rounded-full h-full scale-95"
            />
          ) : (
            <FaUser className="dark:filter-none invert" />
          )}
        </div>
        <div>
          <p className="text-black dark:text-white -mb-1 font-semibold">
            {profile.userName}
          </p>
          <p className="text-black dark:text-white font-normal">
            {profile.name}
          </p>
        </div>
      </div>
      <TbLogout
        className="dark:filter dark:invert cursor-pointer"
        size={20}
        onClick={firebase.signOutUser}
      />
    </div>
  );
};

export default ProfileBox;
