import React, { useState } from "react";
import { Email, Otp, EnterDetails } from "../components";

const Register = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const step1Handler = () => {
    setStep1(false);
    setStep2(true);
  };

  const step2Handler = () => {
    setStep3(true);
    setStep2(false);
  };

  return (
    <div className="h-screen bg-my-light dark:bg-my-dark flex justify-center ">
      {step1 && (
        <Email
          title="REGISTER"
          text="ALREADY HAVE AN ACCOUNT? LOGIN NOW"
          linkTo="/login"
          handleClick={step1Handler}
        />
      )}
      {step2 && <Otp handleClick={step2Handler} />}
      {step3 && <EnterDetails />}
    </div>
  );
};

export default Register;
