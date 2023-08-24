import React, { useEffect, useState } from "react"
import { useFirebase } from "../../../firebase"
import { useSelector } from "react-redux"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"
import Display from "./Display"

const MainPostBox = ({ post }) => {
  const firebase = useFirebase()
  const [isLiked, setIsLiked] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  const [isComment, setIsComment] = useState(false)
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
          <PostHeader userImg={post?.userImg} userName={post?.user} />
          <Display
            likeHandler={likeHandler}
            handlePreviousImage={handlePreviousImage}
            handleNextImage={handleNextImage}
            currentContentIndex={currentContentIndex}
            currentContent={currentContent}
            totalContent={post?.content?.length}
          />
          <PostFooter
            isLiked={isLiked}
            likeHandler={likeHandler}
            openComment={openComment}
            isSaved={isSaved}
            saveHandler={saveHandler}
            post={post}
            commentText={commentText}
            commentChangeHandler={commentChangeHandler}
            commentHandler={commentHandler}
            isComment={isComment}
          />
        </div>
      )}
    </div>
  )
}

export default MainPostBox
