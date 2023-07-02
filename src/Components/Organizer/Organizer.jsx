import PageHeader from '../PageHeader/PageHeader';
import {FaGraduationCap} from "react-icons/fa"
import PageControls from "../PageControls/PageControls"
import "./Organizer.css"

const Organizer = () => {  
    return (
      <>
        <PageHeader title="Organizer" icon={<FaGraduationCap />} />
        <PageControls inputplaceholder="Search Organizer" />
        <div className="organizer-main">
          {/* add content here */}
        </div>
      </>
    )
  }
  
  export default Organizer
  