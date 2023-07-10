import "./App.css"
import Sidebar from "./Components/Sidebar/Sidebar"
import { BiCalendarStar } from 'react-icons/bi'
import { MdCalendarMonth } from 'react-icons/md'
import { FaGraduationCap } from "react-icons/fa"
import { BsFillPersonFill } from 'react-icons/bs'
import PageHeader from "./Components/Common/PageHeader"
import Home from "./Components/Home/Home"
import AddEvent from "./Components/Home/AddEvent/AddEvent"
import ViewEvent from "./Components/Home/ViewEvent/ViewEvent"
import Faculty from "./Components/Faculty/Faculty"
import Organizer from "./Components/Organizer/Organizer"
import Venue from "./Components/Venue/Venue"
import PageNotFound from "./Components/Common/PageNotFound"
import { useState, useEffect } from "react"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { readDocuments } from './Controllers/index';
import "react-toastify/dist/ReactToastify.css"

function App() {

  const [Loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [faculties, setFaculties] = useState([])
  const [departments, setDepartments] = useState([])
  const [clubs, setClubs] = useState([])
  const [venues, setVenues] = useState([])

  useEffect(() => {
    try {
      fetchEvents()
      fetchFaculties()
      fetchDepartments()
      fetchClubs()
      fetchVenues()
      setLoading(false)
    } catch (err) {
      toast.error('error occured while fetching')
    }
  }, [])

  const fetchEvents = async () => {
    const events = await readDocuments('/events')
    setEvents(events)
  }
  const fetchFaculties = async () => {
    const faculties = await readDocuments('/faculty')
    setFaculties(faculties)
  }
  const fetchDepartments = async () => {
    const departments = await readDocuments('/organizers/departments/department')
    setDepartments(departments)
  }
  const fetchClubs = async () => {
    const clubs = await readDocuments('/organizers/clubs/club')
    setClubs(clubs)
  }
  const fetchVenues = async () => {
    const venues = await readDocuments('/venue')
    setVenues(venues)
  }
  
  if (!Loading) return (
    <div className="App">
      {/* sidebar */}
      <div className="sidebar">
        <Sidebar />
      </div>
      {/* head */}
      <div className="head">
        <Routes>
          <Route path="home" element={ <PageHeader title="Home" icon={ <MdCalendarMonth /> } /> } />
          <Route path="addNewEvent" element={ <PageHeader title="Add Event" icon={ <MdCalendarMonth /> } /> } />
          <Route path="event/:id" element={ <PageHeader title="Event Details" icon={ <BiCalendarStar /> } /> }/>
          <Route path="faculty" element={ <PageHeader title="Faculty" icon={ <BsFillPersonFill /> } /> }/>
          <Route path="organizer" element={ <PageHeader title="Organizer"icon={ <FaGraduationCap /> } /> }/>
          <Route path="venue" element={ <PageHeader title="Venue"icon={ <BsFillPersonFill /> } /> }/>
          <Route path="*" element={ <PageNotFound /> } />
        </Routes>
      </div>
      {/* main-body */}
      <div className="right-main-container">
        <Routes>
          <Route path="/" element={ <Navigate to="home" /> } />
        </Routes>
        <Routes>
          <Route path="home" element={<Home events={events}/>} fetchEvents={fetchEvents}/>
          <Route path="addNewEvent" element={<AddEvent events={events} departments={departments} clubs={clubs} venues={venues} falculties={faculties} /> } />
          <Route path="event/:id" element={<ViewEvent departments={departments} clubs={clubs} venues={venues} falculties={faculties}/> } />
          <Route path="faculty" element={<Faculty faculties={faculties} departments={departments} clubs={clubs} fetchFaculties={fetchFaculties}/> } />
          <Route path="organizer" element={<Organizer departments={departments} clubs={clubs} fetchDepartments={fetchDepartments} fetchClubs={fetchClubs}/> } />
          <Route path="venue" element={<Venue venues={venues} fetchVenues={fetchVenues} /> } />
          <Route path="*" element={ <PageNotFound /> } />
        </Routes>
        <Outlet />
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  )
  else return <div className='loader_center_parent' style={{height:'65vh'}}><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
}

export default App
