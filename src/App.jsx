import "./App.css"
import Sidebar from "./Components/Sidebar/Sidebar"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import AddEvent from "./Components/Add Event/AddEvent"
import EventDetails from "./Components/EventDetails/ModifyEvent"
import Events from "./Components/Events/Events"
import AllEvents from "./Components/Events/All Events/AllEvents"
import TodayEvents from "./Components/Events/Today Events/TodayEvents"
import History from "./Components/Events/History/History"
import Home from "./Components/Home/Home"
import Venue from "./Components/Venue/Venue"
import Organizer from "./Components/Organizer/Organizer"
import Faculty from "./Components/Faculty/Faculty"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PageNotFound from "./Components/Common/PageNotFound"

function App() {
  return (
    <div className="App">
      {/* sidebar */}
      <div className="sidebar">
        <Sidebar />
      </div>

      {/* main-container */}
      <div className="right-main-container">
        {/* Home */}
        <Routes>
          <Route path="/" element={ <Navigate  to="home" /> } />
        </Routes>
        
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="addNewEvent" element={<AddEvent />} />
          <Route path="venue" element={<Venue />}></Route>
          <Route path="organizer" element={<Organizer />}></Route>
          <Route path="faculty" element={<Faculty />}></Route>
          <Route path="event/:id" element={<EventDetails />}></Route>
          <Route path="*" element={ <PageNotFound/> } />
        </Routes>
        

        {/* Events Listing */}
        {/* <Routes>
          <Route path="events" element={<Events />}>
            <Route path="allevents" element={<AllEvents />}></Route>
            <Route path="todayevent" element={<TodayEvents />}></Route>
            <Route path="history" element={<History />}></Route>
          </Route>
        </Routes> */}

        {/* <Routes>
          <Route path="venueDeptFaculty" element={<VenueDeptFacl/>}></Route>
        </Routes> */}

        <Outlet />
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  )
}

export default App
