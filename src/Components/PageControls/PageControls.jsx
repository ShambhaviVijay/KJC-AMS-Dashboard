import React from 'react';
import InputBox from '../Common/InputBox'
import Button from '../Common/Button';
import "./PageControls.css"
import { MdSearch,MdAddCircleOutline } from "react-icons/md";

export default function PageControls({
  inputplaceholder = "Search", 
  addFunction }) {
  return (
    <div className="top-controls-container">
      <div className="left-controls">
        <InputBox style={{"width":"25vw"}} withButton={false} placeholder={inputplaceholder} buttonIcon={<MdSearch/>} btnText={"Search"} action={(string) => setText(string)} /> {/*click={searchEvent} */}
        <Button text={"Add"} icon={<MdAddCircleOutline/>} btnClass="add-event-btn" action={() => addFunction}/>
      </div>
      <div className="right-controls">
        <p>Dropdown </p>
      </div>
    </div>
  )
}

// const SearchButton = () => <Button text="Search" icon={<FaSearch />} />

// <Inputbox placeholder="Search Faculty" Button={SearchButton} />
// <Button
//   text="Search"
//   btnClass="success"
//   icon={<MdAddCircle style={{ height: "1.5rem", width: "1.5rem" }} />}
// />
// <Button
//   text="Search"
//   btnClass="danger"
//   icon={<MdDelete style={{ height: "1.5rem", width: "1.5rem" }} />}
// /> 