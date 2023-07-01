import PageHeader from "../PageHeader/PageHeader"
import PageControls from "../PageControls/PageControls"
import DropDown from "../Common/DropDown"
import EventCard from "../Card/EventCard"
import { MdCalendarMonth } from "react-icons/md"
import EventDefaultBG from "../../assets/event-default-bg.jpg"
// import usePagination from "../../Hooks/usePagination"

import "./Home.css"

const Home = () => {
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

  const allEvents = []
  for (let i = 1; i <= 8; i++) {
    allEvents.push(<EventCard data={{
      backDrop: EventDefaultBG,
      venue: `M1 Audi`,
      startTime: "2021-08-20T10:00:00.000Z",
      eventName: `Event ${i}`,
      id: `af5597c29467a96523a70787c319f4db${i}`,
    }} />)
  }

  // const [refreshedItems, Pagination] = usePagination(4, allEvents)

  return (
    <div className="home-main">
      <PageHeader title="Home" icon={<MdCalendarMonth />} />
      <PageControls
        inputplaceholder="Search Events"
        dropDowns={[sortByDropDown, showDropDown]}
      />

      {/* Events container */}
      <div className="events-container">
        {/* Refresh Items */}
        {/* {refreshedItems} */}
        {allEvents}
      </div>

      <div className="pagination">
        {/* <Pagination /> */}
      </div>
    </div>
  )
}

export default Home
