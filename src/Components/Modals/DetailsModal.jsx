import { useState, useEffect } from 'react';
import Button from "../Common/Button";
import {Modal} from 'react-bootstrap';
import FacultyForm from './FacultyForm'
import VenOrgForm from './VenOrgForm'

function DetailsModal({modalShow, closeModel, page, data = []}) {
    
  return (
    <>
      <Modal 
        show={modalShow} 
        onHide={closeModel}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Faculty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {page.includes("faculty")?<FacultyForm data={data} action={page.split(" ")[0]} /> :<VenOrgForm /> }
        </Modal.Body>
        <Modal.Footer>
          <Button 
            clickHandler={closeModel}
            btnClass='primary card-button'
            text={'Close'} />
          <Button 
            clickHandler={closeModel}
            btnClass='primary card-button'
            btnStyle={{padding:'10px'}}
            text={'Save Changes'} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailsModal;