import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import { EnterDetails, Mode } from "./components";

function App() {
    const [isDark, setIsDark] = useState(true);
    const [userTheme, setUserTheme] = useState("dark");

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
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/enterDetails" element={<EnterDetails />} />
      </Routes>
      <Mode themeSwitch={themeSwitch} />
    </BrowserRouter>
  );
}

export default App;
