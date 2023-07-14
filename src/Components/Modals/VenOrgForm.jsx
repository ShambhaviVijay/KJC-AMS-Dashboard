import React, { useState, useEffect } from 'react';
import Button from "../Common/Button";
import TextField from '../Common/TextField';
import {createDocumentWithCustomId, deleteDocument } from '../../Controllers/index';

function VenOrgForm ({
  data, 
  refresh,
  page, 
  closeModel, 
  idList,
  action,
}) {

    const [name, setName] = useState(data[0]);
    const [validationErrors, setValidationErrors] = useState();

    console.log(data[0])
    const handleName = (event) => {
      setName(event.target.value);
    };

    let path;
    switch(page){
      case 'Venue':
        path = 'venue'
        break;

      case 'Department':
        path = 'organizers/departments/department'
        break;

      case 'Club':
        path = 'organizers/clubs/club'
        break;
    }

    const editDocument = async () => {
      if (validate()) {
        await deleteDocument(data[0], path)
        await createDocumentWithCustomId(path, name,{});
        closeModel();
        refresh(data[0], name);
      }
    }

    const addDocument = async () => {
      if (validate()) {
        await createDocumentWithCustomId(path, (name), {});
        closeModel();
        refresh("NewData", name);
      }
    };

    const validate = () => {
      let valid = true;
  
      if (!name) {
        valid = false;
        setValidationErrors(page + ' name is required');
      }else if(idList.includes(name.toLowerCase()) && (name != data[0])){
        valid = false;
        setValidationErrors('This ' + page + ' already exists');
      }
      console.log(valid)
      console.log(validationErrors)

      return valid;
    }

    return(
      <>
        <div style={{flexDirection:"column", display:'flex', width:'700px'}}>
          <TextField
            id="inputName"
            inputStyle={{height: "3rem", flex:'1'}}
            isRequired={true}
            placeholder='Name'
            value={name}
            changeHandler={handleName}
            inputGroupStyle={{padding:'0rem'}}
          />
          {validationErrors && <span style={{fontSize:"13px", color:"red", }} >{validationErrors}</span>}
        </div>

        <div style={{ display: 'flex', justifyContent:'end' }}>
          <Button
            clickHandler={action === 'Add' ? addDocument : editDocument}
            btnClass='primary modal-btn'
            btnStyle={{ padding: '10px', marginTop: '1rem',}}
            text={action}
          />
        </div>
      </>
    )

}

export default VenOrgForm;