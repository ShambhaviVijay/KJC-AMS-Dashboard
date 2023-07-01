import PageHeader from "../PageHeader/PageHeader"
import { BsFillPersonFill } from "react-icons/bs"

import "./Faculty.css"

const FacultyPage = () => {

  return (
    <div className="faculty-main">
      <PageHeader title="Faculty" icon={<BsFillPersonFill />} />
    </div>
  )
}

export default FacultyPage
