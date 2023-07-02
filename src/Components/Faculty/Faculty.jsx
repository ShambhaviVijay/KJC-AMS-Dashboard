import React from 'react';
import PageControls from '../PageControls/PageControls';
import { BsFillPersonPlusFill } from "react-icons/bs"
import TableCard from '../Common/TableCard';
import PageHeader from "../PageHeader/PageHeader"
<<<<<<< HEAD
=======
import { BsFillPersonFill } from "react-icons/bs"
import { readDocuments } from '../../Controllers/index';
import './Faculty.css'
>>>>>>> 22fcfa7 (table cards 2)

const FacultyPage = () => {

  const facultyData = readDocuments("faculty");
  console.log({facultyData});
  return (
    <>
<<<<<<< HEAD
      <PageHeader icon={<BsFillPersonPlusFill/>} title="Faculty"></PageHeader>
      <PageControls inputplaceholder='Search Faculty'/>

      <ul style={{listStyleType: 'none'}}>
          <li>
          <FacultyCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />
          </li>
          <li>
          <FacultyCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com'  row4='UBA' />
          </li>
          <li>
          <FacultyCard row1='Abhijaan Ganguly'  row3='Computer Science(UG)' row4='UBA' />
          </li>
          <li>
          <FacultyCard row1='Abhijaan Ganguly' />
          </li>
        </ul>
    </>

  )
=======
    <PageHeader title="Faculty" icon={<BsFillPersonFill />} />
    <div className='main-container'>
      <PageControls inputplaceholder="Search Faculty" />
      <div className='table-container'>
        <ul style={{listStyleType: 'none'}} >
          {/* {facultyData.map((faculty) => 
            <li>
              <FacultyCard 
              row1= {faculty.facultyName}
              row2= {faculty.facultyEmail} 
              row3={faculty.department}
              row4= {faculty.club} />
            </li>
          )} */}
          <li>
            <TableCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />
          </li>
          <li>
            <TableCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />        
          </li>
          <li>
            <TableCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />        
          </li>
          <li>
            <TableCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />        
          </li>
          <li>
            <TableCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />
          </li>
          <li>
            <TableCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />        
          </li>
          <li>
            <TableCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />        
          </li>
          <li>
            <TableCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />        
          </li>
          <li>
            <TableCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />
          </li>
          <li>
            <TableCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />        
          </li>
          <li>
            <TableCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />        
          </li>
          <li>
            <TableCard row1='Abhijaan Ganguly' row2='21bcac05@kristujayanti.com' row3='Computer Science(UG)' row4='UBA' />        
          </li>
        </ul>
      </div>
    </div>
  </>
  );
>>>>>>> 22fcfa7 (table cards 2)
}

export default FacultyPage
