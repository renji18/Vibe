import React from "react";
import { Email } from "../components";

const Register = () => {
  return (
    <div className="h-screen bg-my-light dark:bg-my-dark flex justify-center ">
      <Email
        title="SIGN UP"
        text="ALREADY HAVE AN ACCOUNT? SIGN IN"
        linkTo="/"
      />
    </div>
  );
};

export default Register;
