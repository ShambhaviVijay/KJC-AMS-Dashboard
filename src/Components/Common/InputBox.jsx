import "./InputBox.css"

export default function InputBox({ placeholder, inputStyle = {}, Button = null }) {
    return (
      <div className="inputbox">
        <input type="text" placeholder={placeholder} className={"regular"} style={inputStyle} />
        {Button !== null && Button !== undefined && <Button />}
      </div>
    )
  }