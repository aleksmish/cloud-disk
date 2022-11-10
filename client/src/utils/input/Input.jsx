import React from 'react'
import "../../styles/input.css"

function Input({type, placeholder, name, onChange}) {
  return (
    <input type={type} placeholder={placeholder} name={name} onChange={onChange} required/>
  )
}

export default Input