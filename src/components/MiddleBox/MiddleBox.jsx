import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { RiChat1Line } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { BiBookmark } from "react-icons/bi";


const MiddleBox = ({ post }) => {
    console.log(post.likes)
   
  return (
    <div className="mt-2">
      {post.content && (
        <div>
          {post.content.map((cont, key) => (
            <div key={key} className="mt-4">
              <div className=" p-4 flex justify-between items-center">
                <div className=" text-white font-semibold cursor-pointer">{post.user}</div>
                <BsThreeDots size={20} color="white" />
              </div>
              <img src={cont?.content} alt="post" className="w-full" />
              <div className="flex items-center justify-between mt-2 ">
                <div className="flex items-center gap-3">
                  <AiOutlineHeart size={28} color="white" />
                  <RiChat1Line size={28} color="white" />
                  <FiSend size={25} color="white" />
                </div>
                <div>
                  <BiBookmark size={25} color="white" />
                </div>
              </div>
              <div className="mt-1">
                {post.likes && post.likes.length > 0 && (
                  <p className="text-white text-sm font-semibold">{`${post.likes.length} likes`}</p>
                )}
                <div className=" flex gap-2 items-center">
                  <p className="text-white font-semibold">{post.user}</p>
                  {post.description && (
                    <p className="text-white">{post.description}</p>
                  )}
                </div>
                {post.comments && post.comments.length > 0 && (
                  <p className="text-my-gray-1 cursor-pointer mt-1 text-sm">
                    View all {post.comments.length} comments
                  </p>
                )}
                <input type="text" placeholder="Add a comment..." className="w-full text-sm mt-2 bg-my-dark outline-none text-white" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MiddleBox