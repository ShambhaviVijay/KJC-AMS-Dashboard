import "./EventCard.css"
import EventDefaultBG from "../../../assets/event-default.png"
import Button from "../../Common/Button"
import { useNavigate } from "react-router-dom"
import { epochToTime } from "../../../utils"

function EventCard({ data }) {
  const navigate = useNavigate()
  return (
    <div className="card-main-container">
      <div className="img-container">
        {data.backDrop === null || data.backDrop === "" ? (
          // <img src={EventDefaultBG} alt="Default Card Image" />
          <div className="default-backdrop"><p>{data.eventName}</p></div>
        ) :(
          <img src={data.backDrop} alt="test image" />
        )}
      </div>
      <div className="card-info-container">
        <div className="info-common data">
          <p className="event-name">{data.eventName}</p>
        </div>

        <div className="info-common venue">
          <p>Date</p>
          <p>{data.eventDate}</p>
        </div>

        <div className="info-common time">
          <p>Starts At</p>
          <p>{epochToTime(data.startTime)}</p>
        </div>

        <div className="info-common time">
          <p>Ends At</p>
          <p>{epochToTime(data.endTime)}</p>
        </div>

        <Button
          text={"View Event"}
          btnClass="primary btn-event-card"
          clickHandler={() => navigate(`/event/${data.id}`, { state: data })}
        />
      </div>
    </div>
  )
}

export default EventCard