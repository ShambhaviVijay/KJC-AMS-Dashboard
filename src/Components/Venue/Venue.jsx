import React, { useState } from 'react';
import PageControlsLeft from '../Common/PageControlsLeft';
import TableCard from '../Common/TableCard';
import DetailsModal from "../Modals/DetailsModal";
import './Venue.css'

function Venue ({ 
  venues, 
  setVenues,
}) {
  // controls seach data
  const [query, setQuery] = useState("")
  const searchData = (searchData) => setQuery(searchData)
  // filter list according to search data
  const search = (venueData) => venueData.filter(item => item.id.toLowerCase().includes(query.toLowerCase()))
  // change add button state enable/disable
  const disableAdd = search(venues).length > 0
  //show hide for faculty model
  const [show, setShow] = useState(false);
  const handleShow = () => {
    console.log(query)
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
    setQuery("")
  }
  
  const updateVenue = (oldId, newId) => {
    if (oldId === "NewData") {
      setVenues(venues => [...venues, {id : newId}])
    } else if (newId === "DeletedData") {
      setVenues(venues => venues.filter(data => data.id != oldId))
    } else {
      setVenues(venues => venues.filter(data => data.id != oldId))
      setVenues(venues => [...venues, {id : newId}])
    }
  }

  const idList = venues.map((venue) =>(venue.id).toLowerCase())
  return(
    <>
      <div className='venue-main' > 
        <div className='venue-container'>
          <PageControlsLeft
            tooltipText={"Search Venue with the help of Venue"}
            searchfuntion={searchData}
            styleSearchBox={{width:'35rem'}}
            inputplaceholder="Search venue"
            addIsDisabled={disableAdd}
            addFunction={handleShow}
            valueSearchBox={query}
          />

          { show &&
            <DetailsModal
              modalShow={show}
              data={[query]}
              closeModel={handleClose}
              action={'Add'}
              page={'Venue'}
              refresh={updateVenue}
              idList={idList}
            />
          }
          <div className='headers' style={{paddingLeft:'1rem', paddingRight:'1rem'}}>
                <h5 style={{textAlign:'center', width:'12vw'}}>Venue</h5>
                <h5 style={{textAlign:'center', width:'17rem'}}>Actions</h5>
          </div>
          <div className='venue-table'>
            <ul style={{listStyleType: 'none', padding:'1rem'}} >
              {search(venues).map((venue) => 
                  <li>
                    <TableCard 
                    data={[venue.id]}
                    id ={venue.id}
                    page={'Venue'}
                    refresh={updateVenue}
                    idList={idList} />
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Venue;