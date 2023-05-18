import React from "react";
import { Email, Mode } from "../components";

const Register = ({themeSwitch}) => {
  return (
    <div className="h-screen bg-my-light dark:bg-my-dark flex justify-center ">
      <Email
        title="SIGN UP"
        text="ALREADY HAVE AN ACCOUNT? SIGN IN"
        linkTo="/"
      />
      <Mode themeSwitch={themeSwitch} />
    </div>
  );
};

export default Register;
