"use client"

import { FaSun, FaMoon } from "react-icons/fa"
import "../styles/ThemeToggle.css"

const ThemeToggle = ({ darkTheme, toggleTheme }) => {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {darkTheme ? <FaSun /> : <FaMoon />}
      <span>{darkTheme ? "Tema Claro" : "Tema Escuro"}</span>
    </button>
  )
}

export default ThemeToggle
