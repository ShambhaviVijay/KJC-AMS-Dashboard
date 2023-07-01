import React from "react"
import "./Card.css"
import cardImage from "../../assets/card_img.png"
import Button from "../Common/Button"
import { useNavigate } from "react-router-dom"
import { MdEdit } from "react-icons/md"

function EventCard({ data, deleteEvent }) {
  const navigate = useNavigate()

  const convertDate = (startTime) => {
    const date = new Date(startTime) // divide by 1 billion for seconds, 1 million for nanoseconds
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const timeStr = `${day}-${month}-${year} ${hours % 12 === 0 ? 12 : hours % 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${hours < 12 ? "AM" : "PM"}`
    return timeStr
  }

  return (
    <div className="card-main-container">
      <div className="img-container">
        {data.backDrop === null || data.backDrop === "" ? (
          <img src={cardImage} alt="Default Card Image" />
        ) : (
          <img src={data.backDrop} alt="test image" />
        )}
      </div>
      <div className="card-info-container">
        <div className="info-common data">
          <p className="event-name">{data.eventName}</p>
        </div>
        {/* <div className="info-common data">
          <p>Date</p>
          <p></p>
        </div> */}

        <div className="info-common venue">
          <p>Venue</p>
          <p>{data.venue}</p>
        </div>

        <div className="info-common time">
          <p>Time</p>
          <p>{convertDate(data.startTime)}</p>
        </div>
      </div>

      <div
        className="btn-container"
        style={{ display: "flex", justifyContent: "center" }}>
        {/* icon={{MdEdit}} How to use Icons */}
        <Button
          text={"Modify"}
          icon={<MdEdit />}
          btnStyle={{ width: "100%"}}
          btnClass="primary"
          clickHandler={() => navigate(`/event/${data.id}`)}
        />
        {/* <Button text={"Delete"} style={{width:'max-content',marginLeft:'0%'}} btnClass="primary" action={() => deleteEvent(data.id)}/> */}
      </div>
    </div>
  )
}

export default EventCard
