import { getAllCountry, getCityByState, getStateByCountry } from '@/services/apiService/Common/Common.service';
import { addEmployee } from '@/services/apiService/employee/employee.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';

const CustomModal = ({show , setShow}) => {

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState([])
    const router = useRouter()
    useEffect(() => {
        const getCountryData = async () => {
            const getAllData = await getAllCountry();
            setCountries(getAllData);
        };
        getCountryData();

    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const loadState = async (e) => {

        try {
            const getAllData = await getStateByCountry(e.target.value);

            setStates(getAllData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        handleChange(e)
    };


    const loadCity = async (e) => {
        try {
            const getData = await getCityByState(e.target.value);

            setCities(getData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        handleChange(e)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.target)
            const addEmp = await addEmployee(data);
            setShow(false)

        } catch (error) {
            console.error('Error adding country:', error);
        }
    }




    return (
        <>
          
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-80w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Add Employee 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Card.Body>
                                <Row className="mt-2">
                                    <Col md={6}>
                                        <Form.Group as={Row} controlId="firstName" className='mb-3'>
                                            <Form.Label column md={3}>First Name</Form.Label>
                                            <Col md={9}>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="lastName" className='mb-3'>
                                            <Form.Label column md={3}>Last Name</Form.Label>
                                            <Col md={9}>
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="email" className='mb-3'>
                                            <Form.Label column md={3}>Email</Form.Label>
                                            <Col md={9}>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="phone" className='mb-3'>
                                            <Form.Label column md={3}>Phone</Form.Label>
                                            <Col md={9}>
                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="dateOfBirth" className='mb-3'>
                                            <Form.Label column md={3}>Date Of Birth</Form.Label>
                                            <Col md={9}>
                                                <Form.Control
                                                    type="date"
                                                    name="dateOfBirth"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                <span className="text-danger field-validation-valid"></span>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className='mb-3'>
                                            <Form.Label column md={3}>Gender</Form.Label>
                                            <Col md={9}>
                                                <Form.Check
                                                    inline
                                                    label="Male"
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="Female"
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="Other"
                                                    type="radio"
                                                    name="gender"
                                                    value="other"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className='mb-3'>
                                            <Form.Label column md={3}>Education</Form.Label>
                                            <Col md={9}>
                                                <Form.Check inline label="Ssc" type="checkbox" name="ssc" value="true" onChange={(e) => handleChange(e)} />
                                                <Form.Check inline label="Hsc" type="checkbox" name="hsc" value="true" onChange={(e) => handleChange(e)} />
                                                <Form.Check inline label="Bsc" type="checkbox" name="bsc" value="true" onChange={(e) => handleChange(e)} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="address" className='mb-3'>
                                            <Form.Label column md={3}>Address</Form.Label>
                                            <Col md={9}>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={4}
                                                    name="address"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                <span className="text-danger field-validation-valid"></span>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group as={Row} controlId="zipCode" className='mb-3'>
                                            <Form.Label column md={3}>Zip Code</Form.Label>
                                            <Col md={9}>
                                                <Form.Control
                                                    type="text"
                                                    name="zipCode"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="countryId" className='mb-3'>
                                            <Form.Label column md={3}>Country Name</Form.Label>
                                            <Col md={9}>
                                                <Form.Select onChange={(e) => loadState(e)} name="countryId">
                                                    <option value="">Select Country</option>
                                                    {countries.data &&
                                                        countries.data.map((cou, index) => (
                                                            <option value={cou.id} key={index}>
                                                                {cou.name}
                                                            </option>
                                                        ))}
                                                </Form.Select>
                                                <span className="text-danger field-validation-valid"></span>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="stateId" className='mb-3'>
                                            <Form.Label column md={3}>State Name</Form.Label>
                                            <Col md={9}>
                                                <Form.Select onChange={(e) => loadCity(e)} name="stateId">
                                                    <option value="">Select State</option>
                                                    {states.data &&
                                                        states.data.map((st, index) => (
                                                            <option value={st.id} key={index}>
                                                                {st.name}
                                                            </option>
                                                        ))}
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="cityId" className='mb-3'>
                                            <Form.Label column md={3}>City Name</Form.Label>
                                            <Col md={9}>
                                                <Form.Select onChange={(e) => handleChange(e)} name="cityId">
                                                    <option value="">Select City</option>
                                                    {cities.data &&
                                                        cities.data.map((ci, index) => (
                                                            <option value={ci.id} key={index}>
                                                                {ci.name}
                                                            </option>
                                                        ))}
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="pictureFile" className='mb-3'>
                                            <Form.Label column md={3}>Picture</Form.Label>
                                            <Col md={9}>
                                                <Form.Control
                                                    type="file"
                                                    name="pictureFile"
                                                    accept="image/*"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                <span className="text-danger field-validation-valid"></span>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <div className="text-end">
                                    <Button type="submit" variant="outline-primary" size="sm">
                                        <FontAwesomeIcon icon={faSave} /> Save
                                    </Button>
                                </div>
                            </Card.Footer>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CustomModal;