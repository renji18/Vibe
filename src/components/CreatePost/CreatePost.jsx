import React, { useEffect, useRef, useState } from "react"
import { GiIronCross } from "react-icons/gi"
import { IoMdImages } from "react-icons/io"
import { RxDot } from "react-icons/rx"
import { RxDotFilled } from "react-icons/rx"
import { useFirebase } from "../../firebase"
import { toast } from "react-toastify"
import ContentViewer from "./ContentViewer"
import { useSelector } from "react-redux"
import { LOADER } from "../../assets"

const CreatePost = () => {
  const firebase = useFirebase()
  const imgRef = useRef(null)

  const { firebaseLoader } = useSelector((state) => state?.loader)

  const [desc, setDesc] = useState("")
  const [postData, setPostData] = useState([])

  const [content, setContent] = useState(0)

  const handleOpenFileManager = () => {
    imgRef.current.click()
  }

  const handleStoreImages = (files) => {
    if (postData.length === 10)
      return toast.info("You can post at max 10 pictures")
    if (postData.length + files.length > 10)
      return toast.info("You can post at max 10 pictures")
    let lastArrayIndex =
      postData?.length === 0 ? 0 : postData[postData?.length - 1]?.id + 100
    const updatedFilesData = Array.from(files)?.map((file) => {
      const fileType = String(file?.type)?.split("/")[0]
      return {
        id: lastArrayIndex++,
        file,
        type: fileType,
        url: URL.createObjectURL(file),
        duration: fileType === "image" && 0,
      }
    })
    setPostData([...postData, ...updatedFilesData])
  }

  const handleDeleteImage = (id) => {
    const filteredData = postData.filter((post) => post.id !== id)
    if (filteredData?.length === 0) return setPostData([])
    let prevSmallestIndex = 0
    for (let i = 0; i < filteredData.length; i++) {
      if (filteredData[i]?.id > id) break
      prevSmallestIndex = filteredData[i]?.id
    }
    setContent(
      prevSmallestIndex === 0 ? filteredData[0]?.id : prevSmallestIndex
    )
    setPostData(filteredData)
  }

  const handleVideoDuration = (id, duration) => {
    setPostData((prev) =>
      prev.map((i) => (i.id === id ? { ...i, duration } : i))
    )
  }

  const handleSetContent = (id) => {
    if (!postData) return
    const selectedItem = postData?.filter((post) => post?.id === id)
    return selectedItem[0]
  }

  const handleCloseModal = () => {
    const createPostModalRef = document.getElementById("createPostModal")
    createPostModalRef.classList.replace("flex", "hidden")
    setPostData([])
    setContent(0)
  }

  const handleCreatePost = () => {
    console.log(postData, desc)
    if (postData?.length < 1) return toast.error("Proper Data Not Provided")
    let flag = false
    postData.map((i) => {
      if (i.duration > 60) return (flag = true)
      return flag
    })
    if (flag) return toast.error("Video Too Long")
    firebase.createUserPostHandler({ postData, desc })
    setPostData([])
    setDesc("")
    handleCloseModal()
    toast.success("Post created successfully.")
  }

  return (
    <div
      id="createPostModal"
      className="hidden fixed justify-center bg-overlay-black/80 items-center z-50 top-0 bottom-0 left-0 right-0 "
    >
      <div className="bg-black flex flex-col justify-between p-5 relative w-1/2 h-2/3 rounded-3xl">
        <GiIronCross
          size={22}
          onClick={handleCloseModal}
          className="absolute top-[-2px] right-[-2px] rotate-45 border rounded-full p-1 bg-white cursor-pointer"
        />
        <div className="flex h-full mb-5">
          <div className="h-full w-5/6  ">
            {postData?.length > 0 && (
              <ContentViewer
                handleVideoDuration={handleVideoDuration}
                handleDeleteImage={handleDeleteImage}
                handleOpenFileManager={handleOpenFileManager}
                content={postData && handleSetContent(content)}
              />
            )}
            <div
              onClick={handleOpenFileManager}
              className={`h-full bg-my-black-3 ${
                postData?.length > 0 && "hidden"
              } text-white cursor-pointer flex justify-center flex-col gap-4 items-center`}
            >
              <IoMdImages size={62} />
              Upload Post
              <input
                type="file"
                ref={imgRef}
                className="hidden"
                onChange={(e) => handleStoreImages(e.target.files)}
                multiple
              />
            </div>
          </div>
          <div className="gap-1 flex flex-col justify-center items-center h-full w-1/6">
            {postData?.map((data) =>
              data?.id === content ? (
                <RxDotFilled
                  key={data?.id}
                  size={25}
                  className="text-white cursor-pointer"
                />
              ) : (
                <RxDot
                  key={data?.id}
                  onClick={() => setContent(data?.id)}
                  size={25}
                  className="text-white cursor-pointer"
                />
              )
            )}
          </div>
        </div>
        <div className="gap-5 flex justify-between">
          <textarea
            placeholder="I feel like..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="resize-none rounded-lg p-2 text-sm h-40 outline-none border-none w-full"
          ></textarea>
          <button
            onClick={handleCreatePost}
            className={`${
              firebaseLoader === true ? "bg-my-dark" : "bg-violet-600"
            } h-max self-end px-7 py-3 rounded-md`}
          >
            {firebaseLoader === true ? (
              <img src={LOADER} alt="loader" />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
