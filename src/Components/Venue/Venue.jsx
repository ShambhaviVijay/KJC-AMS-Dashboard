import React, { useState, useEffect } from 'react';
import PageControlsLeft from '../Common/PageControlsLeft';
import TableCard from '../Common/TableCard';
import PageHeader from "../Common/PageHeader"
import { BsFillPersonFill } from "react-icons/bs"
import { readDocuments } from '../../Controllers/index';
import './Venue.css'

const Venue = () => {
  const [venueData, setVenueData] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    try {
      fetchVenue()
    } catch (err) {
      toast.error('error occured while fetching')
    }
  }, [])

  const fetchVenue = async () => {
    const venues = await readDocuments('/Venue')
    setVenueData(venues)
  }

  const searchData = (searchData) => {
    setQuery(searchData)
  }

  const search = (venueData) =>{
    return venueData.filter(item => item.venue_name.toLowerCase().includes(query.toLowerCase()));
  }
  return(
    
    <>
      <PageHeader
        title="Venue"
        icon={<BsFillPersonFill />} />
      
      <div className='venue-container'>
        <PageControlsLeft
          inputplaceholder="Search Venue" 
          // addFunction={add}
          searchfuntion={searchData}
        />
        <div className='venue-table'>
          <ul style={{listStyleType: 'none'}} >
          {search(venueData).map((venue) => 
              <li>
                <TableCard 
                data={[venue.venue_name]}
                id ={venue.id}
                page={'edit venue'} />
              </li>
            )}        
          </ul>
        </div>
    </div>
    </>
  )
}

export default Venue;