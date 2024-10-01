import React from 'react'

const Button = ({text, func, className}) => {
  return (
    <button 
    onClick={func}
    className={`${className} bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-500 duration-300 ease-linear`}>{text}</button>
  )
}

export default Button