import React, { useState } from 'react';
import PageControlsLeft from '../Common/PageControlsLeft';
import TableCard from '../Common/TableCard';
import DetailsModal from "../Modals/DetailsModal";
import './Venue.css'

function Venue ({ 
  venues, 
  fetchVenues,
}) {
  // controls seach data
  const [query, setQuery] = useState("")
  const searchData = (searchData) => setQuery(searchData)
  // filter list according to search data
  const search = (venueData) => venueData.filter(item => item.id.toLowerCase().includes(query.toLowerCase()))

  //show hide for faculty model
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
    setQuery("")
  }
  const handleClose = () => setShow(false);

  const disableAdd = search(venues).length > 0

  const idList = venues.map((faculty) =>(faculty.id).toLowerCase())
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
              closeModel={handleClose}
              action={'Add'}
              page={'Venue'}
              refresh={fetchVenues}
              idList={idList}
            />
            }
          <div className='venue-table'>
            <ul style={{listStyleType: 'none', padding:'1rem'}} >

              {search(venues).map((venue) => 
                  <li>
                    <TableCard 
                    data={[venue.id]}
                    id ={venue.id}
                    page={'Venue'}
                    refresh={fetchVenues}
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