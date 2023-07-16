import React, { useState, useEffect } from 'react';
import Button from "../Common/Button";
import TextField from '../Common/TextField';
import {createDocumentWithCustomId, deleteDocument, createUser } from '../../Controllers/index';

function AdminForm ({
    data, 
    refresh,
    page, 
    closeModel, 
    idList,
    action,
  }) {
    const emailDomain='@kristujayanti.com'
  
      const [name, setName] = useState(data[0]?data[0]:"");
      const [email, setEmail] = useState(data[0]);
      const [password, setPassword] = useState(data[1]);
      const [confirmpPassword, setConfirmPassword] = useState(data[1]);
      const [validationErors, setValidationErors] = useState({});

      const handleName = (event) => {
        setName(event.target.value);
      };

      const handleEmail = (event) => {
        setEmail(event.target.value);
      };

      const handlePassword = (event) => {
        setPassword(event.target.value);
      };

      const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
      };
  
      let path;
      switch(page){
        case 'Admin':
          path = 'admins'
          break;
  
        case 'Super Admin':
          path = 'superAdmins'
          break;
      }

      const editDocument = async () => {
        if (validate()) {
          await deleteDocument(data[0], path)
          await createDocumentWithCustomId(path, (email+emailDomain),{});
          closeModel();
          refresh(data[0], email);
        }
      }
  
      const addDocument = async () => {
        if (validate()) {
          const createdUser =  await createUser((email+emailDomain), password, name, page)
          console.log(createdUser)
          // await createDocumentWithCustomId(path, (email+emailDomain), {});
          closeModel();
          refresh("NewData", email);
        }
      };
  
      const validate = () => {
        let valid = true;
        let errors = {}
        if (!email) {
          valid = false;
          errors.email ='Email is required'
        }else if(idList.includes(email.toLowerCase()) && (email != data[0])){
          valid = false;
          errors.email = 'This ' + page + ' already exists';
        }else if (!password) {
            valid = false;
            errors.password ='Password is required'
        }

        setValidationErors(errors)
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
            inputValue={name}
            changeHandler={handleName}
            inputGroupStyle={{padding:'0rem'}}
            // errorMessage={"validationErrors.name"}
          />

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
         </div>
          <div style={{flex:'1'}}>
              <p style={{textAlign:"left", marginLeft:'1rem', fontSize:'20px'}} >@kristujayanti.com</p>
          </div>
        </div>

        <TextField
            id="inputEmail"
            inputStyle={{height: "3rem", flex:'1'}}
            isRequired={true}
            type="password"
            placeholder='Password'
            inputValue={password}
            changeHandler={handlePassword}
            inputGroupStyle={{ padding:'0rem'}}
          />
        <TextField
            id="inputEmail"
            inputStyle={{height: "3rem", flex:'1'}}
            type="password"
            placeholder='Confirm Password'
            inputValue={confirmpPassword}
            changeHandler={handleConfirmPassword}
            inputGroupStyle={{ padding:'0rem'}}
          />
        <div style={{ display: 'flex', justifyContent:'end' }}>
            <Button
              clickHandler={addDocument}
              btnClass='primary modal-btn'
              btnStyle={{ padding: '10px', marginTop: '1rem',}}
              text={action}
            />
          </div>
        </div>
        </>
      )
  
  }
  
  export default AdminForm;