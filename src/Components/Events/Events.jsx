import React, { useEffect } from "react"
import "./Events.css"
import { MdCalendarMonth } from "react-icons/md"
import PageHeader from "../PageHeader/PageHeader"
import PageControls from "../PageControls/PageControls"
import { Outlet } from "react-router-dom"

function Events() {
  return (
    <div className="events-main-container">
      <PageHeader title="Events" icon={<MdCalendarMonth />} />
      {/* <Header icon={<MdCalendarMonth />} text={"Events"}></Header> */}
      <PageControls inputplaceholder="Search Event" />
      {/* <div className="header-tabs-container">
        <div className="tabs-container">
        <NavLink to={"allevents"} className="nav-link">All Events</NavLink>
        <NavLink to={"todayevent"} className="nav-link">Today's Events</NavLink>
        <NavLink to={"history"} className="nav-link">History</NavLink>
        </div>
      </div> */}

      <div className="event-body-container">
        <Outlet />
      </div>
    </div>
  )
}

export default Events
