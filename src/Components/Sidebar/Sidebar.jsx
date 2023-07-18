import React from "react"
import "./Sidebar.css"
import { MdAdminPanelSettings, MdHome } from "react-icons/md"
import { BsBuildingAdd, BsFillPersonFill } from "react-icons/bs"
import { FaGraduationCap } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import Button from '../Common/Button'
import { signOut } from "firebase/auth"
import { ToastContainer, toast } from "react-toastify"


function Sidebar({user, auth, setUser}) {
  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
    localStorage.removeItem('AuthToken')
    // toast.error("error")
  }
  return (
    <div className="sidebar-outer-container">
      {/* admin-info-container */}
      <div className="admin-info">
        <div className="admin-card"><p>Admin</p></div>
        <div className="admin-details">
          {/* <p>Abhijaan Ganguly</p> */}
          <p>{user.email}</p>
        </div>
      </div>
      {/* nav-links-container */}
      <div className="nav-links-container">
        <NavLink to={"/home"} className="nav-links-common">
          <MdHome />
          <p>Home</p>
        </NavLink>

        <NavLink to={"/faculty"} className="nav-links-common">
          <BsFillPersonFill />
          <p>Faculty</p>
        </NavLink>

        <NavLink to={"/organizer"} className="nav-links-common">
          <FaGraduationCap />
          <p>Organizer</p>
        </NavLink>

        <NavLink to={"/venue"} className="nav-links-common">
          <BsBuildingAdd />
          <p>Venue</p>
        </NavLink>

        {/* <NavLink to={"/admins"} className="nav-links-common">
          <MdAdminPanelSettings />
          <p>Admins</p>
        </NavLink> */}
      </div>

      <NavLink to={"/login"} onClick={handleLogout} className="nav-links-logout">
        <Button 
        btnClass='secondary'
        text="Log Out" 
        btnStyle={{width:'100%', color:'#bb2d3b', border: '2px solid #bb2d3b'}}/>
      </NavLink>
    </div>
  )
}

export default Sidebar
