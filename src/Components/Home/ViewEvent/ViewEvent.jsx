import React from 'react'
import './ViewEvent.css'
import EventInfo from '../EventInfo/EventInfo'
import Button from '../../Common/Button'
import DetailsModal from '../../Modals/DetailsModal'
import { useLocation,useNavigate } from 'react-router-dom'
import { deleteDocument, deleteFile, uploadFile, createDocumentWithCustomId, updateDocument, readDocuments } from '../../../Controllers/index'
import { useState } from 'react'

import  {FaEdit, FaSave} from "react-icons/fa"
import { toast } from 'react-toastify'
import Papa from "papaparse";
import { epochToTime } from '../../../utils'

const ViewEvent = ({
  departments,
  clubs,
  venues,
  faculties,
}) => {
  const navigator = useNavigate()
  //takes data of only that event
  const location = useLocation()
  const eventData = location.state
  const [newBackDrop, setNewBackDrop] = useState(null)
  const [deletingEvent, setDeletingEvent] = useState(false)
  const [updatingEvent, setUpdatingEvent] = useState(false)
  const [participantsList, setParticipantsList] = useState([])
  const [newEventData, setNewEventData] = useState({
    backDrop: eventData.backDrop,
    openForAll: eventData.openForAll,
    eventName: eventData.eventName,
    venue: eventData.venue,
    organizer: eventData.organizer,
    eventDate: eventData.eventDate,
    startTime: eventData.startTime,
    endTime: eventData.endTime,
    id:eventData.id,
    coordinators: eventData.coordinators,
  })

  //controls data to be view only or be editable
  const [allowEdit, setAllowEdit] = useState(true)
  const changeEditState = () => setAllowEdit(!allowEdit)

  //show hide for delete model
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  const handleDelete = async () => {
    console.log('heloo world')
    // open Confirmation dialog box
    setDeletingEvent(true)
    try {
      await deleteDocument(eventData.id, "events")
      await deleteFile(eventData.backDrop)
      navigator("/home", { state: eventData.eventName })
      toast.success(eventData.eventName+" successfully deleted")
    } catch (e) {
      toast.error("Error while Deleting")
    }
    setDeletingEvent(false)
  }

  const handleUpdate = async () => {
    setUpdatingEvent(true)
    try {
      if (newBackDrop!=null) {
        newEventData.backDrop = await uploadFile(newBackDrop, "BackDrop")
        eventData.backDrop != "" && await deleteFile(eventData.backDrop)
      }
      if (JSON.stringify(eventData)!=JSON.stringify(newEventData)) {
        participantsList.length===0 && setParticipantsList(await readDocuments("events/"+eventData.id+"/Participants"))
        await updateDocument("events", eventData.id, newEventData)
      }
      if (participantsList.length!=0) {
        const participantsDetail = {isPresent: false, takenBy: "", takenTime: 0}
        participantsList.forEach((participant) => createDocumentWithCustomId("events/"+eventData.id+"/Participants", participant.id, participantsDetail));
      }
      navigator("/home", { state: newEventData })
      toast.success(eventData.eventName+" successfully updated")
    } catch (e) {
      toast.error("Error while Updating " + e)
    }
    setUpdatingEvent(false)
  }
  const ongoingEvent = (eventData.startTime<=Date.now()) && (Date.now()<=eventData.endTime)
  if(ongoingEvent){
    toast.warning(eventData.eventName + " is an ongoing event we don't recommend changing any data")
  }
  
  //handle CSV file download
  const downloadCSV = async () => {
    const participants = await readDocuments("events/"+eventData.id+"/Participants")
    const participantsList = participants.map(obj => [
        obj.id,
        obj.isPresent ? "Present" : "Absent",
        obj.takenBy,
        obj.takenTime ? JSON.stringify(epochToTime(obj.takenTime, true)) : "",
    ])
    participantsList.unshift(["Participant ID","Is Present","Taken By","Taken Time"])
    const csvFile = Papa.unparse(participantsList,{
      header:true,
      delimiter:",",
    })
    const blob = new Blob([csvFile], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = eventData.eventName+"-participants-list";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className='view-event-main'>
      <Button
        text={allowEdit?'Enable Editing':'Disable Editing'}
        clickHandler={changeEditState}
        btnContainerClass='absolute'
        icon={allowEdit ? <FaEdit /> : <FaSave />}
        btnClass={allowEdit?'danger':'primary'}
      />
      <EventInfo
        allowEdit={allowEdit}
        isEventOngoing={ongoingEvent}
        backDropFile={setNewBackDrop}
        eventData={eventData}
        // deleteEventFunc={handleDelete}
        deleteEventFunc={handleShow}
        updateEventFunc={handleUpdate}
        returnEventInfo={setNewEventData}
        departments={departments} 
        clubs={clubs}
        venues={venues}
        faculties={faculties}
        downloadCSV={downloadCSV}
        getParticipants={setParticipantsList}
      />

      {show && <DetailsModal 
        modalShow={show} 
        closeModel={handleClose}
        action={"Delete"}
        page={"Event"}
        // refresh={refresh}
        id={eventData.eventName}
        deleteFunction={handleDelete}
        />}
      { deletingEvent || updatingEvent && 
        <div className='loader_center_parent' style={{position:"absolute", top:"0px", left:"0px", zIndex:"1000"}}><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
      }
    </div>
  )
}

export default ViewEvent