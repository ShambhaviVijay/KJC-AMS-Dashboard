import React, { useState, useEffect } from "react";
import Card from "../../Card/EventCard";
import "./AllEvents.css";
import { readDocuments , deleteDocument} from '../../../Controllers/index'
import { toast } from "react-toastify";

function AllEvents({ currentEventsOnly }) {
  const [events, setEvents] = useState([])
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      fetchEvents()
    } catch (err) {
      toast.error('error occured while fetching')
    }
  }, [])

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
      const eventsToday = events.filter((event) => event.eventDate === todayDate);
      setEvents(eventsToday)
    } else {
      setEvents(events)
    }
    setLoading(false)
  }

  const eventMap = events.map((event) => <Card key={event.eventID} deleteEvent={deleteEvent} data={event} />)

  if(!Loading) return (
    <div className="all-events-container">
      {eventMap}
    </div>
  ) 
  else return <div className='loader_center_parent' style={{height:'65vh'}}><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
}

export default AllEvents;
