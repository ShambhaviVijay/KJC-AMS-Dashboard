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
}) {


  return (
    <div className="dropdown">
      <label htmlFor={name} className="dropdown__label" style={lblStyle}>
        {label}
      </label>

      <select
        name={name}
        disabled={isDisabled}
        defaultValue={selectedValue?selectedValue:"NoSelection"}
        {...selectAttrs}
        onChange={changeHandler}
        style={selectStyle}>
        {options.map((option, index) => (
          <option key={index} value={option.value} style={optStyle}>
            {option.name}
          </option>
        ))}
        <option disabled value="NoSelection"> -- select {name} -- </option>
      </select>
    </div>
  )
}