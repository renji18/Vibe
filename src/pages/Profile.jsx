import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { MdPermIdentity } from "react-icons/md"
import { MdEmail } from "react-icons/md"
import { MdAlternateEmail } from "react-icons/md"
import { Sidebar } from "../components"
import SingleFriend from "../components/Profile/SingleFriend"
import SOMEIMAGE from "../assets/light_vibe_logo.png"
import axios from "axios"

const Profile = () => {
  const [profileData, setProfileData] = useState({})
  const [visibleFriends, setVisibleFriends] = useState([])

  const { profile } = useSelector((state) => state?.userData)

  const SET_NUMBER_OF_FRIENDS_AT_A_TIME = 1

  useEffect(() => {
    const setUserProfile = () => {
      if (!profile) return
      setProfileData(profile)
      const profileCopy = Array.from(profile?.friends)
      setVisibleFriends(profileCopy?.slice(0, SET_NUMBER_OF_FRIENDS_AT_A_TIME))
    }
    setUserProfile()
  }, [profile])

  const showMoreFriends = () => {
    const currentFriends = visibleFriends
    if (currentFriends?.length === profile?.friends?.length) return
    const profileCopy = Array.from(profile?.friends)
    const newFriends = profileCopy?.slice(
      currentFriends?.length,
      currentFriends?.length + SET_NUMBER_OF_FRIENDS_AT_A_TIME
    )
    setVisibleFriends([...visibleFriends, ...newFriends])
  }

  return (
    <>
    <Sidebar />
      <div className="bg-black max-h-20 py-40">
      <div className="md:mx-20 mx-40 pt-10 bg-white">
        <div className="flex justify-center">
          <img
            className="rounded-full h-40 -mt-[120px]"
            src={profileData?.profilePic}
            alt="profile pic"
          />
        </div>
        <div className="justify-center mt-5 text-4xl flex items-center">
          <MdAlternateEmail />
          {profileData?.userName}
        </div>
        <div className="flex gap-2 items-center">
          <p>Name:</p>
          {profileData?.name}
        </div>
        <div className="flex items-center gap-2">
          <p>Email:</p>
          {profileData?.email} {profileData?.accountType}
        </div>
        <div className="flex items-center gap-2">
          <p>About:</p>
          {profileData?.bio}
        </div>
        <div className="flex mx-5 my-5 flex-wrap gap-5">
          {visibleFriends?.map((friend) => (
            <SingleFriend key={friend?.uid} friend={friend} />
          ))}
        </div>
        {profileData?.friends?.length > SET_NUMBER_OF_FRIENDS_AT_A_TIME &&
          profileData?.friends?.length !== visibleFriends?.length && (
            <button onClick={showMoreFriends}>Show More</button>
          )}
        <div>posts, saved, liked</div>
      </div>
    </div>
    </>
  )
}

export default Profile
