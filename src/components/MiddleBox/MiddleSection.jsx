import React from 'react'
import MiddleBox from './components/MiddleBox';
import { useSelector } from "react-redux";

const MiddleSection = ({ classStyles }) => {
    const { posts } = useSelector((state) => state.postsData);

  return (
    <div className={`bg-my-light dark:bg-my-dark  min-h-screen py-4 px-4 ${classStyles}`}>
    {posts && posts.map((post, key) => (
      <MiddleBox key={key} post={post} />
      ))}  
      Hi
    </div>
  );
}

export default MiddleSection