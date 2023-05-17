import React from "react";
import { useNavigate } from "react-router-dom";
import { Email } from "../components";
import { useFirebase } from "../firebase";

const Register = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const submitHandler = async () => {
    await firebase.signUpUserUsingEmailAndPassword();
    //  navigate("/");
  };

  return (
    <div className="h-screen bg-my-light dark:bg-my-dark flex justify-center ">
      <Email
        title="SIGN UP"
        text="ALREADY HAVE AN ACCOUNT? SIGN IN"
        linkTo="/login"
        handleClick={submitHandler}
      />
    </div>
  );
};

export default Register;
