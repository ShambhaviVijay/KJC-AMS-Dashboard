import "./DropDown.css"

export default function DropDown({
  name,
  label,
  options = [],
  lblStyle,
  isDisabled = false,
  selectedValue,
  selectStyle,
  changeHandler = () => {},
  optStyle = {},
  selectAttrs = [],
  placeholder,
  value,
}) {


  return (
    <div className="dropdown">
      {label && <label htmlFor={name} className="dropdown__label" style={lblStyle}>
        {label}
      </label>}

      <select
        placeholder={placeholder}
        name={name}
        disabled={isDisabled}
        defaultValue={selectedValue?selectedValue:"NoSelection"}
        {...selectAttrs}
        onChange={changeHandler}
        style={selectStyle}
        value={value}>
        {options.map((option, index) => (
          <option key={index} value={option.value} style={optStyle}>
            {option.name}
          </option>
        ))}
        <option disabled value="NoSelection"> -- Select {name} -- </option>
      </select>
    </div>
  )
}