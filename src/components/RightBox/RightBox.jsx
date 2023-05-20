import React from "react";
import ProfileBox from "./components/ProfileBox";
import ChatBox from "./components/ChatBox";


const RightBox = () => {
  return (
    <div className="p-4 fixed right-0 top-0 w-[23vw] h-screen bg-my-light dark:bg-my-dark space-y-4">
      <ProfileBox />
      <ChatBox />
      <p className="text-xs mt-4 text-black dark:text-my-gray-1">&copy;2023 VIBE</p>
    </div>
  );
};

export default RightBox;
