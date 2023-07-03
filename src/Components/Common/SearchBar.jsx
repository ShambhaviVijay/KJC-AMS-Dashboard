import { FaSearch } from "react-icons/fa"
import Button from "./Button"
import "./SearchBar.css"

export default function SearchBar({
  placeholder,
  inputStyle = {},
  pageName,
  searchedText,
}) {
  const urlpage = "/"+ pageName

    return (
      <form
        action = {urlpage}
        method="GET"
        className="inputbox"
        style={inputStyle}>
        <input
          type="text"
          name="search"
          defaultValue={searchedText}
          placeholder={placeholder}
          className={"regular"} />
        <Button
          text="Search"
          type="submit"
          icon={<FaSearch />}
          />
      </form>
    )
  }