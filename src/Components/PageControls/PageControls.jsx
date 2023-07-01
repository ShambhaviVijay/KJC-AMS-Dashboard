import React from "react"
import InputBox from "../Common/InputBox"
import Button from "../Common/Button"
import "./PageControls.css"
import { MdAddCircleOutline } from "react-icons/md"
import { FaSearch } from "react-icons/fa"

export default function PageControls({
  inputplaceholder = "Search",
  addFunction = () => {},
  dropDowns = [],
}) {
  const SearchButton = () => <Button text="Search" icon={<FaSearch />} />

  return (
    <div className="top-controls-container">
      <div className="left-controls">
        <InputBox
          placeholder={inputplaceholder}
          Button={SearchButton}
          style={{ width: "25vw" }}
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
