import "./Button.css"

export default function Button({
  type = "button",
  text = "",
  btnClass = "primary",
  btnContainerClass,
  isDisabled = false,
  btnStyle = {},
  icon = null,
  clickHandler = () => {},
}) {
  return (
    <div className={`${btnContainerClass} btn-container`}>
      <button
        type={type}
        disabled={isDisabled}
        style={btnStyle}
        className={isDisabled ? "disabled" : btnClass}
        onClick={clickHandler}
      >
        {icon} {text}
      </button>
    </div>
  )
}
