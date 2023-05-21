import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, NetworkError, Register } from "./pages";
import { EnterDetails, Loader } from "./components";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./components/CreatePost";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [userTheme, setUserTheme] = useState("dark");
  const [isOnline, setIsOnline] = useState(null);

  const { profile } = useSelector((state) => state.userData);
  const { siteLoader, firebaseLoader } = useSelector((state) => state.loader);

  useEffect(() => {
    const themeSet = () => {
      document.documentElement.classList.add("dark");
      setUserTheme("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    };
    themeSet();
  }, []);

  // check internet status
  useEffect(() => {
    function detectInternet() {
      if (navigator.onLine) {
        setIsOnline(true);
        toast.success("Logged in successfully.");
        return;
      } else {
        setIsOnline(false);
        toast.warn("You are offline at the moment.");
        return;
      }
    }

    window.addEventListener("load", detectInternet);
    window.addEventListener("online", detectInternet);
    window.addEventListener("offline", detectInternet);

    return () => {
      window.removeEventListener("load", detectInternet);
      window.removeEventListener("online", detectInternet);
      window.removeEventListener("offline", detectInternet);
    };
  }, []);

  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setUserTheme("light");
      setIsDark(false);
      return;
    }
    document.documentElement.classList.add("dark");
    setUserTheme("dark");
    setIsDark(true);
    localStorage.setItem("theme", "dark");
  };
  return (
    <>
      <ToastContainer
        hideProgressBar
        theme="colored"
        newestOnTop
        draggable={false}
        toastStyle={{ color: "#333333" }}
      />
      <CreatePost />
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              siteLoader || firebaseLoader ? (
                <Loader />
              ) : !isOnline ? (
                <NetworkError />
              ) : !profile ? (
                <Login themeSwitch={themeSwitch} />
              ) : !profile?.name ? (
                <EnterDetails themeSwitch={themeSwitch} />
              ) : (
                <Home themeSwitch={themeSwitch} />
              )
            }
          />
          <Route
            exact
            path="/register"
            element={
              siteLoader || firebaseLoader ? (
                <Loader />
              ) : !isOnline ? (
                <NetworkError />
              ) : !profile ? (
                <Register themeSwitch={themeSwitch} />
              ) : !profile?.name ? (
                <EnterDetails themeSwitch={themeSwitch} />
              ) : (
                <Home themeSwitch={themeSwitch} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
