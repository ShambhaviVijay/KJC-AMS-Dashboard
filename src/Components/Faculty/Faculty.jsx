import React, { useState } from 'react';
import PageControlsLeft from '../Common/PageControlsLeft';
import Button from "../Common/Button"
import TableCard from '../Common/TableCard';
import { createDocumentWithCustomId } from '../../Controllers/index';
import { FaFileUpload,FaFileDownload } from "react-icons/fa"
import Papa from "papaparse";
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
  const headers = ["Name", "Email", "Department", "Clubs"]
  
  const search = (facultyData) => facultyData.filter((item) => keys.some(key => String(item[key]).toLowerCase().includes(query.toLowerCase())));

  const facultiesToJSON = () => {
    let input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv"
    input.onchange = () => {
      let file = input.files[0]
      if (file) {
        Papa.parse(file, {
          delimiter: ',',
          dynamicTyping: true,
          header: true,
          complete: (result) =>  {
            result.data.forEach(async (row) => {
              row.club = row.club.split(',')
              await createDocumentWithCustomId("faculty", row.id, {club: row.club, department: row.department, facultyName: row.facultyName});
            })
            fetchFaculties()
          }
        })
      }
    }
    input.click()
  }

  //handle CSV file download
  const DownloadFormat = async () => {
    const headers = [["Please Maintain the Header Format"],
                    ["Faculty's Name","Faculty's Email Id","Faculty's Department(Match from the Departments List)",'"FacultyClub1, FacultyClub2,..."(Match from the Clubs List and put within Quotes and commas to store multiple Clubs)'],
                    ["Example Format:"],
                    [],
                    ["Delete the above GuideLines"],
                    [],
                    keys, 
                    ["Rohan Agarwal","21bcac55@kristujayanti.com","Computer Science(UG)",'"Entrepreneurship Incubation Center,Literary And Cultural Association"']]
    const csvFile = Papa.unparse(headers,{
      header:true,
      delimiter:",",
    })
    const blob = new Blob([csvFile], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "Faculty-list.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  //show hide for faculty model
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //faculty Id List for faculty model
  const idList = faculties.map((faculty) =>(faculty.id.split('@')[0]))

  return (
    <>
    <div className='main-container'>
      <div className="page-controls">
        <PageControlsLeft
          tooltipText={"Search Faculty with the help of Name, Email, Department and Club"}
          inputplaceholder="Search by Faculty"
          addFunction={handleShow}
          searchfuntion={searchData}
          addIsDisabled={false}
        />
        <Button
          text = "Upload File"
          icon={<FaFileUpload />}
          btnStyle={{ width: "100%", margin: "1rem 0px", flex: "1"}}
          clickHandler={facultiesToJSON}
        />
        <Button
          text = "Download Format"
          icon={<FaFileDownload />}
          btnStyle={{ width: "100%", margin: "1rem 0px", flex: "1"}}
          clickHandler={DownloadFormat}
        />
      </div>
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
      <div className='headers' style={{paddingLeft:'1rem', paddingRight:'1rem'}}>
        {headers.map((header) =>
        <h5 style={{textAlign:'center', width:'12vw'}}>{header}</h5>
      )}
        <h5 style={{textAlign:'center', width:'17rem'}}>Actions</h5>
      </div>
      <div className='table-container'>
        <ul>
          {search(faculties).map((faculty) => 
            <li key={faculty.id}>
              <TableCard 
                data={[faculty.facultyName, faculty.id, faculty.department, faculty.club? faculty.club.toString():"None"]}
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