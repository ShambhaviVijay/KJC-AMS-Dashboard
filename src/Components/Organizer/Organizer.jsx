import PageControlsLeft from "../Common/PageControlsLeft"
import { useState } from "react"
import TableCard from '../Common/TableCard';
import DetailsModal from "../Modals/DetailsModal";
import "./Organizer.css"

function Organizer({
  departments,
  clubs,
  setDepartments,
  setClubs,
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
  }

  const handleShowClub = () => {
    setShow(true);
    setPage('Club')
    
  }
  const handleClose = () => {
    setShow(false);
    setQueryForDepartment("")
    setQueryForClub("")
  }

  const disableAddDpt = searchDepartment(departments).length > 0
  const disableAddClub = searchClub(clubs).length > 0

  const updateDepartments = (oldId, newId) => {
    if (oldId === "NewData") {
      setDepartments(department => [...department, {id : newId}])
    } else if (newId === "DeletedData") {
      setDepartments(department => department.filter(data => data.id != oldId))
    } else {
      setDepartments(department => department.filter(data => data.id != oldId))
      setDepartments(department => [...department, {id : newId}])
    }
  }

  const updateClubs = (oldId, newId) => {
    if (oldId === "NewData") {
      setClubs(club => [...club, {id : newId}])
    } else if (newId === "DeletedData") {
      setClubs(club => club.filter(data => data.id != oldId))
    } else {
      setClubs(club => club.filter(data => data.id != oldId))
      setClubs(club => [...club, {id : newId}])
    }
  }

  const departmentIdList = departments.map((department) =>(department.id).toLowerCase())
  const clubsIdList = clubs.map((club) =>(club.id).toLowerCase())

  return (
    <>
      <div className="organizers-main-container">
        { show &&
          <DetailsModal
            modalShow={show}
            data={page==="Club"?[queryForClub]:[queryForDepartment]}
            closeModel={handleClose}
            action={'Add'}
            page={page}
            refresh={page==="Club"?updateClubs:updateDepartments}
            idList={page==="Club"?clubsIdList:departmentIdList}
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
          <div className='headers'style={{paddingLeft:'1rem', paddingRight:'1rem'}}>
            <h5 style={{textAlign:'center', width:'12vw'}}>Department</h5>
            <h5 style={{textAlign:'center', width:'17rem'}}>Actions</h5>
          </div>
          <div className='organizer-table'>
            <ul>
              {searchDepartment(departments).map((department) => 
                  <li>
                    <TableCard 
                    data={[department.id]}
                    id ={department.id}
                    page={'Department'}
                    refresh={updateDepartments}
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
          <div className='headers' style={{paddingLeft:'1rem', paddingRight:'1rem'}}>
            <h5 style={{textAlign:'center', width:'12vw'}}>Club</h5>
            <h5 style={{textAlign:'center', width:'17rem'}}>Actions</h5>
          </div>
          <div className='organizer-table'>
            <ul style={{listStyleType: 'none', padding:'1rem'}} >
              {searchClub(clubs).map((club) => 
                  <li>
                    <TableCard 
                    data={[club.id]}
                    id ={club.id}
                    page={'Club'}
                    refresh={updateClubs}
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
  