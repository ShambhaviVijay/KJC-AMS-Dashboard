import React from "react"
import "./Sidebar.css"
import { MdCalendarMonth, MdHome } from "react-icons/md"
import { BsBuildingAdd, BsFillPersonFill } from "react-icons/bs"
import { FaGraduationCap } from "react-icons/fa"
import { NavLink } from "react-router-dom"

function Sidebar() {
  return (
    <div className="sidebar-outer-container">
      {/* admin-info-container */}

      {/* nav-links-container */}
      <div className="nav-links-container">
        <NavLink to="/addevent" className="nav-links-common">
          <MdHome />
          <p>Home</p>
        </NavLink>

        <NavLink to={"/events/allevents"} className="nav-links-common">
          <MdCalendarMonth />
          <p>Events</p>
        </NavLink>

        <NavLink to={"/venue"} className="nav-links-common">
          <BsBuildingAdd />
          <p>Venue</p>
        </NavLink>

        <NavLink to={"/organizer"} className="nav-links-common">
          <FaGraduationCap />
          <p>Organizer</p>
        </NavLink>

        <NavLink to={"/faculty"} className="nav-links-common">
          <BsFillPersonFill />
          <p>Faculty</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
