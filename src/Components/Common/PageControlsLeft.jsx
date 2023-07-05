import React from "react"
import SearchBar from "./SearchBar"
import Button from "./Button"
import "./PageControlsLeft.css"
import { MdAddCircleOutline } from "react-icons/md"
import Tooltip from "./Tooltip"

export default function PageControls({
  inputplaceholder = "Search",
  addFunction = () => {},
  tooltipText,
  searchfuntion = () => {},
}) {

  return (
    <div className="left-controls">
      <Tooltip text={tooltipText} >
        <SearchBar
          placeholder={inputplaceholder}
          searchfuntion={searchfuntion}
        />
      </Tooltip>
      <Button
        text="Add"
        btnClass="success"
        clickHandler = {addFunction}
        icon={<MdAddCircleOutline style={{ width: "1.5rem", height: "1.5rem" }} />}
      />
    </div>
  )
}
