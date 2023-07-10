import React, { useState } from "react"
import { createDocument, uploadFile } from "../../../Controllers/index"
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
    participants: {},
  })

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0])
  }
  
  const eventNameList = events.map((event) => (event.eventName))

  const handleSubmit = async (e) => {
    const check = Boolean(eventData.participants.length) == eventData.openForAll
    console.log(check)
    if (Object.values(eventData).some(value=> value===""|| value===null || check )){
      toast.error("Please enter all fields")
      return
    }else if (eventNameList.includes(eventData.eventName) ){
      toast.error("Please enter a unique event name")
      return
    }
    try {
      e.preventDefault()
      setcreatingEvent(true)
      // eventData.eventName = eventData.Festname
      // eventData.startTime = convertTONano(eventData.startTime)
      // eventData.endTime = convertTONano(eventData.endTime)
      if (selectedFile) {
        const path = "banners"
        const downloadURL = await uploadFile(selectedFile, path)
        eventData.backDrop = downloadURL
      }
      await createDocument("/event", eventData)
      toast.success("Event created ")
      navigate("/home")
    } catch (err) {
      setcreatingEvent(false)
      toast.error("error while creating event")
      console.log(err)
    }
  }

  //add Create event submit in this page

  return (
    <div className="add-event-main">
      <Button type="submit" text='Create' btnContainerClass='absolute' clickHandler={handleSubmit}/>
      <EventInfo eventNameList={eventNameList} departments={departments} clubs={clubs} venues={venues} faculties={faculties} returnEventInfo={setEventData}/>
    </div>
  )
}

export default AddEvent
