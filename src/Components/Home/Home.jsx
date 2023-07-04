import PageHeader from "../Common/PageHeader"
import PageControls from "../Common/PageControls"
import DropDown from "../Common/DropDown"
import EventCard from "../EventCard/EventCard"
import { MdCalendarMonth } from "react-icons/md"
import ReactPaginate from "react-paginate"
import { useState, useEffect } from "react"
import { readDocuments } from "../../Controllers"

import "./Home.css"
import "./Pagination.css"

// GLOBAL VARIABLES
const itemsPerPage = 8

const Home = () => {
  const [allEvents, setAllEvents] = useState([])
  const searchParam = new URLSearchParams(document.location.search)
  const searchData = searchParam.get('search')

  let events;


  async function getEvents() {
    const data = await readDocuments("/events")
    if(searchData){
      events = data
      .filter((event) => event.eventName === searchedValue)
      .map((event) => <EventCard key={event.eventID} data={event} />)
    } else {
      events = data.map((event) => <EventCard key={event.eventID} data={event} />)
    }
    return events
  }

  // Fetch Events on page load
  useEffect(() => {
    getEvents().then((events) => setAllEvents(events))    
  }, [])

  const sortByDropDown = () => (
    <DropDown
      name="sort-by"
      label="Sort By"
      options={[
        { name: "Date", value: "date" },
        { name: "Name", value: "name" },
        { name: "Department", value: "department" },
      ]}
    />
  )

  const showDropDown = () => (
    <DropDown
      name="show"
      label="Show"
      options={[
        { name: "All", value: "all" },
        { name: "Upcoming", value: "upcoming" },
        { name: "Past Events", value: "past-events" },
      ]}
    />
  )

  const RefreshedItems = ({ currentItems = [] }) => {
    return <>{currentItems}</>
  }

  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage
  const currentItems = allEvents.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(allEvents.length / itemsPerPage)

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allEvents.length
    setItemOffset(newOffset)
  }

  return (
    <div className="home-main">
      <PageHeader title="Home" icon={<MdCalendarMonth />} />
      <PageControls
        setText = {searchData}
        pageSlug={"home"}
        inputplaceholder="Search Events"
        dropDowns={[sortByDropDown, showDropDown]}
      />

      {/* Events container */}
      <div className="events-container">
        {/* Refresh Items */}
        <RefreshedItems currentItems={currentItems} />
      </div>

      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  )
}

export default Home
