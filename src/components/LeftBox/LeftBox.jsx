import React from 'react'
import { SingleSuggestion } from "../";

const LeftBox = () => {
  return (
    <div className=" w-[20vw] h-[55%] bg-my-light ml-[8vw] pt-8 dark:bg-my-dark fixed">
      <div className="font-medium text-black dark:text-white tracking-wider pb-5">
        Suggestions
      </div>
      <div className="overflow-y-auto max-h-full rounded-md">
        <SingleSuggestion />
        <SingleSuggestion />
        <SingleSuggestion />
        <SingleSuggestion />
        <SingleSuggestion />
      </div>
    </div>
  );
}

export default LeftBox