import React, { useState, useEffect } from "react"
import { MdCalendarMonth } from "react-icons/md"
import { createDocument, readDocuments, uploadFile } from "../../../Controllers/index"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import PageHeader from "../../Common/PageHeader"
import EventBanner from "../EventBanner"
import TextField from "../../Common/TextField"
import DropDown from "../../Common/DropDown"
import Button from "../../Common/Button"

import "./AddEvent.css"
import { FaFileUpload } from "react-icons/fa"

function AddEvent() {
  const navigate = useNavigate()
  const [venues, setvenues] = useState([])
  const [organizers, setorganizers] = useState([])
  const [creatingEvent, setcreatingEvent] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [eventData, setEventData] = useState({
    Festname: "",
    organizer: "",
    venue: "",
    startTime: null,
    endTime: null,
    eventDate: new Date(),
    description: "",
    deptName: "",
    openForAll: false,
    coordinators: [],
    backDrop: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEventData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const getDeptVenue = async () => {
    try {
      const venues = await readDocuments("venue")
      // const organizers = await readDocuments("/organizers")
      setvenues(venues)
      setdepartments(departments)
      console.log(venues, departments)
    } catch (err) {
      toast.error("An error occured while fetching data")
    }
  }

  useEffect(() => {
    getDeptVenue()
  }, [])

  function convertTONano(timeString) {
    const [hours, minutes] = timeString.split(":")
    const timestamp = new Date()
    timestamp.setHours(hours, minutes, 0, 0)
    return timestamp.getTime()
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setcreatingEvent(true)
      eventData.eventName = eventData.Festname
      eventData.startTime = convertTONano(eventData.startTime)
      eventData.endTime = convertTONano(eventData.endTime)
      if (selectedFile) {
        const path = "banners"
        const downloadURL = await uploadFile(selectedFile, path)
        eventData.backDrop = downloadURL
      }
      await createDocument("Event", eventData)
      toast.success("Event created ")
      navigate("/events/allevents")
    } catch (err) {
      setcreatingEvent(false)
      toast.error("error while creating event")
      console.log(err)
    }
  }

  return (
    <div className="add-event-main">
      <PageHeader title="Add Event" icon={<MdCalendarMonth />} />
      <div className="event-info-container">
        <div className="event-info">
          <EventBanner />

          <form>
            <TextField
              name="event-name"
              label="Event Name *"
              placeholder="Enter Event Name"
              inputGroupStyle={{ width: "100%" }}
            />

            <DropDown
              name="venue"
              label="Venue"
              options={[
                { name: "Auditorium M 1", value: "audi-m1" },
                { name: "Auditorium M 2", value: "audi-m2" },
                { name: "Auditorium M 3", value: "audi-m3" },
                { name: "Lab AL 1", value: "lab-al1" },
                { name: "Lab M 1", value: "lab-m1" },
                { name: "Lab M 2", value: "lab-m2" },

              ]}
              selectStyle={{ width: "100%" }}
            />

            <DropDown
              name="organizer"
              label="Organized By"
              options={[
                { name: "Computer Science Dept.", value: "cs-dept" },
                { name: "Life Sciences Dept.", value: "ls-dept" },
                { name: "CSA", value: "CSA" },
                { name: "NSS", value: "NSS" },

              ]}
              selectStyle={{ width: "100%" }}
            />

            <TextField
              name="event-date"
              label="Event Date"
              type="date"
              inputStyle={{ width: "100%" }}
            />

            <div className="event-time-container">
              <TextField
                name="start-time"
                label="Start time"
                type="time"
                inputGroupStyle={{ width: "40%" }}
              />
              <TextField
                name="start-time"
                label="Start time"
                type="time"
                inputGroupStyle={{ width: "40%" }}
              />
            </div>
            <Button
              type="submit"
              text="Upload Students List"
              icon={<FaFileUpload />}
              btnStyle={{ width: "100%", margin: "1rem 0px" }}
              clickHandler={(e) => {
                e.preventDefault()
                console.log("Form Submitted: ")
                console.table(eventData)
              }}
            />
          </form>
        </div>

        <div className="faculty-list">Faculty</div>
      </div>
    </div>
  )
}

export default AddEvent
