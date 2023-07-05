import "./DropDown.css"

export default function DropDown({
  name,
  label,
  options = [],
  lblStyle,
  selectStyle,
  onChangeFuntion = () => {},
  optStyle,
  selectAttrs = [],
}) {
  return (
    <div className="dropdown">
      <label htmlFor={name} className="dropdown__label" style={lblStyle}>
        {label}
      </label>

      <select name={name} {...selectAttrs} onChange={(e) => onChangeFuntion(e.target.value)} style={selectStyle}>
        {options.map((option, index) => (
          <option key={index} value={option.value} style={optStyle}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
