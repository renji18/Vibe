import React from "react";
import ProfileBox from "./components/ProfileBox";
import ChatBox from "./components/ChatBox";

const RightBox = ({ classStyles }) => {
  return (
    <div className={`py-4  right-0 top-0  h-screen bg-my-light dark:bg-my-dark space-y-4 ${classStyles}`}>
      <ProfileBox />
      <ChatBox />
      <p className="text-xs mt-4 text-black dark:text-my-gray-1">
        &copy; 2023 VIBE
      </p>
    </div>
  );
};

export default RightBox;
