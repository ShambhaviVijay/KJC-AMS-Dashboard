import { FaSearch } from "react-icons/fa"
import Button from "./Button"
import "./SearchBar.css"

export default function SearchBar({
  placeholder,
  inputStyle = {},
  searchfuntion = () => {},
  value,
}) {
  return (
    <div className="searchbox" style={inputStyle}>
      <input
        onChange={(e) => searchfuntion(e.target.value)}
        type="text"
        name="search"
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}
