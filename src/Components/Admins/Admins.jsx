import PageControlsLeft from "../Common/PageControlsLeft"
import { useState } from "react"
import TableCard from '../Common/TableCard';
import DetailsModal from "../Modals/DetailsModal";
import "../Organizer/Organizer.css"

function Admins({
  admins,
  superAdmins,
  setAdmins,
  setSuperAdmins,
}){

  const [queryForAdmins, setQueryForAdmins] = useState("")
  const [queryForSuperAdmin, setQueryForSuperAdmin] = useState("")
  const [page, setPage] = useState()

  const searchDataForAdmins = (searchData) => setQueryForAdmins(searchData)
  const searchDataForSuperAdmin = (searchData) => setQueryForSuperAdmin(searchData) 
  
  const searchAdmins = (adminsData) => adminsData.filter(item => item.id.toLowerCase().includes(queryForAdmins.toLowerCase()));
  const searchSuperAdmin = (superAdminData) => superAdminData.filter(item => item.id.toLowerCase().includes(queryForSuperAdmin.toLowerCase()));

  //show hide for faculty model
  const [show, setShow] = useState(false);
  const handleShowDpt = () => {
    setShow(true);
    setPage('Admin')
    setQueryForAdmins("")
  }

  const handleShowSuperAdmin = () => {
    setShow(true);
    setPage('Super Admin')
    setQueryForSuperAdmin("")
  }
  const handleClose = () => setShow(false);

  const disableAddDpt = searchAdmins(admins).length > 0
  const disableAddSuperAdmin = searchSuperAdmin(superAdmins).length > 0

  const updateAdmins = (oldId, newId) => {
    if (oldId === "NewData") {
      setAdmins(admin => [...admin, {id : newId}])
    } else if (newId === "DeletedData") {
      setAdmins(admin => admin.filter(data => data.id != oldId))
    } else {
      searchAdmins(admin => admin.filter(data => data.id != oldId))
      searchAdmins(admin => [...admin, {id : newId}])
    }
  }

  const updateSuperAdmins = (oldId, newId) => {
    if (oldId === "NewData") {
      setSuperAdmins(superAdmin => [...superAdmin, {id : newId}])
    } else if (newId === "DeletedData") {
      setSuperAdmins(superAdmin => superAdmin.filter(data => data.id != oldId))
    } else {
      setSuperAdmins(superAdmin => superAdmin.filter(data => data.id != oldId))
      setSuperAdmins(superAdmin => [...superAdmin, {id : newId}])
    }
  }

  const adminsIdList = admins.map((admin) =>(admin.id).toLowerCase())
  const superAdminsIdList = superAdmins.map((superAdmin) =>(superAdmin.id).toLowerCase())

  return (
    <>
      <div className="organizers-main-container">
        { show &&
          <DetailsModal
            modalShow={show}
            closeModel={handleClose}
            action={'Add'}
            page={page}
            refresh={page==="SuperAdmin"?updateSuperAdmins:updateAdmins}
            idList={page==="SuperAdmin"?superAdminsIdList:adminsIdList}
          />
        }
        <div className="departments organizers-container">
          <PageControlsLeft
            tooltipText={"Search Admin"}
            inputplaceholder="Search Admins"
            searchfuntion={searchDataForAdmins}
            styleSearchBox={{width:'25vw'}}
            addIsDisabled={disableAddDpt}
            addFunction={handleShowDpt}
            valueSearchBox={queryForAdmins}
          />
          <div className='headers'style={{paddingLeft:'1rem', paddingRight:'1rem'}}>
            <h5 style={{textAlign:'center', width:'12vw'}}>Admins</h5>
            <h5 style={{textAlign:'center', width:'17rem'}}>Actions</h5>
          </div>
          <div className='organizer-table'>
            <ul>
              {searchAdmins(admins).map((admin) => 
                  <li>
                    <TableCard 
                    data={[admin.id]}
                    id ={admin.id}
                    page={'Admin'}
                    refresh={updateAdmins}
                    idList={adminsIdList} />
                  </li>
                )}
            </ul>
          </div>
        </div>

        <div className="superAdmins organizers-container">
          <PageControlsLeft
            tooltipText={"Search Super Admin"}
            inputplaceholder="Search Super Admins"
            searchfuntion={searchDataForSuperAdmin}
            styleSearchBox={{width:'25vw'}}
            addIsDisabled={disableAddSuperAdmin}
            addFunction={handleShowSuperAdmin}
            valueSearchBox={queryForSuperAdmin}
          />
          <div className='headers' style={{paddingLeft:'1rem', paddingRight:'1rem'}}>
            <h5 style={{textAlign:'center', width:'12vw'}}>Super Admins</h5>
            <h5 style={{textAlign:'center', width:'17rem'}}>Actions</h5>
          </div>
          <div className='organizer-table'>
            <ul style={{listStyleType: 'none', padding:'1rem'}} >
              {searchSuperAdmin(superAdmins).map((superAdmin) => 
                  <li>
                    <TableCard 
                    data={[superAdmin.id]}
                    id ={superAdmin.id}
                    page={'Super Admin'}
                    refresh={updateSuperAdmins}
                    idList={superAdminsIdList} />
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
  
  export default Admins
  