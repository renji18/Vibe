import React, { useState } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

const Display = ({
  likeHandler,
  handlePreviousImage,
  handleNextImage,
  currentContentIndex,
  currentContent,
  totalContent,
}) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      className="w-full relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`${isHovering ? "block" : "hidden"}`}>
        {totalContent > 1 && (
          <div className="absolute px-1 w-full top-1/2">
            {currentContentIndex !== 0 && (
              <div className="w-8 h-8 z-10 absolute left-1 cursor-pointer bg-black/60 flex justify-center items-center rounded-full">
                <AiOutlineArrowLeft
                  onClick={handlePreviousImage}
                  className="text-white"
                />
              </div>
            )}
            {currentContentIndex !== totalContent - 1 && (
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
  )
}

export default Display
