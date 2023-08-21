import React, { useState } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "",
    email: "",
  });
  return (
    <>
      <div className="bg-light w-100 p-3 ">
        <Container>
          <h1 className="display-6">Static Form</h1>
          <hr className="my-4" />
          <Row>
            <Col md="10" className="mx-auto">
              <Form>
                <Row className="mb-3">
                  <Col xs="12" md="6">
                    <Form.FloatingLabel
                      controlId="firstName"
                      label="First Name"
                    >
                      <Form.Control type="text" name="firstName" />
                    </Form.FloatingLabel>
                  </Col>
                  <Col xs="12" md="6">
                    <Form.FloatingLabel controlId="lastName" label="Last Name">
                      <Form.Control type="text" name="lastName" />
                    </Form.FloatingLabel>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs="12" md="6">
                    <Form.FloatingLabel controlId="email" label="Email Address">
                      <Form.Control type="email" name="email" />
                    </Form.FloatingLabel>
                  </Col>
                  <Col xs="12" md="6">
                    <Form.FloatingLabel controlId="dob" label="DOB">
                      <Form.Control type="date" name="dob" />
                    </Form.FloatingLabel>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs="12" md="6">
                    <Form.FloatingLabel controlId="picture" label="Picture">
                      <Form.Control type="file" name="picture" />
                    </Form.FloatingLabel>
                  </Col>
                  <Col xs="12" md="6">
                    <Form.FloatingLabel controlId="gender" label="Gender">
                      <Form.Control
                        as="select"
                        name="gender"
                        value={formData.gender || ""}
                        readOnly
                        // onChange={handleInputChange}
                        // isInvalid={!!formErrors.gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Control>
                    </Form.FloatingLabel>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col xs="12" md="12">
                    <Form.Control type="submit" />
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EmployeeForm;
