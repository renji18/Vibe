import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiChat1Line } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { CommentModal } from '../../';
import { useFirebase } from '../../../firebase';
import { useSelector } from 'react-redux';


const MiddleBox = ({ post }) => {
  const firebase = useFirebase();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const { likedPosts } = useSelector(state => state.userData.profile);

 

  useEffect(() => {
     const handleLikedPost = (id) => {
       const lik = likedPosts.filter((post) => post === id);

       console.log(lik, "lik");
       console.log(id, "id");
       return lik.length > 0 ? setIsLiked(true) : setIsLiked(false);
     };
   handleLikedPost(post.postId)
  }, [likedPosts, post.postId])
  

  const likeHandler = () => {
    setIsLiked(!isLiked);
    firebase.likePostHandler(post.postId);
  }

  const openComment = () => {
    setIsComment(!isComment);
  }

   
  return (
    <div className="mt-2">
      {post.content && (
        <div>
          {post.content.map((cont, key) => (
            <div key={key} className="mt-4">
              <div className=" p-4 flex justify-between items-center">
                <div className=" dark:text-white font-semibold cursor-pointer">
                  {post.user}
                </div>
                <BsThreeDots className="dark:filter dark:invert" size={20} />
              </div>
              <img src={cont?.content} alt="post" className="w-full" />
              <div className="flex items-center justify-between mt-2 ">
                <div className="flex items-center gap-3">
                  {isLiked ? (
                    <AiFillHeart onClick={likeHandler} className="cursor-pointer text-red-600" size={28} />
                  ) : (
                    <AiOutlineHeart
                      onClick={likeHandler}
                      className="cursor-pointer dark:filter dark:invert"
                      size={28}
                    />
                  )}
                  <RiChat1Line className="cursor-pointer dark:filter dark:invert" size={28} />
                  <FiSend className="cursor-pointer dark:filter dark:invert" size={25} />
                </div>
                <div>
                  {isSaved ? (
                    <BsFillBookmarkFill
                      className="cursor-pointer dark:filter dark:invert"
                      size={23}
                    />
                  ) : (
                    <BsBookmark className="cursor-pointer dark:filter dark:invert" size={23} />
                  )}
                </div>
              </div>
              <div className="mt-1">
                {post.likes && post.likes.length > 0 && (
                  <p className="dark:text-white text-sm font-semibold">{`${post.likes.length} likes`}</p>
                )}
                <div className=" flex gap-2 items-center">
                  <p className="dark:text-white font-semibold">{post.user}</p>
                  {post.description && (
                    <p className="dark:text-white">{post.description}</p>
                  )}
                </div>
                {post.comments && post.comments.length > 0 && (
                  <p
                    onClick={openComment}
                    className="dark:text-my-gray-1 text-my-black-1 cursor-pointer mt-1 text-sm"
                  >
                    View all {post.comments.length} comments
                  </p>
                )}
                <div className="flex items-center">
                  <textarea
                    placeholder="Add a comment..."
                    className="w-full text-sm mt-2 bg-transparent outline-none dark:text-white text-my-black-1"
                  />
                  <p className="dark:text-my-gray-1 text-my-black-1 font-medium cursor-pointer text-xs">
                    POST
                  </p>
                </div>
              </div>
              {isComment && (
                <div className="flex justify-center items-center">
                  <CommentModal
                    desc={post?.description}
                    userName={post?.user}
                    comments={post?.comments}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MiddleBox