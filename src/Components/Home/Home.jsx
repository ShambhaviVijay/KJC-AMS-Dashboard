import PageHeader from "../Common/PageHeader"
import PageControlsLeft from "../Common/PageControlsLeft"
import DropDown from "../Common/DropDown"
import EventCard from "../EventCard/EventCard"
import { MdCalendarMonth } from "react-icons/md"
import { useState, useEffect } from "react"
import { readDocuments } from "../../Controllers"
import { useNavigate } from "react-router-dom"
import PaginatedView from "../Common/PaginatedView"

import "./Home.css"

const Home = () => {
  const navigator = useNavigate()
  const [allEvents, setAllEvents] = useState([])
  const [query, setQuery] = useState("")
  const keys = ["eventName", "organizer", "venue"]

  useEffect(() => {
    // Fetch Events on page load
    const getEvents = async () => {
      const data = await readDocuments("/events")
      setAllEvents(data)
    }
    getEvents()
  }, [])

  // @everyone: please do not add allEvents to the useEffect dependency array
  // This will cause a firebase outage.

  const handlesSorting = (sortMethod) => {
    setSortingValue(sortMethod)
    events = data
      .map((event) => <EventCard key={event.eventID} data={event} />)
      .filter((event) => event.eventName.includes(searchValue))
  }

  const addEventsPage = () => navigator("/addNewEvent")
  const searchData = (searchData) => setQuery(searchData)

  const search = (eventData) => {
    return eventData.filter((item) => {
      return keys.some((key) => {
        return String(item[key]).toLowerCase().includes(query.toLowerCase())
      })
    })
  }

  return (
    <div className="home-main">
      {/* Header */}
      <PageHeader title="Home" icon={<MdCalendarMonth />} />

      {/* Page conTROLLs */}
      <div className="pageControls">
        <PageControlsLeft
          inputplaceholder="Search Events"
          addFunction={addEventsPage}
          searchfuntion={searchData}
        />

        {/* Div containing dropdowns */}
        <div className="right-controls">
          {/* showDropDown */}
          <DropDown
            name="show"
            label="Show"
            options={[
              { name: "All", value: "all" },
              { name: "Upcoming", value: "upcoming" },
              { name: "Past Events", value: "past-events" },
            ]}
          />

          {/* sortDropDown */}
          <DropDown
            onChangeFuntion={handlesSorting}
            name="sort-by"
            label="Sort By"
            options={[
              { name: "Date", value: "date" },
              { name: "Start Time", value: "startTime" },
              { name: "End Time", value: "endTime" },
            ]}
          />
        </div>
      </div>
      {/* End Page Controls */}

      {/* Wrap data to be displayed within paginated view */}
      <PaginatedView itemsPerPage={8} itemContainerClassName="events-container">
        {/* Use search function to return filtered data  */}
        {search(allEvents).map((event) => (
          <EventCard key={event.id} data={event} />
        ))}
      </PaginatedView>
    </div>
  )
}

export default Home
