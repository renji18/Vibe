import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { EnterDetails, Mode } from "./components";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [userTheme, setUserTheme] = useState("dark");

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
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            siteLoader || firebaseLoader ? (
              <Loader />
            ) : !profile ? (
              <Login />
            ) : !profile?.name ? (
              <EnterDetails />
            ) : (
              <Home />
            )
          }
        />
        <Route
          exact
          path="/register"
          element={
            siteLoader || firebaseLoader ? (
              <Loader />
            ) : !profile ? (
              <Register />
            ) : !profile?.name ? (
              <EnterDetails />
            ) : (
              <Home />
            )
          }
        />
      </Routes>
      <Mode themeSwitch={themeSwitch} />
    </BrowserRouter>
  );
}

export default App;
