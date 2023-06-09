import React from 'react'
import MiddleBox from './MiddleBox';
import { useSelector } from "react-redux";

const MiddleSection = () => {
    const { posts } = useSelector((state) => state.postsData);

  return (
    <div className="bg-my-light dark:bg-my-dark ml-[29vw] min-h-screen w-[47vw] py-4">
    {posts && posts.map((post, key) => (
      <MiddleBox key={key} post={post} />
      ))}  
      Hi
    </div>
  );
}

export default MiddleSection