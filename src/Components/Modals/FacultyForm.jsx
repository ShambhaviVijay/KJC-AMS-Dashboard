import React, { useState, useEffect } from 'react';
import Button from "../Common/Button";
import {FloatingLabel, Form, Col, Row} from 'react-bootstrap';
import DropDown from '../Common/DropDown';
import { readDocuments } from '../../Controllers/index';

const FacultyForm = ({data = [], action}) => {
    const [departments, setDepartments] = useState([])
    const [clubs, setclubs] = useState([])

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
    setclubs(clubs)
    console.log(departments)
    console.log(clubs)
  }

  const departmentOptions = []
  const mapDptOptions = () => departments.map((department) => departmentOptions[{name: department.deptName, value:department.deptName}])
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
                        style={{paddingLeft:'20px'}} 
                        value={data[0]} />
                </FloatingLabel>
            </Row>
            <Row>
                <FloatingLabel
                    label="Email"
                    className="mb-4">
                    <Form.Control 
                        required
                        id="inputEmail"
                        type="email" 
                        placeholder="Email" 
                        style={{paddingLeft:'20px'}} 
                        value={data[1]} />
                </FloatingLabel>
            </Row>

            <Row>
                <Col>
                {setDepartments}
                {console.log(departmentOptions)}
                    <DropDown
                        required
                        name="depatment"
                        label="Deartment"
                        options={departmentOptions} />
                </Col>
                <Col>
                    <DropDown
                        name="club"
                        label="Club"
                        options={[
                            { name: "LCA", value: "LCA" },
                            { name: "UBA", value: "UBA" },
                            { name: "CSA", value: "CSA" },
                        ]}
                        />
                </Col>
            </Row>
        </Col>
        </>
    )

}

export default FacultyForm;