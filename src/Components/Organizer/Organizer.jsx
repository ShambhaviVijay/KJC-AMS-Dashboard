import PageHeader from '../PageHeader/PageHeader';
import {FaGraduationCap} from "react-icons/fa"
import "./Organizer.css"

const Organizer = () => {  
    return (
      <div className="organizer-main">
        <PageHeader title="Organizer" icon={<FaGraduationCap />} />
      </div>
    )
  }
  
  export default Organizer
  