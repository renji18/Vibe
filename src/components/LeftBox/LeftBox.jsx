import React from 'react'
import { SingleSuggestion } from "../";

const LeftBox = ({ classStyles }) => {
  return (
    <div className={`h-[55%] bg-my-light pt-8 dark:bg-my-dark
    ${classStyles}`}>
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