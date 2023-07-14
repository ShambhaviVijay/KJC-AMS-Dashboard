import PageControlsLeft from "../Common/PageControlsLeft"
import DropDown from "../Common/DropDown"
import EventCard from "./EventCard/EventCard"
import { useState } from "react"
import { useNavigate,useLocation } from "react-router-dom"
import PaginatedView from "../Common/PaginatedView"
import { sortFilter, showFilter } from "../../utils"
import "./Home.css"

const Home = ({events}) => {
  // code for navigating to add events page
  const navigator = useNavigate()
  const addEventsPage = () => navigator("/addNewEvent")
  
  //takes data of the new/old Event
  const location = useLocation()
  const changedEvent = location.state
  if (changedEvent != null) {
    //make a list of event Ids
    const eventNameList = events.map(event => event.eventName)
    //if the changed event is of type string then delete data
    if (typeof(changedEvent) == "string") {
      if (eventNameList.includes(changedEvent)) events.splice(eventNameList.indexOf(changedEvent),1)
    } //if the changed event is of type object and is part of eventId list then update event
    else if (eventNameList.includes(changedEvent.eventName)) {
      events[eventNameList.indexOf(changedEvent.eventName)] = changedEvent
    } //if the changed event if of type object and is not part of eventId list then add event
    else {
      events.push(changedEvent)
    }
    // window.history.replaceState({}, document.title)
    navigator("/home", { state: null })
  }
  
  // code for searching data
  const [query, setQuery] = useState("")
  const searchData = (searchData) => setQuery(searchData)
  const keys = ["eventName", "organizer", "venue"]

  //code for Show By Dropdown
  const showByOptions = [
    { name: "All", value: "all" },
    { name: "Upcoming/Ongoing", value: "upcoming" },
    { name: "Past Events", value: "past-events" },
  ]
  const [showBy, setShowBy] = useState(showByOptions[0].value)
  const handleShowByChange = (e, Array = events) => {
    setShowBy(e.target.value)
    const today = new Date();
    const showResults = showFilter(Array, showBy, Math.floor(today.getTime()/1000))
    return showResults
  }

  //code for Sort By Dropdown
  const sortByOptions = [
    { name: "Name", value: "name" },
    { name: "Start Time", value: "startTime" },
    { name: "End Time", value: "endTime" },
  ]
  const [sortBy, setSortBy] = useState(sortByOptions[0].value)
  // Change function to be called when sort-by dropdown is changed
  const handleSortByChange = (e, Array = events) => {
    setSortBy(e.target.value)
    const sortResults = sortFilter(Array, sortBy)
    return sortResults
  }

  const search = (eventData) => {
    // Search for a particular string in the array
    const searchResults = eventData.filter((item) => {
      return keys.some((key) => {
        return String(item[key]).toLowerCase().includes(query.toLowerCase())
      })
    })
    const today = new Date();
    // Filter the array by first buy time then by a sort-by filter
    const filteredResults = sortFilter(showFilter(searchResults, showBy, Math.floor(today.getTime()/1000)), sortBy)
    return filteredResults
  }

  return (
    <div className="home-main">
      {/* Page controls */}
      <div className="pageControls">
        <PageControlsLeft
          tooltipText={"Search Events with the help of Event Name, Venue and Organizer"}
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
            options={showByOptions}
            changeHandler={handleShowByChange}
          />

          {/* sortDropDown */}
          <DropDown
            name="sort-by"
            label="Sort By"
            options={sortByOptions}
            changeHandler={handleSortByChange}
          />
        </div>
      </div>
      {/* End Page Controls */}

      {/* Wrap data to be displayed within paginated view */}
      <PaginatedView itemsPerPage={10} itemContainerClassName="events-container">
        {/* Use search function to return filtered data  */}
        {search(events).map((event) => (
          <EventCard key={event.id} data={event} />
        ))}
      </PaginatedView>
    </div>
  )
}

export default Home
