import React, { useState } from "react";
import Button from "./Button";
import { useFirebase } from "../firebase";

const CreatePost = () => {
  const firebase = useFirebase();
  const [postData, setPostData] = useState({
    userContent: [],
    userImageUrl: "image url",
    desc: "desc",
  });

  return (
    <div
      id="createPostModal"
      className="hidden absolute justify-center items-center z-50 top-0 bottom-0 left-0 right-0 "
    >
      <div className="bg-my-dark/[.95] flex md:block rounded-3xl h-[60vh] w-[60vw] md:w-[50vw] sm:w-[90vw] sm:h-[80vh]">
        <div className="bg-red-500 w-1/2 md:w-full md:h-1/2 rounded-3xl">
          IMage
          <input
            type="file"
            onChange={(e) =>
              setPostData({
                ...postData,
                userContent: [
                  { file: e.target.files[0], type: "image" },
                  { file: e.target.files[0], type: "image" },
                ],
              })
            }
          />
        </div>
        <div className="bg-blue-500 w-1/2 md:w-full md:h-1/2 rounded-3xl">
          Context
        </div>
      </div>
      <Button
        btnName={`Close Create Post`}
        handleClick={() => {
          const createPostModalRef = document.getElementById("createPostModal");
          createPostModalRef.classList.replace("flex", "hidden");
        }}
      />
      <Button
        btnName={`Create Post`}
        handleClick={() => firebase.createUserPostHandler(postData)}
      />
    </div>
  );
};

export default CreatePost;
