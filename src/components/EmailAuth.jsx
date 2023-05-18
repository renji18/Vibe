// For Login and Register

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from ".";
import { useFirebase } from "../firebase";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
  visible,
  toggleVisibility,
  placeholder,
  classStyles,
  value,
  onChange,
}) => {
  return (
    <div
      className={`flex justify-between items-center dark:bg-my-black-1 bg-my-light border  w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base px-4 py-3 ${classStyles}`}
    >
      <input
        type={visible ? "text" : "password"}
        className="dark:bg-my-black-1 bg-my-light outline-none w-full"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {visible ? (
        <AiOutlineEyeInvisible className="w-5 h-5" onClick={toggleVisibility} />
      ) : (
        <AiOutlineEye className="w-5 h-5" onClick={toggleVisibility} />
      )}
    </div>
  );
};

const Email = ({ title, text, linkTo }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");
   const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const firebase = useFirebase();

const EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
// const NAME = /^(?!\s)(?![\s\S]*\s$)[A-Za-z0-9 ]+$/;
// const USERNAME = /^\S*$/;
// const NO_SPECIAL_CHARACTER = /^([A-Za-z])+[^*|\":<>[\]{}`\\()';@&$]+$/;

const validateEmail = (email) => {
  return EMAIL.test(email);
};

const validatePassword = (password) => {
  return PASSWORD.test(password);
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (password && confirmPassword !== "") {
    return password === confirmPassword;
  }
  return false;
};

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      setPasswordError("");
    };

 const handleConfirmPasswordChange = (e) => {
   setConfirmPassword(e.target.value);
   setConfirmPasswordError("");
 };

const handleClick = async () => {
  let isValid = true;

  if (!email) {
    setEmailError("Email is required");
    isValid = false;
  } else if (!validateEmail(email)) {
    setEmailError("Invalid email address");
    isValid = false;
  }

  if (!password) {
    setPasswordError("Password is required");
    isValid = false;
  } else if (!validatePassword(password)) {
    setPasswordError("Invalid password");
    isValid = false;
  }

  if (title === "SIGN UP") {
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      isValid = false;
    } else if (!validateConfirmPassword(password, confirmPassword)) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }
  }

  if (isValid) {
    title === "SIGN IN"
      ? firebase.signInUserUsingEmailAndPassword(email, password)
      : firebase.signUpUserUsingEmailAndPassword(email, password);
  }
};


   return (
     <div className="h-full flex flex-col justify-center w-1/4 lgm:w-1/3 md:w-2/5 sm:w-4/5">
       <h1 className="text-center text-2xl text-black dark:text-white">
         {title}
       </h1>
       <div className="space-y-4 w-full">
         <input
           className={`dark:bg-my-black-1 bg-my-light border ${
             emailError
               ? "border-red-500"
               : "dark:border-my-black-1 border-my-gray-2"
           }  w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base mt-4 px-4 py-3`}
           placeholder="Email"
           value={email}
           onChange={handleEmailChange}
         />
         {emailError && <p className="-mt-2 text-red-500 text-sm">{emailError}</p>}
         <PasswordInput
           visible={showPassword}
           toggleVisibility={togglePassword}
           placeholder="Password"
           value={password}
           onChange={handlePasswordChange}
           classStyles={
             passwordError
               ? "border-red-500"
               : "dark:border-my-black-1 border-my-gray-2"
           }
         />
         {passwordError && (
           <p className="-mt-2 text-red-500 text-sm">{passwordError}</p>
         )}
         {title === "SIGN UP" && (
           <>
             <PasswordInput
               visible={showPassword}
               toggleVisibility={togglePassword}
               placeholder="Confirm Password"
               value={confirmPassword}
               onChange={handleConfirmPasswordChange}
             />
             {confirmPasswordError && (
               <p className="text-red-500 text-sm">{confirmPasswordError}</p>
             )}
           </>
         )}
       </div>
       {title === "SIGN IN" && (
         <Link to="/" className="text-xs text-end mt-1 -mb-4 text-my-gray-2">
           FORGOT PASSWORD?
         </Link>
       )}
       <Button
         btnName={`${title.toUpperCase()} WITH EMAIL`}
         classStyles="mt-8 text-base"
         handleClick={handleClick}
       />
       <Link
         to={linkTo}
         className="text-xs mt-2 text-end text-my-gray-2 border-b border-my-gray-1 pb-3"
       >
         {text}
       </Link>
       <Button
         btnName={`SIGN OUT`}
         classStyles="mt-6 text-base"
         handleClick={firebase.signOutUser}
       />
     </div>
   );
};


export default Email;
