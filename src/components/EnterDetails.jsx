// For Login and Register

import React, { useState, useRef } from "react";
import { Button, Mode } from ".";
import { useFirebase } from "../firebase";
import { FaUser } from "react-icons/fa";

const EnterDetails = ({ themeSwitch }) => {
  const [userFullName, setUserFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const firebase = useFirebase();

  const imgFile = useRef(null);
  const [userProfileImageUrl, setUserProfileImageUrl] = useState("");

  const NAME = /^(?!\s)(?![\s\S]*\s$)[A-Za-z0-9 ]+$/;
  const USERNAME = /^\S*$/;

  const handleNameChange = (e) => {
    setUserFullName(e.target.value);
    setNameError("");
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setUsernameError("");
  };

  const handleBioChange = (e) => {
    setUserBio(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserProfileImage(file);
    setUserProfileImageUrl(URL.createObjectURL(file));
  };

  const handleUploadImg = () => {
    imgFile.current.click();
  };

  const handleRemoveImg = () => {
    setUserProfileImage("");
    document.getElementById("inputImg").value = "";
  };

  const handleClick = async () => {
    let isValid = true;

    if (!userFullName) {
      setNameError("Full name is required");
      isValid = false;
    } else if (!NAME.test(userFullName)) {
      setNameError("Invalid name");
      isValid = false;
    }

    if (!userName) {
      setUsernameError("Username is required");
      isValid = false;
    } else if (!USERNAME.test(userName)) {
      setUsernameError("Invalid username");
      isValid = false;
    }

    if (isValid) {
      firebase.saveUserDataOnRegistration({
        userName: userName,
        name: userFullName,
        bio: userBio,
        profilePic: userProfileImage,
      });
    }
  };

  return (
    <div className="h-screen bg-my-light dark:bg-my-dark flex flex-col items-center">
      <div className="h-full flex flex-col justify-center w-1/4 lgm:w-1/3 md:w-2/5 sm:w-4/5">
        <h1 className="text-center text-2xl text-black dark:text-white">
          Enter Details
        </h1>
        <div className="space-y-4 w-full">
          <div className="flex items-center mt-4 flex-col">
            <input
              id="inputImg"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={imgFile}
            />
            {userProfileImage ? (
              <img
                onClick={handleUploadImg}
                src={userProfileImageUrl}
                alt="profile"
                className="w-[90px] h-[90px] rounded-full cursor-pointer"
              />
            ) : (
              <FaUser
                title="Upload Image"
                onClick={handleUploadImg}
                size={90}
                className="filter invert cursor-pointer text-my-light dark:text-my-dark"
              />
            )}
            {userProfileImage && (
              <p
                className="text-red-500 mt-1 cursor-pointer font-semibold"
                onClick={handleRemoveImg}
              >
                Remove Image
              </p>
            )}
          </div>
          <div>
            <input
              className={`dark:bg-my-black-1 bg-my-light border ${
                nameError
                  ? "border-red-500"
                  : "dark:border-my-black-1 border-my-gray-2"
              } w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base px-4 py-3`}
              placeholder="Enter Name"
              value={userFullName}
              onChange={handleNameChange}
            />
            {nameError && (
              <p className="mt-1 text-red-500 text-sm">{nameError}</p>
            )}
          </div>
          <div>
            <input
              className={`dark:bg-my-black-1 bg-my-light border ${
                usernameError
                  ? "border-red-500"
                  : "dark:border-my-black-1 border-my-gray-2"
              } w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base px-4 py-3`}
              placeholder="Enter Username"
              value={userName}
              onChange={handleUserNameChange}
            />
            {usernameError && (
              <p className="mt-1 text-red-500 text-sm">{usernameError}</p>
            )}
          </div>
          <textarea
            className="dark:bg-my-black-1 bg-my-light border dark:border-my-black-1 border-my-gray-2  w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base mt-4 px-4 py-1 resize-none"
            placeholder="Enter Bio"
            value={userBio}
            onChange={handleBioChange}
            rows={3}
          />
        </div>

        <Button
          btnName="SAVE"
          classStyles="mt-8 text-base"
          handleClick={handleClick}
        />
      </div>
      <Mode themeSwitch={themeSwitch} />
    </div>
  );
};

export default EnterDetails;
