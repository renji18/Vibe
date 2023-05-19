import React from "react";
import { Button } from "../components";
import { useFirebase } from "../firebase";

const Home = () => {
  const firebase = useFirebase();

  return (
    <div>
      <Button
        btnName={`SIGN OUT`}
        classStyles="mt-6 text-base"
        handleClick={firebase.signOutUser}
      />

      {/* Logic for the Create Post Btn in Sidebar */}
      <Button
        btnName={`Create Post`}
        handleClick={() => {
          const createPostModalRef = document.getElementById("createPostModal");
          createPostModalRef.classList.replace("hidden", "flex");
        }}
      />
    </div>
  );
};

export default Home;
