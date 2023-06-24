import React from 'react'
import { FaUser } from 'react-icons/fa';

const SingleSuggestion = () => {
  return (
    <div className="bg-purple-300 w-full py-2 px-4 dark:bg-my-black-1 flex items-center justify-between">
      <div className="space-x-4 flex">
        <div className="w-10 h-10 bg-my-black-1 dark:bg-my-gray-1 rounded-full flex items-center justify-center">
          <FaUser className="dark:filter-none invert" />
        </div> 
        <div className="">
          <p className="text-black dark:text-white text-sm font-normal tracking-wider">
            Rohit Singh
          </p>
          <p className="text-black dark:text-my-gray-1 text-xs font-normal tracking-wider">
            followed by rohit
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleSuggestion