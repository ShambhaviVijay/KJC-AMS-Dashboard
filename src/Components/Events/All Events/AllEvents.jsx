import React, { useState, useEffect } from "react";
import EventCard from "../../EventCard/EventCard";
import "./AllEvents.css";
import { readDocuments , deleteDocument} from '../../../Controllers/index'
import { toast } from "react-toastify";
import { useParams } from "react-router-dom"

function AllEvents({ currentEventsOnly }) {
  const [events, setEvents] = useState([])
  const [Loading, setLoading] = useState(true)
  const {searchedEventsOnly} = useParams()
  console.log(useParams())

  useEffect(() => {
    try {
      fetchEvents()
    } catch (err) {
      toast.error('error occured while fetching')
    }
  }, [])

  // delete events fuction
  const deleteEvent = async (id) => {
    try {
      await deleteDocument(id, 'Event')
      toast.success('Event deleted successfully')
      fetchEvents()
    } catch (err) {
      toast.error('error occured while deleting')
    }
  }

  const fetchEvents = async () => {
    const events = await readDocuments('Event')
    if (currentEventsOnly) {
      const today = new Date();
      const tzOffset = today.getTimezoneOffset() * 60000; // timezone offset in milliseconds
      const todayDate = new Date(Date.now() - tzOffset).toISOString().slice(0, 10);
      const eventsToday = events.filter((event) => event.eventDate === todayDate.toString());
      setEvents(eventsToday!=="")
    } else if( searchedEventsOnly ){
      const eventsSearched = events.filter((event) => 
      (event.eventName === searchedEventsOnly) || 
      (event.organizer === searchedEventsOnly) || 
      (event.venue === searchedEventsOnly))
      setEvents(eventsSearched)
    } else {
      setEvents(events)
    }
    setLoading(false)
  }

  const eventMap = Array.from(events).map((event) => <EventCard key={event.eventID} data={event} />)
  console.log(eventMap)
  if(!Loading) return (
    <div className="all-events-container">
      {eventMap}
    </div>
  ) 
  else return <div className='loader_center_parent' style={{height:'65vh'}}><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
}

export default AllEvents;
