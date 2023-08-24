import React, { useEffect, useState } from "react"
import MainPostBox from "./components/MainPostBox"
import { useSelector } from "react-redux"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

const MiddleSection = ({ classStyles }) => {
  const { posts } = useSelector((state) => state?.postsData)

  const [postData, setPostData] = useState([])

  useEffect(() => {
    setPostData(posts)
  }, [posts])

  return (
    <div
      className={`bg-my-light dark:bg-my-dark  min-h-screen py-4 px-4 ${classStyles}`}
    >
      {postData &&
        postData?.map((post, key) => (
          <div key={key}>
            <MainPostBox post={post} />
          </div>
        ))}
    </div>
  )
}

export default MiddleSection
