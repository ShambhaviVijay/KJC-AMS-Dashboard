import "./Venue.css"
import PageHeader from "../PageHeader/PageHeader"
import { BsBuildingFillAdd } from "react-icons/bs"
import PageControls from "../PageControls/PageControls"
import TableCard from '../Common/TableCard';
import './Venue.css'

const Venue = () => {
  return(
    <>
      <PageHeader title="Venue" icon={<BsBuildingFillAdd />} />
      <div className='venue-container'>
      <PageControls inputplaceholder="Search Venue" />
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
