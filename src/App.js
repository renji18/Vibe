import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import { useFirebase } from "./firebase/firebase";

function App() {
  const firebase = useFirebase();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <button onClick={() => firebase.signupWithGoogle("John@doe.com", "password")}>
        SIgn in user
      </button>
    </>
  );
}

export default App;
