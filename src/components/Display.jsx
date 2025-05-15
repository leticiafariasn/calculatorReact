import "../styles/Display.css"

const Display = ({ previousOperand, currentOperand, operation }) => {
  return (
    <div className="display">
      <div className="previous-operand">
        {previousOperand} {operation}
      </div>
      <div className="current-operand">{currentOperand}</div>
    </div>
  )
}

export default Display
