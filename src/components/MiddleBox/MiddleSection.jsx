import React from "react"
import MainPostBox from "./components/MainPostBox"
import { useSelector } from "react-redux"

const MiddleSection = ({ classStyles }) => {
  const { posts } = useSelector((state) => state?.postsData)

  return (
    <div
      className={`bg-my-light dark:bg-my-dark  min-h-screen py-4 px-4 ${classStyles}`}
    >
      {posts &&
        posts?.map((post, key) => (
          <div key={key}>
            <MainPostBox post={post} />
          </div>
        ))}
    </div>
  )
}

export default MiddleSection
