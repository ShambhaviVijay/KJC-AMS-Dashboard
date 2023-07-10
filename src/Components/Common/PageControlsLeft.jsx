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
  addIsDisabled = false,
  styleSearchBox,
  valueSearchBox,
}) {

  return (
    <div className="left-controls">
      <Tooltip text={tooltipText} >
        <SearchBar
          placeholder={inputplaceholder}
          searchfuntion={searchfuntion}
          inputStyle={styleSearchBox}
          value={valueSearchBox}
        />
      </Tooltip>
      <Button
        text="Add"
        btnClass="success"
        clickHandler = {addFunction}
        isDisabled={addIsDisabled}
        icon={<MdAddCircleOutline style={{ width: "1.5rem", height: "1.5rem" }} />}
      />
    </div>
  )
}
