import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Login, NetworkError, Register } from "./pages"
import { EnterDetails, Loader } from "./components"
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CreatePost from "./components/CreatePost/CreatePost"
import { getSingleDoc } from "./firebase/utility"
import {
  networkReloadHandler,
  themeSwitchAction,
  updateTheme,
} from "./redux/actions"

function App() {
  const dispatch = useDispatch()
  const [isDark, setIsDark] = useState(true)
  const [userTheme, setUserTheme] = useState("dark")
  const [isOnline, setIsOnline] = useState(true)
  const { isDarkTheme } = useSelector((state) => state.themeReducer)

  const { profile } = useSelector((state) => state.userData)
  const { siteLoader, firebaseLoader } = useSelector((state) => state.loader)

  useEffect(() => {
    const themeSet = () => {
      if (userTheme === "dark") {
        document.documentElement.classList.add("dark")
        setIsDark(true)
        localStorage.setItem("theme", "dark")
        dispatch(updateTheme(true)) // Update the theme in Redux store
      } else {
        document.documentElement.classList.remove("dark")
        setIsDark(false)
        localStorage.setItem("theme", "light")
        dispatch(updateTheme(false)) // Update the theme in Redux store
      }
    }
    themeSet()
  }, [dispatch, userTheme])

  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setUserTheme("light")
      // dispatch(themeSwitchAction(false));
      setIsDark(false)
      return
    }
    document.documentElement.classList.add("dark")
    setUserTheme("dark")
    setIsDark(true)
    // dispatch(themeSwitchAction(true));
    localStorage.setItem("theme", "dark")
    dispatch(updateTheme(isDark))
  }

  useEffect(() => {
    const firstNetworkTest = async () => {
      const res = await getSingleDoc(
        "users",
        "internetTesterToCheckIfNetIsConnectedOrNot"
      )
      if (res) {
        setIsOnline(true)
      } else {
        setIsOnline(false)
      }
    }
    firstNetworkTest()
  }, [])

  useEffect(() => {
    const testNetwork = async () => {
      const res = await getSingleDoc(
        "users",
        "internetTesterToCheckIfNetIsConnectedOrNot"
      )
      if (res) {
        setIsOnline(true)
      } else {
        setIsOnline(false)
      }
    }
    setInterval(testNetwork, 5000)
    return () => {
      clearInterval(testNetwork)
    }
  }, [])

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
              siteLoader ? (
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
              siteLoader ? (
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
  )
}

export default App
