import "./TextField.css"

// InputBox from: https://uiverse.io/mrhyddenn/fluffy-bird-66
export default function TextField({
  name = "",
  label = "",
  type = "text",
  placeholder = "",
  inputStyle = {},
  lblStyle = {},
  inputAttrs = [],
}) {
  return (
    <div className="form__group">
      {/* Actual html input */}
      <input
        type={type}
        name={name}
        className="form__field"
        placeholder={placeholder}
        style={inputStyle}
        {...inputAttrs}
      />

      {/* Label for the input */}
      <label htmlFor={name} className="form__label" style={lblStyle}>
        {label}
      </label>
    </div>
  )
}
