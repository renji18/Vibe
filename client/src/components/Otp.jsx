import React from 'react'
import { Button } from '../components';

const Otp = ({handleClick}) => {

  return (
    <div className="h-full flex flex-col justify-center items-center w-1/4 lgm:w-1/3 md:w-2/5 sm:w-4/5">
      <p className="text-xl"> Check your email for the OTP </p>
      <input
        className="dark:bg-my-black-1 bg-my-light border dark:border-my-black-1 border-my-gray-2 rounded-lg w-full outline-none font-poppins dark:text-my-light text-my-gray-2 text-base mt-4 px-4 py-3"
        placeholder="Enter the OTP"
      />
      <Button
        btnName="NEXT STEP"
        classStyles="mt-6 text-base w-full"
        handleClick={handleClick}
      />
    </div>
  );
}

export default Otp