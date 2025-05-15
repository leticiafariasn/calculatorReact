"use client"

import { useState, useEffect } from "react"
import Calculator from "./components/Calculator"
import ThemeToggle from "./components/ThemeToggle"
import "./App.css"

function App() {
  const [darkTheme, setDarkTheme] = useState(true)

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add("dark-theme")
      document.body.classList.remove("light-theme")
    } else {
      document.body.classList.add("light-theme")
      document.body.classList.remove("dark-theme")
    }
  }, [darkTheme])

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  return (
    <div className="app-container">
      <ThemeToggle darkTheme={darkTheme} toggleTheme={toggleTheme} />
      <Calculator />
    </div>
  )
}

export default App
