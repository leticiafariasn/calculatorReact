import "../styles/Display.css"

function Display({ expression, result, theme }) {
  return (
    <div className={`display ${theme}`}>
      <div className="expression">{expression}</div>
      <div className="result">{result}</div>
    </div>
  )
}

export default Display
