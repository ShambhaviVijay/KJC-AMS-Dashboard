import "./EventCard.css"
import EventDefaultBG from "../../assets/event-default-bg.jpg"
import Button from "../Common/Button"
import { useNavigate } from "react-router-dom"
import { MdEdit } from "react-icons/md"
import { epochToDate } from "../../utils"

function EventCard({ data }) {
  const navigate = useNavigate()

  return (
    <div className="card-main-container">
      <div className="img-container">
        {data.backDrop === null || data.backDrop === "" ? (
          <img src={EventDefaultBG} alt="Default Card Image" />
        ) : (
          <img src={data.backDrop} alt="test image" />
        )}
      </div>
      <div className="card-info-container">
        <div className="info-common data">
          <p className="event-name">{data.eventName}</p>
        </div>

        <div className="info-common venue">
          <p>Venue</p>
          <p>{data.venue}</p>
        </div>

        {/* <div className="info-common time">
          <p>Organized By</p>
          <p>{data.organizer}</p>
        </div> */}

        <div className="info-common time">
          <p>Starts At</p>
          <p>{epochToDate(data.startTime)}</p>
        </div>

        <div className="info-common time">
          <p>Ends At</p>
          <p>{epochToDate(data.endTime)}</p>
        </div>

        <Button
          text={"Modify"}
          icon={<MdEdit />}
          btnClass="primary btn-event-card"
          clickHandler={() => navigate(`/event/${data.id}`)}
        />
      </div>

      <div className="btn-container"></div>
    </div>
  )
}

export default EventCard
