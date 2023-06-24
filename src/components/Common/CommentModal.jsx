import React from 'react'

const CommentModal = ({ post }) => {
    
  return (
    <div className="fixed bg-black/60 z-10 inset-0 flex items-center justify-center">
      <div className="bg-my-dark w-11/12 min-h-[90vh] rounded-lg p-6">
        <div className="flex gap-3">
          <p className="text-white font-semibold text-sm">{post?.userName}</p>
          <p className="text-white text-sm">{post?.desc}</p>
        </div>
        {post?.comments &&
          post?.comments.map((comm, key) => (
            <div key={key} className="flex items-center gap-3">
              <p className="text-white font-semibold text-sm">{comm.userName}</p>
              <p className="text-white text-sm">{comm.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommentModal