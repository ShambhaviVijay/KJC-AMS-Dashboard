import PageHeader from '../Common/PageHeader';
import {FaGraduationCap} from "react-icons/fa"
import PageControlsLeft from "../Common/PageControlsLeft"
import { useState, useEffect } from "react"
import "./Organizer.css"

const Organizer = () => {

  const [query, setQuery] = useState("")

  const searchData = (searchData) => {
    setQuery(searchData)
    console.log(searchValue)
  }  
  
  // const search = (OrganizerData) =>{
  //   return OrganizerData.filter(item => item.venue_name.toLowerCase().includes(query.toLowerCase()));
  // }

  return (
    <>
      <PageHeader
        title="Organizer"
        icon={<FaGraduationCap />} />
      <PageControlsLeft
        tooltipText={"Search Organizer with the help of Organizer"}
        inputplaceholder="Search Organizer"
        searchfuntion={searchData}
      />
      <div className="organizer-main">
        {/* add content here */}
      </div>
    </>
  )
}
  
  export default Organizer
  