"use client"

import { useState, useEffect } from "react"
import Calculator from "./components/Calculator"
import "./styles/App.css"

function App() {
  const [theme, setTheme] = useState("dark-theme")

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme"
    setTheme(newTheme)
    document.body.className = newTheme
  }

  useEffect(() => {
    document.body.className = theme
  }, [])

  return (
    <div className={`app ${theme}`}>
      <Calculator theme={theme} toggleTheme={toggleTheme} />
    </div>
  )
}

export default App
