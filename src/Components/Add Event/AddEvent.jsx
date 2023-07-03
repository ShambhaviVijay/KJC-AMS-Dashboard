import React, { useState, useEffect } from "react"
import Button from "../Common/Button"
import { MdCalendarMonth } from "react-icons/md"
import { createDocument, readDocuments, uploadFile } from "../../Controllers/index"
import { useNavigate } from "react-router-dom"
import "./AddEvent.scss"
import { toast } from "react-toastify"
import PageHeader from "../Common/PageHeader"

function AddEvent() {
  const navigate = useNavigate()
  const [departments, setdepartments] = useState([])
  const [venues, setvenues] = useState([])
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
      const venues = await readDocuments("Venue")
      const departments = await readDocuments("Department")
      setvenues(venues)
      setdepartments(departments)
    } catch (err) {
      toast.error("error occured while fetching data")
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
    <div className="home-main">
      <PageHeader title="Add Event" icon={<MdCalendarMonth />} />
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="sub-group1">
                <input
                  type="text"
                  className="inputbox"
                  name="Festname"
                  value={eventData.Festname}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
                <input
                  type="text"
                  className="inputbox"
                  name="organizer"
                  value={eventData.organizer}
                  onChange={handleChange}
                  placeholder="Organized By"
                  required
                />
              </div>

              <div className="sub-group1">
                <select
                  className="inputbox"
                  required
                  name="venue"
                  placeholder="Venue"
                  onChange={handleChange}>
                  <option>select venue</option>
                  {venues.map(({ venue_name }, index) => (
                    <option key={index} value={venue_name}>
                      {venue_name}
                    </option>
                  ))}
                </select>
                <div className="sub-group2">
                  <input
                    type="time"
                    className="inputbox"
                    name="startTime"
                    value={eventData.startTime}
                    onChange={handleChange}
                    placeholder="Starting Time"
                    required
                  />
                  <input
                    type="time"
                    className="inputbox"
                    name="endTime"
                    value={eventData.endTime}
                    onChange={handleChange}
                    placeholder="End Time"
                    required
                  />
                </div>
                <div className="sub-group2">
                  <select
                    className="inputbox"
                    required
                    name="deptName"
                    placeholder="Venue"
                    onChange={handleChange}>
                    <option>select department</option>
                    {departments.map(({ department_name }, index) => (
                      <option key={index} value={department_name}>
                        {department_name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="openForAll" style={{ marginTop: "30px" }}>
                    Open For All
                  </label>
                  <input
                    type="checkbox"
                    className="inputbox"
                    name="openForAll"
                    onChange={(e) => (eventData.openForAll = !eventData.openForAll)}
                    placeholder="Open for all"
                    style={{ width: "5%" }}
                    required
                  />
                </div>
              </div>

              <div className="sub-group1">
                <input
                  type="date"
                  className="inputbox"
                  name="eventDate"
                  value={eventData.eventDate}
                  onChange={handleChange}
                  placeholder="Date"
                  required
                />
                <div className="sub-group3">
                  <input type="file" name="image" onChange={handleImageChange} />
                </div>
              </div>

              <input
                type="text"
                className="inputbox-description"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
              <Button
                text={!creatingEvent ? "Finish" : "Creating Event"}
                btnClass="other-button"
                type="submit"
              />
            </form>
          </div>
        </div>
  )
}

export default AddEvent
