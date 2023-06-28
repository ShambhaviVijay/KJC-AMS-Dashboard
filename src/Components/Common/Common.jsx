import "./Common.css"

// InputBox from: https://uiverse.io/mrhyddenn/fluffy-bird-66
export function InputBox({ name, label, type, placeholder, inputAttrs = [] }) {
  return (
    <div className="form__group">
      <input
        type={type}
        name={name}
        className="form__field"
        placeholder={placeholder}
        {...inputAttrs}
      />

      <label htmlFor={name} className="form__label">
        {label}
      </label>
    </div>
  )
}

export function TextArea({ name, placeholder, inputAttrs = [] }) {
  return (
    <textarea
      name={name}
      className={"form__textarea"}
      placeholder={placeholder}
      {...inputAttrs}></textarea>
  )
}

export function DropDown({ name, label, options, inputAttrs = [] }) {
  return (
    <div className="dropdown">
      <label htmlFor={name} className="dropdown__label">
        {label}
      </label>

      <select name={name} {...inputAttrs}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}