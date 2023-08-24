import React from "react"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { RiChat1Line } from "react-icons/ri"
import { FiSend } from "react-icons/fi"
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs"
import CommentModal from "../../Common/CommentModal"

const PostFooter = ({
  isLiked,
  likeHandler,
  openComment,
  isSaved,
  saveHandler,
  post,
  commentText,
  commentChangeHandler,
  commentHandler,
  isComment,
}) => {
  return (
    <div>
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
            View {post.comments.length < 10 && post.comments.length}{" "}
            {post.comments.length > 1
              ? post.comments.length > 9
                ? "all comments"
                : "comments"
              : "comment"}
          </p>
        )}
        <div className="flex mt-1 items-center">
          <textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={commentChangeHandler}
            className="w-full resize-none text-sm mt-2 bg-transparent outline-none dark:text-white text-my-black-1"
          />
          {commentText && (
            <p
              onClick={() => commentHandler(commentText)}
              className="dark:text-white text-my-black-1 font-medium cursor-pointer text-xs bg-violet-600 px-3 py-2 rounded-md"
            >
              POST
            </p>
          )}
        </div>
      </div>
      {isComment && (
        <div className="flex justify-center items-center">
          <CommentModal post={post} closeComment={openComment} />
        </div>
      )}
    </div>
  )
}

export default PostFooter
