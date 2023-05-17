import React from "react";

import { Email } from "../components";

const Login = () => {

  return (
    <div className="h-screen bg-my-light dark:bg-my-dark flex flex-col items-center ">
      <Email
        title="SIGN IN"
        text="NEW USER? SIGN UP"
        linkTo="/register"
      />
    </div>
  );
};

export default Login;
