import "./Venue.css"
import PageHeader from "../PageHeader/PageHeader"
import { BsBuildingFillAdd } from "react-icons/bs"

const Venue = () => {
  return(
    <div className="venue-main">
        <PageHeader title="Venue" icon={<BsBuildingFillAdd />} />
    </div>
  )
}

export default Venue;