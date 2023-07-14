import React, { useState } from "react"
import "./EventInfo.css"
import TextField from "../../Common/TextField"
import Button from "../../Common/Button"
import EventBanner from "./EventBanner"
import DropDown from "../../Common/DropDown"
import { FaFileUpload,FaFileDownload } from "react-icons/fa"
import { MdDeleteForever,MdUpdate } from 'react-icons/md'
import Papa from "papaparse";
import EventCoordinatorsList from "./EventCoordinatorList"

export default function EventInfo({
  allowEdit = false,
  eventData = null,
  deleteEventFunc = () => {},
  updateEventFunc = () => {},
  backDropFile,
  departments,
  clubs,
  venues,
  isEventOngoing = false,
  faculties,
  returnEventInfo,
  getParticipants = () => {},
  downloadCSV,
}) {
  //display backdrop as in useState
  const [selectedFile, setSelectedFile] = useState(eventData ? eventData.backDrop : "")
  const storeImage = (imageFile) => {
    setSelectedFile(imageFile)
    backDropFile(imageFile)
  }

  //controls upload of Participants list
  const [isOpenforAll, setIsOpenforAll] = useState(
    eventData ? eventData.openForAll : false
  )
  const changeFileUploadState = (e) => {
    setIsOpenforAll(e.target.checked)
    returnEventInfo((prevData) => ({ ...prevData, openForAll: e.target.checked }))
  }

  //shows all the available venues
  const venueOptions = venues.map((item) => ({
    value: item.id,
    name: item.id,
  }))

  //shows all the added Organizers
  const organizers = [...departments, ...clubs]
  const organizersOptions = organizers.map((item) => ({
    value: item.id,
    name: item.id,
  }))

  //convert epoch value got from eventData to timestamp
  const converEpochToTime = (epoch) => {
    const unixMilliSeconds = epoch
    const time = new Date(unixMilliSeconds)
    const hrs = time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
    const min = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
    return hrs.toString() + ":" + min.toString()
  }

  //disable clearing of date in View Event Page
  //handle date for conversion of time into epoch and store date
  const [date, setDate] = useState(eventData?eventData.eventDate:"")
  const handleDate = (e) => {
    setDate(e.target.value)
    if (e.target.value==""){
      toast.error("Date cannot be empty")
      return
    }
    const { name, value } = e.target
    returnEventInfo((prevData) => ({ ...prevData, [name]: value }))
    returnEventInfo((prevData) => ({ ...prevData, openForAll: isOpenforAll }))
  }
  //convert time to epoch with the use of date and store time
  const convertTimeToEpoch = (e) => {
    const { name,value } = e.target
    const [hours, minutes] = value.split(":")
    const timestamp = new Date(date)
    timestamp.setHours(hours, minutes, 0, 0)
    returnEventInfo((prevData) => ({ ...prevData, [name]: timestamp.getTime() }))
  }

  const [btnName, setBtnName] = useState("Upload Participants List")
  // takes csv file from the user and convert it to JSON format
  const participantsListToJSON = () => {
    let input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv"
    input.onchange = () => {
      let file = input.files[0]
      if (file) {
        Papa.parse(file, {
          delimiter: ',',
          dynamicTyping: true,
          header: true,
          complete: (result) => getParticipants(result.data)
        })
        setBtnName(file.name)
      }
    }
    input.click()
  }

  const downloadTemplate = async () => {
    const headers = [["participantId"],["The field should only contain participants Id"],["21bcac55"],["21bcac55"],["21bcac55"],["21bcac55"]]
    const csvFile = Papa.unparse(headers,{
      header:true,
      delimiter:",",
    })
    const blob = new Blob([csvFile], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "Participants-list.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  //store field values in json format
  const storeData = (e) => {
    const { name, value } = e.target
    returnEventInfo((prevData) => ({ ...prevData, [name]: value }))
  }

  //usestate for cordinator list
  const [coordinators, setCoordinators] = useState(eventData?eventData.coordinators:[])
  const addCoord = (id) => {
    setCoordinators(oldData => [...oldData, id])
    returnEventInfo((prevData) => ({ ...prevData, coordinators: [...prevData.coordinators, id] }))
  }
  
  const deleteCoord = (id) => {
    setCoordinators(coordinators.filter((item) => item != id))
    returnEventInfo((prevData) => ({ ...prevData, coordinators: prevData.coordinators.filter((item) => item != id) }))
  }

  return (
      <form className="form-container">
        <div className="formLeft">
          <EventBanner
            isDisabled={allowEdit}
            banner={selectedFile}
            takeImage={storeImage}
          />
          <div style={{ display:'flex',flex:'1',marginTop:'2rem',justifyContent: "flex-start"}}>
            <label style={{fontSize:'1.2rem'}}> Open For all</label>
          <input
            checked={isOpenforAll}
            name="openForAll"
            label="Open For All?"
            disabled={allowEdit}
            onChange={changeFileUploadState}
            type="checkbox"
            style={{marginLeft:"1rem"}}
          />
          </div>
          <TextField
            name="eventName"
            inputValue={eventData ? eventData.eventName : ""}
            label="Event Name *"
            changeHandler={storeData}
            isDisabled={eventData ? true : allowEdit}
            placeholder="Enter Event Name"
            inputGroupStyle={{ width: "100%", marginTop:'2rem'}}
          />
          <DropDown
            name="venue"
            isDisabled={allowEdit}
            selectedValue={eventData ? eventData.venue : ""}
            label="Venue"
            changeHandler={storeData}
            options={venueOptions}
            selectStyle={{ width: "100%" }}
          />
          <DropDown
            name="organizer"
            isDisabled={allowEdit}
            selectedValue={eventData ? eventData.organizer : ""}
            changeHandler={storeData}
            label="Organized By"
            options={organizersOptions}
            selectStyle={{ width: "100%" }}
          />
          <TextField
            isDisabled={allowEdit}
            name="eventDate"
            inputValue={eventData ? eventData.eventDate : ""}
            changeHandler={handleDate}
            minimumValue={new Date().toDateString()}
            label="Event Date"
            type="date"
            inputStyle={{ width: "100%" }}
          />
          <div className="event-time-container">
            <TextField
              name="startTime"
              changeHandler={convertTimeToEpoch}
              isDisabled={allowEdit}
              label="Start time"
              inputValue={eventData ? converEpochToTime(eventData.startTime) : ""}
              type="time"
              inputGroupStyle={{ width: "40%" }}
            />
            <TextField
              name="endTime"
              changeHandler={convertTimeToEpoch}
              isDisabled={allowEdit}
              inputValue={eventData ? converEpochToTime(eventData.endTime) : ""}
              label="End time"
              type="time"
              inputGroupStyle={{ width: "40%" }}
            />
          </div>
          <Button
            isDisabled = { allowEdit||isOpenforAll||isEventOngoing }
            text= {btnName}
            icon={<FaFileUpload />}
            btnStyle={{ width: "100%", margin: "1rem 0px", flex: "1"}}
            clickHandler={participantsListToJSON}
          />
        </div>
        <div className="formRight">
          <div className="faculty-list">
            <h4>Select Coordinators</h4>
            <EventCoordinatorsList
              faculties={faculties}
              addCoord={addCoord}
              deleteCord={deleteCoord}
              selectedCoord={coordinators}
              disable={allowEdit}
            />
          </div>
          {eventData ?
            <div className="btn-holder">
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
                clickHandler={downloadCSV}
                isDisabled={eventData.endTime>Date.now()}
              />
            </div>
            : <Button
                text="Download Participants Template"
                icon={<FaFileDownload />}
                btnStyle={{ width: "100%", margin: "1rem 0px", flex: "1",height: "4rem" }}
                clickHandler={downloadTemplate}
              />
          }
        </div>
      </form>
  )
}
