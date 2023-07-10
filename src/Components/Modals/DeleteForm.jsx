import React, { useState, useEffect } from 'react';
import Button from "../Common/Button";
import {Col, Row } from 'react-bootstrap';
import TextField from '../Common/TextField';
import { deleteDocument } from '../../Controllers/index';

const DeleteForm = ({page, refresh, closeModel, deleteId,}) => {

    let path;
    switch(page){
        case 'Faculty':
            path = 'faculty'
            break;

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

    const deleteDoc = async () => {
        await deleteDocument(deleteId, path)
        closeModel()
        refresh()
    }

    return (
        <>
        <p>Are you sure you ant to delete {deleteId} ?</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

            <Button
            clickHandler={closeModel}
            btnClass='primary'
            btnStyle={{margin: '1rem' }}
            text={"No"}
            />

            <Button
            clickHandler={deleteDoc}
            btnClass='primary'
            btnStyle={{margin: '1rem' }}
            text={"Yes"} 
            />
      </div>
        </>
    )

}

export default DeleteForm
