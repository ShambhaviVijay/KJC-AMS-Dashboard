import React, { useState, useEffect } from 'react';
import Button from "../Common/Button";
import {FloatingLabel, Form, Col, Row} from 'react-bootstrap';
import DropDown from '../Common/DropDown';
import { readDocuments, createDocument, getDocRef} from '../../Controllers/index';
import Select from 'react-select'

const FacultyForm = ({data = [], action, refresh , closeModel}) => {
    const [departments, setDepartments] = useState([])
    const [clubs, setClubs] = useState([])
    const [name, setName] = useState(data[0])
    const [email, setEmail] = useState(data[1])
    const [selectedDpt, setSelectedDpt] = useState()
    const [selectedClub, setSelectedClub] = useState()

    const path = "/faculty/"
    useEffect(() => {
    try {
        fetchDptClub()
    } catch (err) {
        toast.error('error occured while fetching')
    }
    }, [])

    const fetchDptClub = async () => {
        const departments = await readDocuments('/organizers/departments/department')
        const clubs = await readDocuments('organizers/clubs/club')
        setDepartments(departments)
        setClubs(clubs)
    }

    const handleName = (event) => {
        const name = event.target.value;
        setName(name);
    };

    const handleEmail = (event) => {
        const email = event.target.value;
        setEmail(email);
    };

    const handleDpt = (event) => {
        setSelectedDpt(event.value);
    };

    const handleClub = (event) => {
        setSelectedClub(event.value);
    };

    const departmentOptions = departments.map(item => ({
        value: item.id,
        label: item.deptName
    }));

    const clubOptions = clubs.map(item => ({
        value: item.id,
        label: item.clubName
    }));

    // const setDefaultDpt = () => {
    //     console.log(data[2])
    //     console.log(departmentOptions.find((item) => {
    //         if (item.label === data[2]) {
    //           return true;
    //         }
    //         return false;
    //       }));
    // }

    const addFaculty = async () => {
        const dptRef = await getDocRef("organizers", "departments", "department", selectedDpt)
        const clubRef = await getDocRef("organizers", "clubs", "club", selectedClub)
        await createDocument(path, {facultyName: name, facultyEmail: email, department: dptRef, club: clubRef});
        closeModel();
        refresh();
    }
    return(
        <>
        <Col>
            <Row>
                <FloatingLabel
                    id="inputName"
                    label="Name"
                    className="mb-4">
                    <Form.Control 
                        required
                        type="Name" 
                        placeholder='Name' 
                        value={name}
                        onChange={handleName} />
                </FloatingLabel>
            </Row>
            <Row>
                <FloatingLabel
                    id="inputEmail"
                    label="Email"
                    className="mb-4">
                    <Form.Control 
                        required
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={handleEmail} />
                </FloatingLabel>
            </Row>

            <Row>
                <Col>
                {setDepartments}
                {setClubs}
                    <Select 
                        placeholder='Select Department'
                        height='3rem'
                        options={departmentOptions}
                        defaultValue={data[2] ? { value: data[2], label: data[2] } : null}
                        onChange={handleDpt} />
                </Col>
                <Col>
                    <Select
                        placeholder='Select Club'
                        height="3rem"
                        options={clubOptions}
                        defaultValue={data[3] ? { value: data[3], label: data[3] } : null}
                        onChange={handleClub}
                    />
                </Col>
            </Row>
        </Col>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
            <Button 
                clickHandler={addFaculty}
                btnClass='primary'
                btnStyle={{padding:'10px', marginTop:'1rem'}}
                text={'ADD'} />
        </div>
        </>
    )
}

export default FacultyForm;