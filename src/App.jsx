import "./App.css"
import { BiCalendarStar } from 'react-icons/bi'
import { MdCalendarMonth, MdAdminPanelSettings } from 'react-icons/md'
import { FaGraduationCap } from "react-icons/fa"
import { BsFillPersonFill } from 'react-icons/bs'
import Sidebar from "./Components/Sidebar/Sidebar"
import PageHeader from "./Components/Common/PageHeader"
import Home from "./Components/Home/Home"
import AddEvent from "./Components/Home/AddEvent/AddEvent"
import ViewEvent from "./Components/Home/ViewEvent/ViewEvent"
import Faculty from "./Components/Faculty/Faculty"
import Organizer from "./Components/Organizer/Organizer"
import Venue from "./Components/Venue/Venue"
import Admins from "./Components/Admins/Admins"
import Login from "./Components/Login/Login"
import PageNotFound from "./Components/Common/PageNotFound"
import { useState, useEffect } from "react"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { readDocuments,auth } from './Controllers/index';
import { onAuthStateChanged } from "firebase/auth"
import "react-toastify/dist/ReactToastify.css"

function App() {

  const AuthToken = localStorage.getItem('AuthToken')
  const [AuthenticatedUser, setUser] = useState(auth.currentUser)
  const [Loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [faculties, setFaculties] = useState([])
  const [departments, setDepartments] = useState([])
  const [clubs, setClubs] = useState([])
  const [venues, setVenues] = useState([])
  const [admins, setAdmins] = useState([])
  const [superAdmins, setSuperAdmins] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      user ? setUser(user) : setUser(null)
    })
  }, [])

  const fetchData = () => {
    fetchEvents()
    fetchFaculties()
    fetchDepartments()
    fetchClubs()
    fetchVenues()
    fetchAdmins()
    fetchSuperAdmins()
  }

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
  const fetchAdmins = async () => {
    const admins = await readDocuments('/admins')
    setAdmins(admins)
  }
  const fetchSuperAdmins = async () => {
    const superAdmins = await readDocuments('/superAdmins')
    setSuperAdmins(superAdmins)
    setLoading(false)
  }

  return (
    <div className="App">
    {
      (!AuthenticatedUser && !AuthToken) ?
        <div className="login-page">
        <Routes>
          <Route path="/" element={ <Navigate to="/login" /> }/>
          <Route path="home" element={ <Navigate replace={true} to="/login" /> }/>
          <Route path="addNewEvent" element={ <Navigate replace={true}  to="/login" />}/>
          <Route path="event/:id" element={ <Navigate replace={true}  to="/login" /> }/>
          <Route path="faculty" element={ <Navigate replace={true}  to="/login" /> }/>
          <Route path="organizer" element={ <Navigate replace={true} to="/login" />}/>
          <Route path="venue" element={ <Navigate replace={true}  to="/login" /> }/>
          {/* <Route path="admins" element={ <Navigate replace={true}  to="/login" /> }/> */}
          <Route path="login" element={ <Login setUser={setUser}/> } />
          <Route path="*" element={ <PageNotFound /> } />
        </Routes>
        </div> :
        Loading ? 
          <> 
            {fetchData()}
            <div className='loader_center_parent' style={{height:'65vh'}}><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
          </> :
          <>
            {/* sidebar */}
            <div className="sidebar">
              <Sidebar user={AuthenticatedUser} auth={auth} setUser={setUser}/>
            </div>
            {/* head */}
            <div className="head">
              <Routes>
                <Route path="login" element={ <Navigate replace={true} to="/home" /> }/>
                <Route path="home" element={ <PageHeader title="Home" icon={ <MdCalendarMonth /> } /> } />
                <Route path="addNewEvent" element={ <PageHeader title="Add Event" icon={ <MdCalendarMonth /> } /> } />
                <Route path="event/:id" element={ <PageHeader title="Event Details" icon={ <BiCalendarStar /> } /> }/>
                <Route path="faculty" element={ <PageHeader title="Faculty" icon={ <BsFillPersonFill /> } /> }/>
                <Route path="organizer" element={ <PageHeader title="Organizer"icon={ <FaGraduationCap /> } /> }/>
                <Route path="venue" element={ <PageHeader title="Venue"icon={ <BsFillPersonFill /> } /> }/>
                {/* <Route path="admins" element={ <PageHeader title="Admins"icon={ <MdAdminPanelSettings /> } /> }/> */}
              </Routes>
            </div>
            {/* main-body */}
            <div className="right-main-container">
              <Routes>
                <Route path="/" element={<Navigate to={"/home"}/>} />
                <Route path="home" element={<Home events={events}/>} />
                <Route path="addNewEvent" element={<AddEvent events={events} departments={departments} clubs={clubs} venues={venues} faculties={faculties} /> } />
                <Route path="event/:id" element={<ViewEvent departments={departments} clubs={clubs} venues={venues} faculties={faculties}/> } />
                <Route path="faculty" element={<Faculty faculties={faculties} departments={departments} clubs={clubs} fetchFaculties={fetchFaculties}/> } />
                <Route path="organizer" element={<Organizer departments={departments} clubs={clubs} setDepartments={setDepartments} setClubs={setClubs}/> } />
                <Route path="venue" element={<Venue venues={venues} setVenues={setVenues} /> } />
                {/* <Route path="admins" element={<Admins admins={admins} superAdmins={superAdmins} setAdmins={setAdmins} setSuperAdmins={setSuperAdmins}/> } /> */}
                <Route path="*" element={ <PageNotFound /> } />
              </Routes>
              <Outlet />
            </div>
          </>
    }
    <ToastContainer autoClose={1000} />  
    </div>

  )
  // if (!AuthenticatedUser && !AuthToken){
  //   return (
      
  //   )
  // }
  // else if (Loading) {
  //   fetchData()
  //   return <div className='loader_center_parent' style={{height:'65vh'}}><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
  // }
  // else {
  //   return (
  //   <div className="App">
      
  //   </div>
  // )}
}

export default App
