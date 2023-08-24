import React, { useCallback, useEffect, useRef, useState } from "react"
import { Sidebar } from "../components"
import { useSelector } from "react-redux"

const Profile = () => {
  const { profile } = useSelector((state) => state?.userData)

  // profilePic, personalPosts:[postIds], notifications, name, email, registered, uid, savedPosts:[postIds], verified, userName, chat, friends:[{uid, avatar, userName}], loginAt, accountType, bio, likedPosts:[postIds]

  return (
    <>
      <Sidebar />
      <div>
        <div className="h-52 pl-[108px] bg-orange-500">
          <button>Share</button>
        </div>
        <div className="pl-[108px] -mt-20">
          <img
            src={profile?.profilePic}
            className="h-[400px] w-[350px]"
            alt="profile Pic"
          />
          <p className="">{profile?.bio}</p>
        </div>
      </div>
    </>
  )
}

export default Profile
