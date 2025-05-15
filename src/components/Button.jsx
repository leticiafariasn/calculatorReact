"use client"

import "../styles/Button.css"

const Button = ({ children, className, onClick, id }) => {
  return (
    <button className={className} onClick={onClick} id={id}>
      {children}
    </button>
  )
}

export default Button
