import Button from "../Common/Button"
import React from 'react'
import './EventDetails.css'
import TextField from "../Common/TextField"
import { useState } from "react"

const EventDetails = () => {
  
  const [isOpenforAll, setIsOpenforAll] = useState(false)
  const changeFileUploadState = (state) => {
    setIsOpenforAll(state)
  }

  return (
    <form className="addEventBody">
      <div className="formRight">
        <input type="file" name="backDrop"/> {/*onChange={handleImageChange */} 
        <TextField
          type="checkbox"
          inputGroupClass={"checkbox"}
          name="openForAll"
          changeHandler={changeFileUploadState}
          inputStyle={{"width": "auto"}}
          placeholder="Open for all"
          label="Open for all"
        />
        <TextField
          name="eventName"
          placeholder="Event Name"
        />
        {/* Yahan pe dropdown *2 */}
        <TextField
          name="eventDate"
          label="Event Date"
          type="date"
          placeholder="Date"
        />
        <div className="timeContainer">
          <TextField
            name="startTime"
            type="time"
            label="Start Time"
            placeholder="Start Time"
          />
          <TextField
            name="endTime"
            label="End Time"
            type="time"
            placeholder="End Time"
          />
        </div>
        <TextField
          name="participants"
          isDisabled={isOpenforAll}
          type="file"
          fileType=".csv"
          placeholder="Add participants list"
        />
      </div>
      <div className="formLeft">
        <div className="btn-holder">
          <Button
            // text={!creatingEvent ? "Finish" : "Creating Event"}
            btnClass="primary"
            type="submit"
            text="Create"
          />
        </div>
      </div>
    </form>
  )
}

export default EventDetails