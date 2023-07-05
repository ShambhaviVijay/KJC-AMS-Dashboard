import React from "react"
import SearchBar from "./SearchBar"
import Button from "./Button"
import "./PageControlsLeft.css"
import { MdAddCircleOutline } from "react-icons/md"

export default function PageControls({
  inputplaceholder = "Search",
  addFunction = () => {},
  searchfuntion = () => {},
}) {

  return (
    <div className="left-controls">
      <SearchBar
        placeholder={inputplaceholder}
        searchfuntion={searchfuntion}
      />
      <Button
        text="Add"
        btnClass="success"
        clickHandler = {addFunction}
        icon={<MdAddCircleOutline style={{ width: "1.5rem", height: "1.5rem" }} />}
      />
    </div>
  )
}
