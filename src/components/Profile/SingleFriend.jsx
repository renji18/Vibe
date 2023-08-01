import React from "react"

const SingleFriend = ({ friend }) => {
  return (
    <div className="flex flex-col  items-center">
      <img
        src={friend?.avatar}
        alt="friends avatar"
        className=" h-24 w-24 object-contain"
      />
      <p>{friend?.userName}</p>
    </div>
  )
}

export default SingleFriend
