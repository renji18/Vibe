// For Login and Register

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from ".";
import { useFirebase } from "../firebase";

const EnterDetails = () => {
  const [userFullName, setUserFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const firebase = useFirebase();

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleFullNameChange = (e) => {
    setUserFullName(e.target.value);
  };
  const handleBioChange = (e) => {
    setUserBio(e.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserProfileImage(file);
  };

  const handleClick = async () => {
    firebase.saveUserDataOnRegistration({
      userName: userName,
      name: userFullName,
      bio: userBio,
      profilePic: userProfileImage,
    });
    console.log(userName, userFullName, userBio);
    
  };

  return (
    <div className="h-screen bg-my-light dark:bg-my-dark flex flex-col items-center ">
      <div className="h-full flex flex-col justify-center w-1/4 lgm:w-1/3 md:w-2/5 sm:w-4/5">
        <h1 className="text-center text-2xl text-black dark:text-white">
          ENTER DETAILS
        </h1>
        <div className="space-y-4 w-full">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <input
            className="dark:bg-my-black-1 bg-my-light border dark:border-my-black-1 border-my-gray-2  w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base mt-4 px-4 py-3"
            placeholder="ENTER FULL NAME"
            value={userFullName}
            onChange={handleFullNameChange}
          />
          <input
            className="dark:bg-my-black-1 bg-my-light border dark:border-my-black-1 border-my-gray-2  w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base mt-4 px-4 py-3"
            placeholder="ENTER USERNAME"
            value={userName}
            onChange={handleNameChange}
          />
          <textarea
            className="dark:bg-my-black-1 bg-my-light border dark:border-my-black-1 border-my-gray-2  w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base mt-4 px-4 py-3"
            placeholder="ENTER BIO"
            value={userBio}
            onChange={handleBioChange}
          />
        </div>

        <Button
          btnName="SAVE"
          classStyles="mt-8 text-base"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default EnterDetails;
