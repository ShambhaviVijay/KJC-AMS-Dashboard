import React, { useState, useEffect } from 'react';
import Button from "../Common/Button";
import TextField from '../Common/TextField';
// import {createDocumentWithCustomId, deleteDocument, createUser } from '../../Controllers/index';

function AdminForm ({
    data, 
    refresh,
    page, 
    closeModel, 
    idList,
    action,
  }) {
    const emailDomain='@kristujayanti.com'
  
      const [email, setEmail] = useState(data[0]);
      const [password, setPassword] = useState(data[1]);
      const [validationErors, setValidationErors] = useState({});
  
      console.log(idList)
      const handleEmail = (event) => {
        setEmail(event.target.value);
      };

      const handlePassword = (event) => {
        setPassword(event.target.value);
      };
  
      let path;
      switch(page){
        case 'Admins':
          path = 'admins'
          break;
  
        case 'Super Admins':
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
            await createUser((email+emailDomain), password)
          await createDocumentWithCustomId(path, (email+emailDomain), {});
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
                    />
                    {validationErors.email && <span style={{fontSize:"13px", color:"red", }} >{validationErors.email}</span>}
                </div>
                <div style={{flex:'1'}}>
                    <p style={{textAlign:"left", marginLeft:'1rem', fontSize:'20px'}} >@kristujayanti.com</p>
                </div>
            </div>

            <TextField
                id="inputName"
                inputStyle={{height: "3rem", flex:'1'}}
                isRequired={true}
                placeholder='Password'
                type='password'
                inputValue={password}
                changeHandler={handlePassword}
                inputGroupStyle={{padding:'0rem'}}
            />
            {validationErors.password && <span style={{fontSize:"13px", color:"red", }} >{validationErors.password}</span>}
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
  
  export default AdminForm;