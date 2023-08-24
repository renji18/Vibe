import React from "react";
import { RightBox, LeftBox, Sidebar, MiddleSection } from "../components";

const Home = ({ themeSwitch }) => {
  return (
    <div className="w-full bg-purple-300 dark:bg-my-dark">
      <div className="flex w-full h-full  bg-my-light dark:bg-my-dark ">
        <Sidebar themeSwitch={themeSwitch} />
        <LeftBox />
        <MiddleSection />
        <RightBox />
      </div>
    </div>
  );
};

export default Home;
