import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ visible, toggleVisibility, placeholder, classStyles }) => {
  return (
    <div className={`flex justify-between items-center dark:bg-my-black-1 bg-my-light border dark:border-my-black-1 border-my-gray-2 rounded-lg w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base px-4 py-3 ${classStyles}`}>
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
}

const Email = ({ title, text, linkTo, handleClick }) => {
   const [showPassword1, setShowPassword1] = useState(false);
   const [showPassword2, setShowPassword2] = useState(false);

    const togglePassword1 = () => {
      setShowPassword1(!showPassword1);
    };

    const togglePassword2 = () => {
      setShowPassword2(!showPassword2);
    };

  return (
    <div className="h-full flex flex-col justify-center w-1/4 lgm:w-1/3 md:w-2/5 sm:w-4/5">
      <h1 className="text-center text-2xl">{title}</h1>
      <div className="space-y-4 w-full">
        <input
          className="dark:bg-my-black-1 bg-my-light border dark:border-my-black-1 border-my-gray-2 rounded-lg w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base mt-4 px-4 py-3"
          placeholder="Email"
        />
        <PasswordInput
          visible={showPassword1}
          toggleVisibility={togglePassword1}
          placeholder="Password"
        />
        {title === "REGISTER" && (
          <PasswordInput
            visible={showPassword2}
            toggleVisibility={togglePassword2}
            placeholder="Confirm Password"
            classStyles="mt-10"
          />
        )}
      </div>
      {title === "LOGIN" && (
        <Link to="/" className="text-xs text-end mt-1 -mb-2 text-my-gray-2">
          FORGOT PASSWORD?
        </Link>
      )}
      <Button btnName={title.toUpperCase()} classStyles="mt-6 text-base" handleClick={handleClick} />
    <Link to={linkTo} className="text-xs mt-2 text-end text-my-gray-2">{text}</Link>
    </div>
  );
}

export default Email