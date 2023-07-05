import React, { useState, useEffect } from 'react';
import PageControlsLeft from '../Common/PageControlsLeft';
import TableCard from '../Common/TableCard';
import PageHeader from "../Common/PageHeader"
import { BsFillPersonFill } from "react-icons/bs"
import { readDocuments } from '../../Controllers/index';
import './Faculty.css'
import FacultyModal from "../Modals/DetailsModal";

const FacultyPage = () => {

  const [facultyData, setFacultyData] = useState([])
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("")
  const keys = ["facultyName", "facultyEmail", "department", "club"]

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    try {
        fetchFaculty()
    } catch (err) {
      toast.error('error occured while fetching')
    }
  }, [])

  const searchData = (searchData) => {
    setQuery(searchData)
  }

  const fetchFaculty = async () => {
    const faculties = await readDocuments('/faculty')
    setFacultyData(faculties)
  }

  const search = (facultyData) =>{
    return facultyData.filter((item) => keys.some(key => String(item[key]).toLowerCase().includes(query.toLowerCase())));
  }
  
  return (
    <>
    <PageHeader title="Faculty" icon={<BsFillPersonFill />} />
    
    <div className='main-container'>
      {show && <FacultyModal modalShow={show} closeModel={handleClose} />}
      <div className='table-container'>
        <PageControlsLeft
          inputplaceholder="Search by name/email/department/club"
          // addFunction={add}
          searchfuntion={searchData}
        />
        <ul style={{listStyleType: 'none'}} >
          {search(facultyData).map((faculty) => 
            <li>
              <TableCard 
              data={[faculty.facultyName, faculty.facultyEmail, faculty.department, faculty.club]}
              id ={faculty.id}
              page={'edit faculty'} />
            </li>
          )}
        </ul>
      </div>
    </div>
  </>
  );
}

export default FacultyPage;


{/* <li>
              <TableCard 
              row1={'Abhijaan Ganguly'}
              row2={'21bcac05@kristujayanti.com'} 
              row3={'Computer Science(UG)'}
              row4= {'UBA'}
              id ={1}
              editFunction={showFacultyModel} />
            </li> */}