import React, { useState } from 'react';
import PageControlsLeft from '../Common/PageControlsLeft';
import TableCard from '../Common/TableCard';
import { readDocuments } from '../../Controllers/index';
import './Faculty.css'
import DetailsModal from "../Modals/DetailsModal";

// import {get} from 'firebase/firestore'

function Faculty ({
  faculties, 
  departments, 
  clubs,
  fetchFaculties,
}) {
  // search functionality 
  const [query, setQuery] = useState("")
  const searchData = (searchData) => setQuery(searchData);
  const keys = ["facultyName", "id", "department", "club"]

  const fetchFaculty = async () => faculties = await readDocuments('/faculty');
  
  const search = (facultyData) => facultyData.filter((item) => keys.some(key => String(item[key]).toLowerCase().includes(query.toLowerCase())));

  //show hide for faculty model
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //faculty Id List for faculty model
  const idList = faculties.map((faculty) =>(faculty.id.split('@')[0]))

  return (
    <>
    <div className='main-container'>
      <PageControlsLeft
        tooltipText={"Search Faculty with the help of Name, Email, Department and Club"}
        inputplaceholder="Search by Faculty"
        addFunction={handleShow}
        searchfuntion={searchData}
        addIsDisabled={false}
      />
      { show &&
        <DetailsModal
          modalShow={show}
          closeModel={handleClose}
          action={'Add'}
          page={'Faculty'}
          refresh={fetchFaculties}
          idList={idList}
          departments={departments}
          clubs={clubs}
        />
      }
      <div className='table-container'>
        <ul style={{listStyleType: 'none', padding:'1rem'}} >
          <li>
          <TableCard 
            data={['Name', 'Email', 'Department', 'Club']}
            />
            </li>
          {search(faculties).map((faculty) => 
            <li key={faculty.id}>
              <TableCard 
                data={[faculty.facultyName, faculty.id, faculty.department, faculty.club]}
                id ={faculty.id}
                page={'Faculty'} 
                refresh={fetchFaculties}
                idList={idList}
                departments={departments}
                clubs={clubs}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  </>
  )
}

export default Faculty;