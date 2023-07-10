import React from 'react'
import { useLocation } from 'react-router-dom'
import './ViewEvent.css'
import EventInfo from '../EventInfo/EventInfo'
import Button from '../../Common/Button'
import { useState } from 'react'

const ViewEvent = ({
  departments,
  clubs,
  venues,
  faculties,
}) => {
  //takes data of only that event
  const location = useLocation()
  const data = location.state

  //controls data to be view only or be editable
  const [allowEdit, setAllowEdit] = useState(true)
  const changeEditState = () => setAllowEdit(!allowEdit)

  return (
    <>
      <Button text='Edit' clickHandler={changeEditState} btnContainerClass='absolute'/>
      <EventInfo allowEdit={allowEdit} eventData={data} departments={departments} clubs={clubs} venues={venues} falculties={faculties}/>
    </>
  )
}

export default ViewEvent