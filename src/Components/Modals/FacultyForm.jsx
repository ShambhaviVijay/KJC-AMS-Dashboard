import React, { useState, useEffect } from 'react';
import Button from "../Common/Button";
import TextField from '../Common/TextField';
import {createDocumentWithCustomId, updateDocument, deleteDocument } from '../../Controllers/index';
import Select from 'react-select';

function FacultyForm ({ 
  data = [], 
  action, 
  refresh, 
  closeModel, 
  idList,
  departments, 
  clubs}){
  const path = "faculty";
  const emailDomain='@kristujayanti.com'
  const fetchedClubs = (data[3] && data[3] !== 'None') ? data[3].split(","): []

  const emailUid = data[1]?(data[1]).split('@')[0]:null
  const [name, setName] = useState(data[0]?data[0]:"");
  const [email, setEmail] = useState(data[1]?emailUid:"");
  const [selectedDpt, setSelectedDpt] = useState(data[2] ? {value: data[2], label: data[2] } : null);
  const [selectedClub, setSelectedClub] = useState(fetchedClubs.map((item) => ({ value: item, label: item })));
  const [validationErrors, setValidationErrors] = useState({});

  const departmentOptions = departments.map((item) => ({
    value: item.id,
    label: item.id
  }));

  const clubOptions = clubs.map((item) => ({
    value: item.id,
    label: item.id
  }));

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleDpt = (event) => {
    setSelectedDpt(event);
  };

  const handleClub = (selected) => {
    setSelectedClub(selected);
  };

  const addFaculty = async () => {
    if (validate()) {
      const clubs = selectedClub.map((item) => item.value)
      try {
        await createDocumentWithCustomId(path, (email+emailDomain), { facultyName: name, department: String(selectedDpt.value), club: clubs });
        refresh();
      } catch (error){
      }
      closeModel();
    }
  };

  const editFaculty = async () => {
    if (validate()) {
      const clubs = selectedClub.map((item) => item.value)
      if(email != data[1]){
        await deleteDocument(data[1], path)
        await createDocumentWithCustomId(path, (email+emailDomain), { facultyName: name, department: String(selectedDpt.value), club: clubs});
      }
      else{
        await updateDocument(path, email, { facultyName: name, department: String(selectedDpt.value), club: String(selectedClub.value) });
      }
      closeModel();
      refresh();
    }
  };

  const validate = () => {
    let valid = true;
    const errors = {};

    if (!name) {
      valid = false;
      errors.name = 'Name is required';
    }
    if(!email){
      valid = false;
      errors.email = 'Email is required';
    }

    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email+emailDomain))) {
      valid = false;
      errors.email = 'Invalid email address';
    }
    if(idList.includes(email) && (emailUid?email != emailUid:true)){
      valid = false;
      errors.email = 'Email already exists';
    }
    if (!selectedDpt) {
      valid = false;
      errors.department = 'Department is required';
    }

    // if (!selectedClub) {
    //   valid = false;
    //   errors.club = 'Club is required';
    // }

    setValidationErrors(errors);
    return valid;
  };

  return (
    <>
      <div style={{flexDirection:"column", display:'flex', width:'700px'}}>
          <TextField
            id="inputName"
            inputStyle={{height: "3rem", flex:'1'}}
            isRequired={true}
            placeholder='Name'
            inputValue={name}
            changeHandler={handleName}
            inputGroupStyle={{padding:'0rem'}}
            // errorMessage={"validationErrors.name"}
          />
          {validationErrors.name && <span style={{fontSize:"13px", color:"red", }} >{validationErrors.name}</span>}

        <div style={{ display:'flex',flex:'1', alignItems:"baseline", marginTop:'12px'}}>
          <div style={{ flex:'2'}}>
            <TextField
              id="inputEmail"
              inputStyle={{height: "3rem"}}
              isRequired={true}
              type="Email"
              placeholder='Email'
              inputValue={email}
              changeHandler={handleEmail}
              inputGroupStyle={{ padding:'0rem'}}
              // errorMessage={"validationErrors.email"}
            />
            {validationErrors.email && <span style={{fontSize:"13px", color:"red", }} >{validationErrors.email}</span>}
         </div>
          <div style={{flex:'1'}}>
              <p style={{textAlign:"left", marginLeft:'1rem', fontSize:'20px'}} >@kristujayanti.com</p>
          </div>
        </div>

        <div style={{ display:'flex',marginTop:'12px'}}>
          <div style={{flex:'1'}}>
            <Select
              // className="flex-item"
              id="inputDepartment"
              placeholder='Select Department'
              options={departmentOptions}
              styles={{ flex:1 }}
              defaultValue={selectedDpt}
              onChange={handleDpt}/>
            {validationErrors.department && <span style={{fontSize:"13px", color:"red", }} >{validationErrors.department}</span>}
          </div>
          <div style={{flex:'1', marginLeft:'1rem'}}>
            <Select
              defaultValue={selectedClub}
              placeholder='Select Clubs'
              closeMenuOnSelect={false}
              isMulti
              name="colors"
              options={clubOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleClub}
            />
            {validationErrors.club && <span style={{fontSize:"13px", color:"red", }} >{validationErrors.club}</span>}
          </div>
        </div>
       
      </div>
      <div style={{ display: 'flex', justifyContent:'end' }}>
          <Button
            clickHandler={action === 'Add' ? addFaculty : editFaculty}
            btnClass='primary modal-btn'
            btnStyle={{ padding: '10px', marginTop: '1rem',}}
            text={action}
          />
        </div>
    </>
  )
}

export default FacultyForm
