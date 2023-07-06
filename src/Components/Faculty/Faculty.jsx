import React, { useState, useEffect } from 'react';
import PageControlsLeft from '../Common/PageControlsLeft';
import TableCard from '../Common/TableCard';
import PageHeader from '../Common/PageHeader';
import { BsFillPersonFill } from 'react-icons/bs';
import { readDocuments, readSingleDocument } from '../../Controllers/index';
import './Faculty.css';
import FacultyModal from '../Modals/DetailsModal';

const FacultyPage = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');
  const keys = ['facultyName', 'facultyEmail', 'department', 'club'];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    try {
      fetchFaculty();
    } catch (err) {
      toast.error('error occured while fetching');
    }
  }, []);

  const searchData = (searchData) => {
    setQuery(searchData);
  };

  const fetchFaculty = async () => {
    const faculties = await readDocuments('/faculty');
    setFacultyData(faculties);
  };

  const search = (facultyData) => {
    return facultyData.filter((item) =>
      keys.some((key) => String(item[key]).toLowerCase().includes(query.toLowerCase()))
    );
  };

  return (
    <>
      <PageHeader title="Faculty" icon={<BsFillPersonFill />} />

      <div className="main-container">
        {show && <FacultyModal modalShow={show} closeModel={handleClose} />}
        <div className="table-container">
          <PageControlsLeft
            tooltipText={'Search Faculty with the help of Name, Email, Department and Club'}
            inputplaceholder="Search by Faculty"
            // addFunction={add}
            searchfuntion={searchData}
          />
        </div>
        {show && (
          <FacultyModal modalShow={show} closeModel={handleClose} page={'Add Faculty'} refresh={fetchFaculty} />
        )}
        <div className="table-container">
          <ul style={{ listStyleType: 'none' }}>
            {search(facultyData).map((faculty) => (
              <li key={faculty.id}>
                <TableCard data={[faculty.facultyName, faculty.facultyEmail, faculty.club]} id={faculty.id} page={'Edit Faculty'} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FacultyPage;
