import { useState, useEffect } from 'react';
import Button from "../Common/Button";
import {Modal} from 'react-bootstrap';
import FacultyForm from './FacultyForm'
import VenOrgForm from './VenOrgForm'

function DetailsModal({modalShow, closeModel, page, refresh, data = []}) {
    
  return (
    <>
      <Modal 
        show={modalShow} 
        onHide={closeModel}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>{page}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {page.includes("Faculty")?<FacultyForm data={data} action={page.split(" ")[0]} closeModel={closeModel} refresh={refresh} /> :<VenOrgForm /> }
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DetailsModal;