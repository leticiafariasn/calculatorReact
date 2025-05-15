"use client"

import { useEffect } from "react"

import { useState } from "react"
import Display from "./Display"
import Button from "./Button"
import "../styles/Calculator.css"

const Calculator = () => {
  const [currentOperand, setCurrentOperand] = useState("0")
  const [previousOperand, setPreviousOperand] = useState("")
  const [operation, setOperation] = useState(undefined)
  const [shouldResetScreen, setShouldResetScreen] = useState(false)

  const clear = () => {
    setCurrentOperand("0")
    setPreviousOperand("")
    setOperation(undefined)
  }

  const deleteNumber = () => {
    if (currentOperand === "0") return
    if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith("-"))) {
      setCurrentOperand("0")
    } else {
      setCurrentOperand(currentOperand.slice(0, -1))
    }
  }

  const appendNumber = (number) => {
    if (shouldResetScreen) {
      setCurrentOperand("")
      setShouldResetScreen(false)
    }

    if (number === "." && currentOperand.includes(".")) return

    if (currentOperand === "0" && number !== ".") {
      setCurrentOperand(number)
    } else {
      setCurrentOperand(currentOperand + number)
    }
  }

  const chooseOperation = (op) => {
    if (currentOperand === "0" && op === "-") {
      setCurrentOperand("-")
      return
    }

    if (currentOperand === "") return

    if (previousOperand !== "") {
      compute()
    }

    setOperation(op)
    setPreviousOperand(currentOperand)
    setShouldResetScreen(true)
  }

  const compute = () => {
    let computation
    const prev = Number.parseFloat(previousOperand)
    const current = Number.parseFloat(currentOperand)

    if (isNaN(prev) || isNaN(current)) return

    switch (operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "×":
        computation = prev * current
        break
      case "/":
        if (current === 0) {
          alert("Erro: Divisão por zero!")
          clear()
          return
        }
        computation = prev / current
        break
      case "%":
        computation = (prev * current) / 100
        break
      default:
        return
    }

    setCurrentOperand(computation.toString())
    setOperation(undefined)
    setPreviousOperand("")
    setShouldResetScreen(true)
  }

  const getDisplayNumber = (number) => {
    if (number === "Erro") return "Erro"

    const stringNumber = number.toString()
    const integerDigits = Number.parseFloat(stringNumber.split(".")[0])
    const decimalDigits = stringNumber.split(".")[1]

    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ""
    } else {
      integerDisplay = integerDigits.toLocaleString("pt-BR", {
        maximumFractionDigits: 0,
      })
    }

    if (decimalDigits != null) {
      return `${integerDisplay},${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

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
  }, [currentOperand, previousOperand, operation])

  return (
    <div className="calculator">
      <Display
        previousOperand={getDisplayNumber(previousOperand)}
        currentOperand={getDisplayNumber(currentOperand)}
        operation={operation}
      />
      <div className="buttons">
        <Button onClick={clear} className="operator" id="clear">
          AC
        </Button>
        <Button onClick={deleteNumber} className="operator" id="delete">
          DEL
        </Button>
        <Button onClick={() => chooseOperation("%")} className="operator" id="percentage">
          %
        </Button>
        <Button onClick={() => chooseOperation("/")} className="operator" id="divide">
          /
        </Button>

        <Button onClick={() => appendNumber("7")} className="number">
          7
        </Button>
        <Button onClick={() => appendNumber("8")} className="number">
          8
        </Button>
        <Button onClick={() => appendNumber("9")} className="number">
          9
        </Button>
        <Button onClick={() => chooseOperation("×")} className="operator" id="multiply">
          ×
        </Button>

        <Button onClick={() => appendNumber("4")} className="number">
          4
        </Button>
        <Button onClick={() => appendNumber("5")} className="number">
          5
        </Button>
        <Button onClick={() => appendNumber("6")} className="number">
          6
        </Button>
        <Button onClick={() => chooseOperation("-")} className="operator" id="subtract">
          -
        </Button>

        <Button onClick={() => appendNumber("1")} className="number">
          1
        </Button>
        <Button onClick={() => appendNumber("2")} className="number">
          2
        </Button>
        <Button onClick={() => appendNumber("3")} className="number">
          3
        </Button>
        <Button onClick={() => chooseOperation("+")} className="operator" id="add">
          +
        </Button>

        <Button onClick={() => appendNumber("0")} className="number">
          0
        </Button>
        <Button onClick={() => appendNumber(".")} className="number" id="decimal">
          .
        </Button>
        <Button onClick={compute} className="equals" id="equals">
          =
        </Button>
      </div>
    </div>
  )
}

export default Calculator
