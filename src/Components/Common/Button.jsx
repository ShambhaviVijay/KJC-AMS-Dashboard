import "./Button.css"

export default function Button({
  type = "button",
  text = "",
  btnClass = "primary",
  isEnabled = true,
  btnStyle = {},
  icon = null,
  clickHandler = () => {},
}) {
  return (
    <div className="btn-container">
      <button type={type} disabled={isEnabled} style={btnStyle} className={btnClass} onClick={clickHandler}>
        {icon} {text}
      </button>
    </div>
  )
}
