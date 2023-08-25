import React from "react"
import { FaUser } from "react-icons/fa"
import { BsThreeDots } from "react-icons/bs"

const PostHeader = ({ userImg, userName }) => {
  return (
    <div className=" py-4 px-1 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-my-black-1 dark:bg-my-gray-1 rounded-full flex items-center justify-center">
          {userImg ? (
            <img
              src={userImg}
              alt={userName}
              className="rounded-full h-full scale-95"
            />
          ) : (
            <FaUser className="dark:filter-none invert w-3 h-3" />
          )}
        </div>
        <div className=" dark:text-white font-semibold cursor-pointer">
          {userName}
        </div>
      </div>
      <BsThreeDots className="dark:filter dark:invert" size={20} />
    </div>
  )
}

export default PostHeader
