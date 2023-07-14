import React, {useState, useMemo} from "react";
import { BiEdit } from "react-icons/bi";
import LoginImage from '../Images/LoginImage.jpg'
import Button from "../Common/Button";
import TextField from "../Common/TextField"
import './Login.css'


export default function Login(){
    return(
        <>
        <div className="login-main">
        <div className='login-card' >
            <h2>AMS Web Portal</h2>

            <div style={{width:'100%'}}>
            <TextField
            id="inputEmail"
            inputStyle={{height: "3rem", flex:'1'}}
            isRequired={true}
            type="Email"
            placeholder='Email'
            // inputValue={email}
            // changeHandler={handleEmail}
            inputGroupStyle={{ padding:'0rem', width:'100%'}}
            />
            {/* {validationErors.email && <span style={{fontSize:"13px", color:"red", }} >{validationErors.email}</span>} */}

            <TextField
                id="inputName"
                inputStyle={{height: "3rem", flex:'1'}}
                isRequired={true}
                placeholder='Password'
                type='password'
                // inputValue={password}
                // changeHandler={handlePassword}
                inputGroupStyle={{padding:'0rem', width:'100%'}}
            />
            {/* {validationErors.password && <span style={{fontSize:"13px", color:"red", }} >{validationErors.password}</span>} */}
            </div>
            <div style={{ width:'100%'}}>
            <Button
            //   clickHandler={action === 'Add' ? addDocument : editDocument}
              btnClass='primary modal-btn'
              btnStyle={{ padding: '10px', marginTop: '1rem', width:'100%'}}
              text={'Login'}
            />
          </div>
          </div>
          {/* </img> */}
        </div>
        </>
    )
}