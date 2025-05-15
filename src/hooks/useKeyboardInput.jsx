"use client"

import { useEffect } from "react"

const useKeyboardInput = (
  appendNumber,
  chooseOperation,
  compute,
  deleteNumber,
  clear,
  currentOperand,
  previousOperand,
  operation,
) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (/[0-9]/.test(event.key)) {
        appendNumber(event.key)
      } else if (event.key === ".") {
        appendNumber(".")
      } else if (event.key === "+") {
        chooseOperation("+")
      } else if (event.key === "-") {
        chooseOperation("-")
      } else if (event.key === "*") {
        chooseOperation("×")
      } else if (event.key === "/") {
        event.preventDefault() // Previne o quick find no Firefox
        chooseOperation("/")
      } else if (event.key === "%") {
        chooseOperation("%")
      } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault()
        compute()
      } else if (event.key === "Backspace") {
        deleteNumber()
      } else if (event.key === "Escape") {
        clear()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [appendNumber, chooseOperation, compute, deleteNumber, clear, currentOperand, previousOperand, operation])
}

export default useKeyboardInput
