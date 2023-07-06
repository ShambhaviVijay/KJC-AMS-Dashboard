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
  isRequired = true,
}) {
  return (
    <div className="input__group" style={inputGroupStyle}>
      
      {/* Label for the input */}
      <label htmlFor={name} className="input__label" style={lblStyle}>
        {label}
      </label>

      {/* Actual html input */}
      <input
        type={type}
        name={name}
        onChange={(e)=>changeHandler(e.target.checked)}
        className="input__field"
        placeholder={placeholder}
        style={inputStyle}
        disabled = {isDisabled}
        accept= {fileType}
        required = {isRequired}
        {...inputAttrs}
      />
    </div>
  )
}
