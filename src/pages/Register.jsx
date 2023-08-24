import React from "react";
import { EmailAuth, Mode } from "../components";

const Register = ({themeSwitch}) => {
  return (
    <div className="h-screen bg-my-light dark:bg-my-dark flex justify-center ">
      <EmailAuth
        title="SIGN UP"
        text="ALREADY HAVE AN ACCOUNT? SIGN IN"
        linkTo="/"
      />
      <Mode themeSwitch={themeSwitch} classStyles="absolute right-5 bottom-5" />
    </div>
  );
};

export default Register;
