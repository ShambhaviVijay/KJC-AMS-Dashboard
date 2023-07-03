import PageHeader from '../Common/PageHeader';
import {FaGraduationCap} from "react-icons/fa"
import PageControls from "../Common/PageControls"
import "./Organizer.css"

const Organizer = () => {  
  const searchParam = new URLSearchParams(document.location.search)
  const searchData = searchParam.get('search')

  return (
    <>
      <PageHeader
        title="Organizer"
        icon={<FaGraduationCap />} />
      <PageControls
        inputplaceholder="Search Organizer"
        setSearchText = {searchData}
        pageSlug={"organizer"}/>
      <div className="organizer-main">
        {/* add content here */}
      </div>
    </>
  )
}
  
  export default Organizer
  