import React from "react";
import { RightBox, LeftBox, Sidebar, MiddleSection } from "../components";

const Home = ({ themeSwitch }) => {
  return (
    <div className="w-full bg-purple-300 dark:bg-my-dark">
      <div className="flex w-full h-full  bg-my-light dark:bg-my-dark ">
        <div className="">
          <Sidebar themeSwitch={themeSwitch} classStyles="fixed" />
          <LeftBox classStyles="w-[20vw] ml-[8vw] fixed" />
          <MiddleSection classStyles="w-[47vw] ml-[29vw]" />
          <RightBox classStyles="w-[23vw] fixed" />
        </div>
      </div>
    </div>
  );
};

export default Home;
