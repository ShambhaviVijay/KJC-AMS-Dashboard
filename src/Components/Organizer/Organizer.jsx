import PageControlsLeft from "../Common/PageControlsLeft"
import { useState } from "react"
import TableCard from '../Common/TableCard';
import DetailsModal from "../Modals/DetailsModal";
import "./Organizer.css"

function Organizer({
  departments,
  clubs,
  fetchDepartments,
  fetchClubs,
}){

  const [queryForDepartment, setQueryForDepartment] = useState("")
  const [queryForClub, setQueryForClub] = useState("")
  const [page, setPage] = useState()

  const searchDataForDepartment = (searchData) => setQueryForDepartment(searchData)
  const searchDataForClub = (searchData) => setQueryForClub(searchData) 
  
  const searchDepartment = (departmentData) => departmentData.filter(item => item.id.toLowerCase().includes(queryForDepartment.toLowerCase()));
  const searchClub = (clubData) => clubData.filter(item => item.id.toLowerCase().includes(queryForClub.toLowerCase()));

  //show hide for faculty model
  const [show, setShow] = useState(false);
  const handleShowDpt = () => {
    setShow(true);
    setPage('Department')
    setQueryForDepartment("")
  }

  const handleShowClub = () => {
    setShow(true);
    setPage('Club')
    setQueryForClub("")
  }
  const handleClose = () => setShow(false);

  const disableAddDpt = searchDepartment(departments).length > 0
  const disableAddClub = searchClub(clubs).length > 0

  const departmentIdList = departments.map((department) =>(department.id).toLowerCase())
  const clubsIdList = departments.map((club) =>(club.id).toLowerCase())

  return (
    <>
      <div className="organizers-main-container">
      { show &&
        <DetailsModal
          modalShow={show}
          closeModel={handleClose}
          action={'Add'}
          page={'Department'}
          refresh={fetchDepartments}
          idList={departmentIdList}
        />
        }
        <div className="departments organizers-container">
          <PageControlsLeft
            tooltipText={"Search Organizer with the help of Department"}
            inputplaceholder="Search Departments"
            searchfuntion={searchDataForDepartment}
            styleSearchBox={{width:'25vw'}}
            addIsDisabled={disableAddDpt}
            addFunction={handleShowDpt}
            valueSearchBox={queryForDepartment}
          />
          
          <div className='organizer-table'>
            <ul style={{listStyleType: 'none', padding:'1rem'}} >
              {searchDepartment(departments).map((department) => 
                  <li>
                    <TableCard 
                    data={[department.id]}
                    id ={department.id}
                    page={'Department'}
                    refresh={fetchDepartments}
                    idList={departmentIdList} />
                  </li>
                )}
            </ul>
          </div>
        </div>

        <div className="clubs organizers-container">
          <PageControlsLeft
            tooltipText={"Search Organizer with the help of Club"}
            inputplaceholder="Search Clubs"
            searchfuntion={searchDataForClub}
            styleSearchBox={{width:'25vw'}}
            addIsDisabled={disableAddClub}
            addFunction={handleShowClub}
            valueSearchBox={queryForClub}
          />
          <div className='organizer-table'>
            <ul style={{listStyleType: 'none', padding:'1rem'}} >
              {searchClub(clubs).map((club) => 
                  <li>
                    <TableCard 
                    data={[club.id]}
                    id ={club.id}
                    page={'Club'}
                    refresh={fetchClubs}
                    idList={clubsIdList} />
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
  
  export default Organizer
  