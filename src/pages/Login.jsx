import React from "react";
import { useNavigate } from "react-router-dom";
import { Email } from "../components";

const Login = () => {
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate("/");
  };

  return (
    <div className="h-screen bg-my-light dark:bg-my-dark flex flex-col items-center ">
      <Email
        title="LOGIN"
        text="NEW USER? REGISTER NOW"
        linkTo="/register"
        handleClick={submitHandler}
      />
    </div>
  );
};

export default Login;
