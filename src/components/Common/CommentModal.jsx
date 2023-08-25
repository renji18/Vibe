import React, { useEffect } from "react"

const CommentModal = ({ post, closeComment }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => (document.body.style.overflow = "scroll")
  })

  return (
    <div className="fixed bg-black/60 z-10 inset-0 flex items-center justify-center">
      <div
        onClick={closeComment}
        title="close"
        className="absolute cursor-pointer top-0 bottom-0 left-0 right-0"
      ></div>
      <div className="bg-my-dark w-11/12 min-h-[90vh] z-20 rounded-lg p-6 relative">
        <div
          onClick={closeComment}
          className="absolute cursor-pointer text-white top-2 right-2 text-2xl italic"
        >
          X
        </div>
        <div className="flex gap-3">
          <p className="text-white font-semibold text-sm">{post?.userName}</p>
          <p className="text-white text-sm">{post?.desc}</p>
        </div>
        {post?.comments &&
          post?.comments.map((comm, key) => (
            <div key={key} className="flex items-center gap-3">
              <p className="text-white font-semibold mb-2 text-sm">
                {comm.userName}
              </p>
              <p className="text-white text-sm">{comm.comment}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CommentModal
