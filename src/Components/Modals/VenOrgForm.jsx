import React, { useState, useEffect } from 'react';
import Button from "../Common/Button";
import {FloatingLabel, Form, Col, Row} from 'react-bootstrap';

const VenOrgForm = (data, action) => {
    return(
        <>
        <Col>
            <Row>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-4"
                    style={{margin:'10px'}}>
                    <Form.Control type="Name" placeholder='Name' />
                </FloatingLabel>
            </Row>
        </Col>
        </>
    )

}

export default VenOrgForm;