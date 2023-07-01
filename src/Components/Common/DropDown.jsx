import "./DropDown.css"

export default function DropDown({
  name,
  label,
  options = [],
  lblStyle,
  selectStyle,
  optStyle,
  selectAttrs = [],
}) {
  return (
    <div className="dropdown">
      <label htmlFor={name} className="dropdown__label" style={lblStyle}>
        {label}
      </label>

      <select name={name} {...selectAttrs} style={selectStyle}>
        {options.map((option, index) => (
          <option key={index} value={option.value} style={optStyle}>
            {option.name}
            {console.log(option)}
          </option>
        ))}
      </select>
    </div>
  )
}
