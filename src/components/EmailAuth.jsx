// For Login and Register

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from ".";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
  visible,
  toggleVisibility,
  placeholder,
  classStyles,
}) => {
  return (
    <div
      className={`flex justify-between items-center dark:bg-my-black-1 bg-my-light border dark:border-my-black-1 border-my-gray-2 rounded-3xl w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base px-4 py-3 ${classStyles}`}
    >
      <input
        type={visible ? "text" : "password"}
        className="dark:bg-my-black-1 bg-my-light outline-none w-full"
        placeholder={placeholder}
      />
      {visible ? (
        <AiOutlineEyeInvisible className="w-5 h-5" onClick={toggleVisibility} />
      ) : (
        <AiOutlineEye className="w-5 h-5" onClick={toggleVisibility} />
      )}
    </div>
  );
};

const Email = ({ title, text, linkTo, handleClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-full flex flex-col justify-center w-1/4 lgm:w-1/3 md:w-2/5 sm:w-4/5">
      <h1 className="text-center text-2xl">{title}</h1>
      <div className="space-y-4 w-full">
        <input
          className="dark:bg-my-black-1 bg-my-light border dark:border-my-black-1 border-my-gray-2 rounded-3xl w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base mt-4 px-4 py-3"
          placeholder="Email"
        />
        <PasswordInput
          visible={showPassword}
          toggleVisibility={togglePassword}
          placeholder="Password"
        />
        {title === "REGISTER" && (
          <PasswordInput
            visible={showPassword}
            toggleVisibility={togglePassword}
            placeholder="Confirm Password"
            classStyles="mt-10"
          />
        )}
      </div>
      {title === "LOGIN" && (
        <Link to="/" className="text-xs text-end mt-1 -mb-4 text-my-gray-2">
          FORGOT PASSWORD?
        </Link>
      )}
      <Button
        btnName={title.toUpperCase()}
        classStyles="mt-8 text-base"
        handleClick={handleClick}
      />
      <Link to={linkTo} className="text-xs mt-2 text-end text-my-gray-2">
        {text}
      </Link>
    </div>
  );
};

export default Email;
