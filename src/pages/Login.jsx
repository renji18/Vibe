import React from "react";

import { Email, Mode } from "../components";

const Login = ({ themeSwitch }) => {

  return (
    <div className="h-screen bg-my-light dark:bg-my-dark flex flex-col items-center ">
      <Email
        title="SIGN IN"
        text="NEW USER? SIGN UP"
        linkTo="/register"
      />
      <Mode themeSwitch={themeSwitch} />
    </div>
  );
};

export default Login;
