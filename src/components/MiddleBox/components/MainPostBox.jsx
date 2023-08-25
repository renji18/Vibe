import React, { useEffect, useState } from "react"
import { useFirebase } from "../../../firebase"
import { useSelector } from "react-redux"
import { FaUser } from "react-icons/fa"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { RiChat1Line } from "react-icons/ri"
import { FiSend } from "react-icons/fi"
import { BsBookmark, BsFillBookmarkFill, BsThreeDots } from "react-icons/bs"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import CommentModal from "../../Common/CommentModal"

const MainPostBox = ({ post }) => {

  const firebase = useFirebase()
  const [isLiked, setIsLiked] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  const [isComment, setIsComment] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const [currentContent, setCurrentContent] = useState(post?.content[0])

  const { likedPosts, savedPosts } = useSelector(
    (state) => state?.userData?.profile
  )

  useEffect(() => {
    const handleLikedPost = (id) => {
      const liked = likedPosts?.filter((p) => p === id)
      return liked?.length > 0 ? setIsLiked(true) : setIsLiked(false)
    }
    const handleSavedPost = (id) => {
      const saved = savedPosts?.filter((p) => p === id)

      return saved?.length > 0 ? setIsSaved(true) : setIsSaved(false)
    }
    handleLikedPost(post?.postId)
    handleSavedPost(post?.postId)
  }, [post?.postId, savedPosts, likedPosts])

  const likeHandler = () => {
    setIsLiked(!isLiked)
    firebase?.likePostHandler(post)
  }

  const saveHandler = () => {
    firebase?.savePostHandler(post?.postId)
  }

  const commentHandler = (comment) => {
    firebase?.commentOnPostHandler(post, comment)
    setCommentText("")
  }

  const commentChangeHandler = (e) => {
    setCommentText(e?.target?.value)
  }

  const openComment = () => {
    setIsComment(!isComment)
  }

  const handleNextImage = () => {
    let currentIndex = currentContentIndex
    if (currentIndex < post?.content?.length) {
      setCurrentContentIndex(currentIndex + 1)
      setCurrentContent(post?.content[currentIndex + 1])
    }
    return
  }

  const handlePreviousImage = () => {
    let currentIndex = currentContentIndex
    if (currentIndex > 0) {
      setCurrentContentIndex(currentIndex - 1)
      setCurrentContent(post?.content[currentIndex - 1])
    }
    return
  }

  return (
    <div className="mt-2">
      {post?.content && (
        <div className="mt-4">
          {/* Header */}
          <div className=" py-4 px-1 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-my-black-1 dark:bg-my-gray-1 rounded-full flex items-center justify-center">
                {post?.userImg ? (
                  <img
                    src={post?.userImg}
                    alt={post?.user}
                    className="rounded-full h-full scale-95"
                  />
                ) : (
                  <FaUser className="dark:filter-none invert w-3 h-3" />
                )}
              </div>
              <div className=" dark:text-white font-semibold cursor-pointer">
                {post?.user}
              </div>
            </div>
            <BsThreeDots className="dark:filter dark:invert" size={20} />
          </div>

          {/* Main Display */}
          <div
            className="w-full relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className={`${isHovering ? "block" : "hidden"}`}>
              {post?.content?.length > 1 && (
                <div className="absolute px-1 w-full top-1/2">
                  {currentContentIndex !== 0 && (
                    <div className="w-8 h-8 z-10 absolute left-1 cursor-pointer bg-black/60 flex justify-center items-center rounded-full">
                      <AiOutlineArrowLeft
                        onClick={handlePreviousImage}
                        className="text-white"
                      />
                    </div>
                  )}
                  {currentContentIndex !== post?.content?.length - 1 && (
                    <div className="w-8 h-8 z-10 absolute right-1 cursor-pointer bg-black/60 top-1/2 flex justify-center items-center rounded-full">
                      <AiOutlineArrowRight
                        onClick={handleNextImage}
                        className="text-white"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            {currentContent?.type === "image" && (
              <img
                src={currentContent?.content}
                alt="post"
                className="w-full"
                onDoubleClick={likeHandler}
              />
            )}
            {currentContent?.type === "video" && (
              <video
                src={currentContent?.content}
                alt="post_video"
                className="w-full"
                autoPlay
                loop
                controls
                muted
                onDoubleClick={likeHandler}
              />
            )}
          </div>

          {/* Footer */}
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
                <p className="dark:text-white text-sm font-semibold">{`${
                  post.likes.length
                } ${post.likes.length > 1 ? "likes" : "like"}`}</p>
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
        </div>
      )}
    </div>
  )
}

export default MainPostBox
