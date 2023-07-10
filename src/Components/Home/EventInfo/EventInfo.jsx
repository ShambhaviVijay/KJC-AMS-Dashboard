import React,{ useState } from "react"
import './EventInfo.css'
import TextField from "../../Common/TextField"
import Button from "../../Common/Button"
import EventBanner from "./EventBanner"
import DropDown from "../../Common/DropDown"
import { FaFileUpload,FaFileDownload } from "react-icons/fa"
import { MdDeleteForever,MdUpdate } from 'react-icons/md'
import { toast } from "react-toastify"
import Papa from "papaparse";

export default function EventInfo ({
  allowEdit = false,
  eventData = null,
  deleteEventFunc = () => {},
  updateEventFunc = () => {},
  eventNameList,
  departments,
  clubs,
  venues,
  faculties,
  returnEventInfo
  }) {
  //display backdrop as in useState
  const [selectedFile, setSelectedFile] = useState( eventData ? eventData.backDrop : "" )
  
  //controls upload of Participants list
  const [isOpenforAll, setIsOpenforAll] = useState( eventData ? eventData.openForAll : false)
  const changeFileUploadState = (e) => {
    setIsOpenforAll(e.target.checked)
    returnEventInfo((prevData) => ({ ...prevData, "openForAll": e.target.checked }))
  }

  //shows all the available venues
  const venueOptions = venues.map((item) => ({
    value: item.id,
    name: item.id
  }))

  //shows all the added Organizers
  const organizers= [...departments, ...clubs]
  const organizersOptions = organizers.map((item) => ({
    value: item.id,
    name: item.id
  }))

  //convert epoch value got from eventData to timestamp
  const converEpochToTime = (epoch) =>{
    const unixMilliSeconds = epoch * 1000;
    const time = new Date(unixMilliSeconds);
    const hrs = time.getHours()<10 ? "0"+time.getHours() : time.getHours()
    const min = time.getMinutes()<10 ? "0"+time.getMinutes() : time.getMinutes()
    return hrs.toString() + ":" + min.toString()
  }

  //handle date for conversion of time into epoch and store date
  const [date,setDate] = useState("")
  const handleDate = (e) => {
    setDate(e.target.value)
    const { name, value } = e.target
    returnEventInfo((prevData) => ({ ...prevData, [name]: value }))
    returnEventInfo((prevData) => ({ ...prevData, "openForAll": isOpenforAll }))
  }
  //convert time to epoch with the use of date and store time
  const convertTimeToEpoch = (e) => {
    const { name } = e.target
    const time = e.target.value
    const [hours, minutes] = time.split(":")
    const timestamp = new Date(date)
    timestamp.setHours(hours, minutes, 0, 0)
    returnEventInfo((prevData) => ({ ...prevData, [name]: timestamp.getTime() }))
  }

  // takes csv file from the user and convert it to JSON format
  const participantsListToJSON = () => {
    let input = document.createElement('input')
    input.type = 'file'
    input.accept = '.csv'
    input.onchange = () => {
      let file = input.files[0]
      if (file) Papa.parse(file, {complete: (result) => returnEventInfo((prevData) => ({ ...prevData, "participants": result.data }))})
    }
    input.click()
  }

  //store field values in json format
  const storeData = (e) => {
    const { name, value } = e.target
    returnEventInfo((prevData) => ({ ...prevData, [name]: value }))
  }

  return (
    <form className="event-info-container">
      <div className="form-container">
        <div className="formRight">
          <EventBanner banner={selectedFile} />
          <TextField
            inputValue={isOpenforAll}
            name="openForAll"
            label="Open For All?"
            isDisabled={allowEdit}
            changeHandler={changeFileUploadState}
            type="checkbox"
            lblStyle={{"position": "relative", "top": "0px", "left": "0px"}}
            inputGroupStyle={{"display": "flex", "position": "relative", "justifyContent": "space-around"}}
            inputStyle={{"width": "auto","height": "max-content"}}
          />
          <TextField
            name="eventName"
            inputValue={eventData?eventData.eventName:""}
            label="Event Name *"
            changeHandler={ storeData }
            isDisabled = { eventData ? true : allowEdit }
            placeholder="Enter Event Name"
            inputGroupStyle={{ width: "100%" }}
          />
          <DropDown
            name="venue"
            isDisabled = { allowEdit }
            selectedValue={eventData?eventData.venue:''}
            label="Venue"
            changeHandler={ storeData }
            options={venueOptions}
            selectStyle={{ width: "100%" }}
          />
          <DropDown
            name="organizer"
            isDisabled = { allowEdit }
            selectedValue={eventData?eventData.organizer:''}
            changeHandler={ storeData }
            label="Organized By"
            options={organizersOptions}
            selectStyle={{ width: "100%" }}
          />
          <TextField
            isDisabled = { allowEdit }
            name="eventDate"
            inputValue={eventData?eventData.eventDate:""}
            changeHandler={ handleDate }
            minimumValue={new Date().toDateString()}
            label="Event Date"
            type="date"
            inputStyle={{ width: "100%" }}
          />
          <div className="event-time-container">
            <TextField
              name="startTime"
              changeHandler={convertTimeToEpoch}
              isDisabled = { allowEdit }
              label="Start time"
              inputValue={eventData?converEpochToTime(eventData.startTime):""}
              type="time"
              inputGroupStyle={{ width: "40%" }}
            />
            <TextField
              name="endTime"
              changeHandler={convertTimeToEpoch}
              isDisabled = { allowEdit }
              inputValue={eventData?converEpochToTime(eventData.endTime):""}
              label="End time"
              type="time"
              inputGroupStyle={{ width: "40%" }}
            />
          </div>
          <Button
            isDisabled = { allowEdit||isOpenforAll }
            text="Upload Participants List"
            icon={<FaFileUpload />}
            btnStyle={{ width: "100%", margin: "1rem 0px", flex: "1"}}
            clickHandler={participantsListToJSON}
          />
        </div>
        <div className="formLeft">
          <div className="faculty-list">
            {/* add faculty list code here */}
            {faculties /* ka code idhar */}
          </div>
          {eventData && <div className="btn-holder">
            <div className="update-delete-container">
              <Button
                text="Delete Event"
                isDisabled={ allowEdit }
                clickHandler={deleteEventFunc}
                btnClass="danger"
                icon={<MdDeleteForever />}
              />
              <Button
                text="Update Event"
                isDisabled={ allowEdit }
                clickHandler={updateEventFunc}
                btnStyle={{marginLeft:'2rem'}}
                icon={<MdUpdate />}
              />
            </div>
            <Button
              text="Download Participants List"
              icon={<FaFileDownload />}
              btnStyle={{ width: "100%", margin: "1rem 0px", flex: "1" }}
              clickHandler={(e) => {
                e.preventDefault()
                console.table(eventData)
              }}
            />
          </div>}
        </div>
      </div>
    </form>
  )
}