import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiChat1Line } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { CommentModal } from "../../";
import { useFirebase } from "../../../firebase";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

const MiddleBox = ({ post }) => {
  const firebase = useFirebase();
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const { likedPosts, savedPosts } = useSelector(
    (state) => state.userData.profile
  );

  useEffect(() => {
    const handleLikedPost = (id) => {
      const lik = likedPosts.filter((post) => post === id);
      return lik.length > 0 ? setIsLiked(true) : setIsLiked(false);
    };
    const handleSavedPost = (id) => {
      const sav = savedPosts.filter((post) => post === id);

      return sav.length > 0 ? setIsSaved(true) : setIsSaved(false);
    };
    handleLikedPost(post.postId);
    handleSavedPost(post.postId);
  }, [likedPosts, post.postId, savedPosts]);

  const likeHandler = () => {
    firebase.likePostHandler(post);
  };

  const saveHandler = () => {
    firebase.savePostHandler(post.postId);
  };

  const commentHandler = (comment) => {
    firebase.commentOnPostHandler(post, comment);
    setCommentText("");
  };

  const commentChangeHandler = (e) => {
    setCommentText(e.target.value);
  };

  const openComment = () => {
    setIsComment(!isComment);
  };

  return (
    <div className="mt-2">
      {post.content && (
        <div>
          {post.content.map((cont, key) => (
            <div key={key} className="mt-4">
              <div className=" py-4 px-1 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 translate-y-0.5 bg-my-black-1 dark:bg-my-gray-1 rounded-full flex items-center justify-center">
                    {post?.userImg ? (
                      <img
                        src={post.userImg}
                        alt={post.user}
                        className="rounded-full h-full scale-95"
                      />
                    ) : (
                      <FaUser className="dark:filter-none invert w-3 h-3" />
                    )}
                  </div>
                  <div className=" dark:text-white font-semibold cursor-pointer">
                    {post.user}
                  </div>
                </div>
                <BsThreeDots className="dark:filter dark:invert" size={20} />
              </div>
              {/* <img
                src={cont?.content}
                alt="post"
                className="w-full"
                onDoubleClick={likeHandler}
              /> */}
              {cont.type === "image" && (
                <img
                  src={cont.content}
                  alt="post"
                  className="w-full"
                  onDoubleClick={likeHandler}
                />
              )}
              {cont.type === "video" && (
                <video
                  src={cont.content}
                  alt="post"
                  className="w-full"
                  onDoubleClick={likeHandler}
                />
              )}
              <div className="flex items-center justify-between mt-2 ">
                <div className="flex items-center gap-3">
                  {isLiked ? (
                    <AiFillHeart
                      onClick={likeHandler}
                      className="cursor-pointer text-red-600"
                      size={28}
                    />
                  ) : (
                    <AiOutlineHeart
                      onClick={likeHandler}
                      className="cursor-pointer dark:filter dark:invert"
                      size={28}
                    />
                  )}
                  <RiChat1Line
                    onClick={openComment}
                    className="cursor-pointer dark:filter dark:invert"
                    size={28}
                  />
                  <FiSend
                    className="cursor-pointer dark:filter dark:invert"
                    size={25}
                  />
                </div>
                <div>
                  {isSaved ? (
                    <BsFillBookmarkFill
                      className="cursor-pointer dark:filter dark:invert"
                      size={23}
                      onClick={saveHandler}
                    />
                  ) : (
                    <BsBookmark
                      className="cursor-pointer dark:filter dark:invert"
                      size={23}
                      onClick={saveHandler}
                    />
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
                    onChange={commentChangeHandler}
                    className="w-full text-sm mt-2 bg-transparent outline-none dark:text-white text-my-black-1"
                  />
                  {commentText && (
                    <p
                      onClick={() => commentHandler(commentText)}
                      className="dark:text-my-gray-1 text-my-black-1 font-medium cursor-pointer text-xs"
                    >
                      POST
                    </p>
                  )}
                </div>
              </div>
              {isComment && (
                <div className="flex justify-center items-center">
                  <CommentModal post={post} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MiddleBox;
