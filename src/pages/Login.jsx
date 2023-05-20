import React from "react";

import { EmailAuth, Mode } from "../components";

const Login = ({ themeSwitch }) => {

  return (
    <div className="h-screen bg-my-light dark:bg-my-dark flex flex-col items-center ">
      <EmailAuth
        title="SIGN IN"
        text="NEW USER? SIGN UP"
        linkTo="/register"
      />
      <Mode themeSwitch={themeSwitch} classStyles="absolute right-5 bottom-5" />
    </div>
  );
};

export default Login;
