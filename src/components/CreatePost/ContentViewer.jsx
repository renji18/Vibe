import React from "react"
import { GiIronCross } from "react-icons/gi"
import { BiImageAdd } from "react-icons/bi"

const ContentViewer = ({
  content,
  handleVideoDuration,
  handleDeleteImage,
  handleOpenFileManager,
}) => {
  return (
    <div className="relative">
      <GiIronCross
        size={22}
        onClick={() => handleDeleteImage(content?.id)}
        className="absolute top-[-5px] z-10 right-[-5px] rotate-45 border rounded-full p-1 bg-white text-black cursor-pointer"
      />
      <BiImageAdd
        size={52}
        onClick={handleOpenFileManager}
        className="absolute top-[50%] right-[-20px] z-10 rounded-md border p-2 bg-white text-black cursor-pointer"
      />
      {content?.type === "image" && content?.file !== "" && (
        <img src={content?.url} alt="" />
      )}
      {content?.type === "video" && content?.file !== "" && (
        <video
          autoPlay
          muted
          loop
          src={content?.url}
          onCanPlayThrough={(e) =>
            handleVideoDuration(content?.id, e?.currentTarget?.duration)
          }
        ></video>
      )}
    </div>
  )
}

export default ContentViewer
