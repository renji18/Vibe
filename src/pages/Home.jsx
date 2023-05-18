import React from "react";
import { Button } from "../components";
import { useFirebase } from "../firebase";

const Home = () => {
   const firebase = useFirebase();

  return <div>
     <Button
         btnName={`SIGN OUT`}
         classStyles="mt-6 text-base"
         handleClick={firebase.signOutUser}
       />
  </div>;
};

export default Home;
