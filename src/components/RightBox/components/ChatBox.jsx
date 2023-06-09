import React from "react";
import { FaUser } from "react-icons/fa";

const SingleChatBox = () => {
  return (
    <div className="bg-my-gray-1 dark:bg-my-black-1 pt-4 flex items-center justify-between">
      <div className="space-x-4 flex">
        <div className="w-10 h-10 bg-my-black-1 dark:bg-my-gray-1 rounded-full flex items-center justify-center">
          <FaUser className="dark:filter-none invert" />
        </div>
        <div className="">
          <p className="text-black dark:text-white text-sm font-normal tracking-wider">
            Rohit Singh
          </p>
          <p className="text-black dark:text-white text-xs font-light">
            Rohit sent an attachment · <span>1hr</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const ChatBox = () => {
  return (
    <div className="bg-my-gray-1 dark:bg-my-black-1 h-[62%] py-4 pl-4 overflow-hidden rounded-lg">
      <p className="font-medium text-black dark:text-white tracking-wider">
        Message
      </p>
      <div className="overflow-y-auto max-h-full pb-4">
        <SingleChatBox />
        <SingleChatBox />
        <SingleChatBox />
        <SingleChatBox />
        <SingleChatBox />
        <SingleChatBox />
        <SingleChatBox />
        <SingleChatBox />
        <SingleChatBox />
        <SingleChatBox />
      </div>
    </div>
  );
};

export default ChatBox;
