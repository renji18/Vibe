import React from "react";
import { RightBox, Explore, Sidebar, SuggestionBox } from "../components";

const Home = ({ themeSwitch }) => {
  return (
    <div className="w-full bg-my-light dark:bg-my-dark">
      <div className="flex w-full h-full  bg-my-light dark:bg-my-dark ">
        <Sidebar themeSwitch={themeSwitch} />
        <SuggestionBox />
        <Explore />
        <RightBox />
      </div>
    </div>
  );
};

export default Home;
