import { useState } from "react"
import "./TextField.css"

// InputBox from: https://uiverse.io/mrhyddenn/fluffy-bird-66
export default function TextField({
  name = "",
  label = "",
  type = "text",
  placeholder = "",
  inputGroupStyle = {},
  inputStyle = {},
  isDisabled = false,
  changeHandler = () => {},
  lblStyle = {},
  fileType = "",
  inputAttrs = [],
  inputValue = "",
  isRequired = true,
  value,
  pattern,
  errorMessage,
  minimumValue,
  maximumValue
}) {

  const[focused, setfocused] = useState(false)
  const handleFocus =()=> setfocused(true)
  return (
    <div className="input__group" style={inputGroupStyle}>
      
      {/* Label for the input */}
      <label htmlFor={name} className="input__label" style={lblStyle}>
        {label}
      </label>

      {/* Actual html input */}
      <input
        pattern={pattern}
        value={value}
        type={type}
        defaultValue={inputValue}
        defaultChecked={inputValue}
        name={name}
        min={minimumValue}
        max={maximumValue}
        style={inputStyle}
        onChange={changeHandler}
        className={`input__field${isDisabled? " disabled" :""} `}
        placeholder={placeholder}
        disabled = {isDisabled}
        accept= {fileType}
        required = {isRequired}
        onBlur={handleFocus}
        focused={String(focused)}
        {...inputAttrs}
      />
      <span className="error-message" >{errorMessage}</span>
    </div>
  )
}
