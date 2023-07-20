import React, { useState } from "react"
import { Button } from "../components"
import { useFirebase } from "../firebase"
import { toast } from "react-toastify"
import { handleUserNameExist } from "../firebase/utility"
import { useSelector } from "react-redux"

const CreatePost = () => {
  const firebase = useFirebase()

  const [desc, setDesc] = useState(null)
  const [postData, setPostData] = useState([
    {
      id: 1,
      file: "", // for sending to the backend
      type: "",
      url: "", // for displaying here
    },
  ])

  const handleSaveUserImage = (id, file) => {
    const fileType = String(file?.type)?.split("/")[0]
    if (fileType === "image") {
      setPostData((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                file,
                type: "image",
                url: URL.createObjectURL(file),
                duration: 0,
              }
            : i
        )
      )
    } else if (fileType === "video") {
      setPostData((prev) =>
        prev.map((i) =>
          i.id === id
            ? { ...i, file, type: "video", url: URL.createObjectURL(file) }
            : i
        )
      )
    } else {
      toast.error("Invalid file uploaded")
    }
  }

  const handleVideoDuration = (id, duration) => {
    setPostData((prev) =>
      prev.map((i) => (i.id === id ? { ...i, duration } : i))
    )
  }

  const handleAddInputTag = () => {
    setPostData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        file: "",
        type: "",
        url: "",
      },
    ])
  }

  const handleCreatePost = () => {
    let flag1 = false
    postData.map((i) => {
      if (!i.file) return (flag1 = true)
      return flag1
    })
    if (flag1) return toast.error("Proper Data Not Provided")
    let flag2 = false
    postData.map((i) => {
      if (i.duration > 60) return (flag2 = true)
      return flag2
    })
    if (flag2) return toast.error("Video Too Long")
    firebase.createUserPostHandler({ postData, desc })
    setPostData([
      {
        id: 1,
        file: "",
        type: "",
        url: "",
      },
    ])
    setDesc(null)
  }

  const handleShowModal = () => {
    const createPostModalRef = document.getElementById("createPostModal")
    createPostModalRef.classList.replace("flex", "hidden")
  }

  return (
    <div
      id="createPostModal"
      className="hidden fixed justify-center bg-red-500/[.85] items-center z-50 top-0 bottom-0 left-0 right-0 "
    >
      <div className="bg-my-dark p-5 relative w-1/2 h-2/3 rounded-3xl">
        <div className=" rounded-3xl">
          {postData?.map((tag, index) => (
            <div key={index}>
              {tag?.type === "image" && tag?.file !== "" && (
                <img src={tag?.url} alt="" />
              )}{" "}
              {tag?.type === "video" && tag?.file !== "" && (
                <video
                  autoPlay
                  muted
                  loop
                  src={tag?.url}
                  onCanPlayThrough={(e) =>
                    handleVideoDuration(tag?.id, e?.currentTarget?.duration)
                  }
                ></video>
              )}
              <input
                type="file"
                onChange={(e) =>
                  handleSaveUserImage(tag?.id, e?.target?.files[0])
                }
              />
            </div>
          ))}
          <button className="bg-white" onClick={handleAddInputTag}>
            Add More Content
          </button>
        </div>
        <div className=" w-1/2 md:w-full md:h-1/2 rounded-3xl">Context</div>
        <input
          type="text"
          placeholder="desc"
          onChange={(e) => setDesc(e?.target?.value)}
        />
      </div>
      <Button btnName={`Close Create Post`} handleClick={handleShowModal} />
      <Button btnName={`Create Post`} handleClick={handleCreatePost} />
    </div>
  )
}

export default CreatePost
