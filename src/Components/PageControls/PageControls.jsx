import React from "react"
import SearchBar from "../Common/SearchBar"
import Button from "../Common/Button"
import "./PageControls.css"
import { MdAddCircleOutline } from "react-icons/md"

export default function PageControls({
  inputplaceholder = "Search",
  addFunction = () => {},
  dropDowns = [],
  displayData,
  searchFunction
}) {

  return (
    <div className="top-controls-container">
      <div className="left-controls">
        <SearchBar
          placeholder={inputplaceholder}
          inputStyle={{ "width" : "calc(100vw*0.3)" }}
          info={displayData}
          setSearchResult={searchFunction}
        />

        <Button
          text={"Add"}
          btnClass="success"
          action={addFunction} // Fixed your faulty code @Rohan
          icon={<MdAddCircleOutline style={{ width: "1.5rem", height: "1.5rem" }} />}
        />
      </div>

      {/* Dropdowns will be placed here */}
      <div className="right-controls">
        {dropDowns.map((DropDown, index) => {
          return <DropDown key={index} />
        })}
      </div>
    </div>
  )
}
