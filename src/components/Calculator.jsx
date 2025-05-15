"use client"

import { useState } from "react"
import Display from "./Display"
import ThemeToggle from "./ThemeToggle"
import "../styles/Calculator.css"

function Calculator({ theme, toggleTheme }) {
  const [expression, setExpression] = useState("")
  const [result, setResult] = useState("0")

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        const evalExpression = expression.replace(/x/g, "*")
        const calculatedResult = eval(evalExpression)
        setResult(calculatedResult.toString())
        setExpression(expression + "=" + calculatedResult)
      } catch (error) {
        setResult("Error")
      }
    } else if (value === "AC") {
      setExpression("")
      setResult("0")
    } else if (value === "DEL") {
      if (expression.length > 0) {
        setExpression(expression.slice(0, -1))
      }
    } else {
      setExpression(expression + value)
      try {
        const currentExpression = expression + value
        if (currentExpression.match(/[\d]+[+\-*/x][\d]+/)) {
          const evalExpression = currentExpression.replace(/x/g, "*")
          const calculatedResult = eval(evalExpression)
          setResult(calculatedResult.toString())
        } else {
          if (currentExpression.match(/^[\d.]+$/)) {
            setResult(currentExpression)
          }
        }
      } catch (error) {
      }
    }
  }

  return (
    <div className={`calculator ${theme}`}>
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      <Display expression={expression} result={result} theme={theme} />
      <div className="buttons">
        <button className="clear" onClick={() => handleButtonClick("AC")}>
          AC
        </button>
        <button className="delete" onClick={() => handleButtonClick("DEL")}>
          DEL
        </button>
        <button className="function" onClick={() => handleButtonClick("%")}>
          %
        </button>
        <button className="operator" onClick={() => handleButtonClick("/")}>
          /
        </button>

        <button onClick={() => handleButtonClick("7")}>7</button>
        <button onClick={() => handleButtonClick("8")}>8</button>
        <button onClick={() => handleButtonClick("9")}>9</button>
        <button className="operator" onClick={() => handleButtonClick("x")}>
          x
        </button>

        <button onClick={() => handleButtonClick("4")}>4</button>
        <button onClick={() => handleButtonClick("5")}>5</button>
        <button onClick={() => handleButtonClick("6")}>6</button>
        <button className="operator" onClick={() => handleButtonClick("-")}>
          -
        </button>

        <button onClick={() => handleButtonClick("1")}>1</button>
        <button onClick={() => handleButtonClick("2")}>2</button>
        <button onClick={() => handleButtonClick("3")}>3</button>
        <button className="operator" onClick={() => handleButtonClick("+")}>
          +
        </button>

        <button className="zero" onClick={() => handleButtonClick("0")}>
          0
        </button>
        <button onClick={() => handleButtonClick(".")}>.</button>
        <button className="equals" onClick={() => handleButtonClick("=")}>
          =
        </button>
      </div>
    </div>
  )
}

export default Calculator
