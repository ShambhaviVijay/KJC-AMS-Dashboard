import "./Venue.css"
import PageHeader from "../Common/PageHeader"
import { BsBuildingFillAdd } from "react-icons/bs"
import PageControls from "../Common/PageControls"
import TableCard from '../Common/TableCard';
import './Venue.css'

const Venue = () => {
  const searchParam = new URLSearchParams(document.location.search)
  const searchData = searchParam.get('search')
  
  return(
    <>
      <PageHeader
        title="Venue"
        icon={<BsBuildingFillAdd />} />
      <PageControls
        inputplaceholder="Search Venue" 
        setSearchText = {searchData}
        pageSlug={"venue"} />
      <div className='venue-container'>
      <div className='venue-table'>
        <ul style={{listStyleType: 'none'}} >
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
          <li>
            <TableCard row1='M1 audi' />
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Venue;
