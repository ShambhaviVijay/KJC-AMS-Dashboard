import React, { useState } from "react"
import { createDocument, uploadFile,createDocumentWithCustomId } from "../../../Controllers/index"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import EventInfo from '../EventInfo/EventInfo'
import Button from "../../Common/Button"
import "./AddEvent.css"

function AddEvent({
  events,
  departments,
  clubs,
  venues,
  faculties,
}) {

  const navigate = useNavigate()
  const [creatingEvent, setcreatingEvent] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [eventData, setEventData] = useState({
    backDrop: "",
    openForAll: false,
    eventName: "",
    venue: "",
    organizer: "",
    eventDate: "",
    startTime: null,
    endTime: null,
    coordinators: [],
  })
  const [participants, setParticipants] = useState({})
  
  const eventNameList = events.map((event) => (event.eventName))

  const handleSubmit = async (e) => {
    //field checks
    if (!selectedFile) {
      toast.error('Please upload a Back Drop for the event')
      return
    } else if (Boolean(participants.length) == eventData.openForAll) {
      toast.error('Please upload Participants list as the event is not Open for All')
      return
    } else if (eventNameList.includes(eventData.eventName) || eventData.eventName == "") {
      toast.error("Please enter a unique Event Name")
      return
    } else if (eventData.venue =="" || eventData.organizer == "" ) {
      toast.error("Please add both Event Organizer and Event Venue")
      return
    } else if (eventData.eventDate =="" || eventData.startTime ==null || eventData.endTime ==null) {
      toast.error("Please enter Event Date and Time")
      return
    } else if (eventData.endTime <= eventData.startTime) {
      toast.error("End Time should be more than Start Time")
      return
    }
    setcreatingEvent(true)
    const downloadURL = await uploadFile(selectedFile, "BackDrop")
    eventData.backDrop = downloadURL
    const participantsDetail = {isPresent: false, takenBy: "", takenTime: null}
    try {
      e.preventDefault()
      const ref = await createDocument("/events", eventData)
      participants.forEach((participant) => {
        createDocumentWithCustomId("events/"+ref.id+"/Participants", participant.id, participantsDetail)
      });
      toast.success("Event created ")
      setcreatingEvent(false)
      navigate("/home", { state: eventData })
    } catch (err) {
      setcreatingEvent(false)
      toast.error("error while creating event")
      console.log(err)
    }
  }
  return (
    <div className="add-event-main">
      <Button
        type="submit"
        text='Create'
        btnContainerClass='absolute'
        clickHandler={handleSubmit}
      />
      <EventInfo
        backDropFile={setSelectedFile}
        departments={departments}
        clubs={clubs}
        venues={venues}
        faculties={faculties}
        returnEventInfo={setEventData}
        getParticipants={setParticipants}
      />
      { creatingEvent && 
        <div className='loader_center_parent' style={{position:"absolute", top:"0px", left:"0px", zIndex:"1000"}}><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
      }
    </div>
  )
}

export default AddEvent
