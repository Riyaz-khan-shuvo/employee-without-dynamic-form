import { getStates } from "@/services/apiService/state/state.service";
import React, { useEffect, useState } from "react";
import { Container, Form, Col, Row, Button, Image } from "react-bootstrap";

const DynamicFrom = ({ fields, info, onSubmit, loadState, loadCity }) => {
  const [formData, setFormData] = useState(info || {
    countryId: "",
    stateId: "",
    cityId: ""
    // ... other fields
  });
  const [formErrors, setFormErrors] = useState({});
  const [stateId, setStateId] = useState({ stateId: "" })
  const [countryId, setCountryId] = useState({ countryId: "" })
  const [cityId, setCityId] = useState({ cityId: "" })
  useEffect(() => {
    const initialFormData = {};
    if (info != undefined) {
      fields.forEach((field) => {
        initialFormData[field.name] = info[field.name] || "";
      });
    }
    setFormData(initialFormData);
  }, [fields, info]);

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    const inputValue =
      type === "checkbox" || type === "radio"
        ? checked
        : type === "file"
          ? files[0]
          : value;

    if (type != "select-one") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        value || type !== "checkbox" ? null : "This field is required",
    }));

    if (type === "select-one" && name === "countryName" && loadState) {
      const getStateData = async () => {
        const getAllData = await getStates();
        const filteredStates = getAllData.filter((st) => st.countryId === Number(value));
        setFormData((prevData) => ({
          ...prevData,
          countryId: value,
          stateId: "",  // Reset state and city when country changes
          cityId: ""
        }));
        loadState(filteredStates);
      };
      getStateData();
    }

    if (type === "select-one" && name === "stateName" && loadCity) {
      loadCity();
    }

  };
  const allData = { ...formData, ...cityId, ...stateId }
  console.log(allData);


  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    fields.forEach((field) => {
      if (!formData[field.name] && field.type !== "checkbox") {
        errors[field.name] = `${field.label} field is required`;
      }

      if (Object.keys(errors).length === 0) {
        onSubmit(formData)
      }
    });
    setFormErrors(errors);
  };


  return (
    <>
      <div className="bg-gradient w-100 p-2">
        <Container>
          <h1 className="display-6">Dynamic Form</h1>
          <hr className="my-4" />
          <Row>
            <Col md="11" className="mx-auto">
              <Row>
                <Form onSubmit={handleSubmit}>
                  {fields.map((field, index) => (
                    <Col key={index} xs="12" md="6" className="mb-3">
                      {field.type === "text" ||
                        field.type === "email" ||
                        field.type === "textarea" ||
                        field.type === "date" ? (
                        <Form.FloatingLabel
                          controlId={field.name}
                          label={field.label}
                        >
                          <Form.Control
                            as={
                              field.type === "textarea" ? "textarea" : undefined
                            }
                            type={field.type}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleInputChange}
                            isInvalid={!!formErrors[field.name]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors[field.name]}
                          </Form.Control.Feedback>
                        </Form.FloatingLabel>
                      ) : field.type === "radio" ? (
                        <div>
                          {field.options.map((option, optionIndex) => (
                            <Form.Check
                              inline
                              key={optionIndex}
                              type={field.type}
                              label={option}
                              name={field.name}
                              value={option}
                              className="form-switch"
                              checked={formData[field.name] === option}
                              onChange={handleInputChange}
                            />
                          ))}
                        </div>
                      ) : field.type === "checkbox" ? (
                        <Form.Check
                          inline
                          type={field.type}
                          label={field.label}
                          name={field.name}
                          className="form-switch"
                          // checked={formData[field.name] === ""}
                          onChange={handleInputChange}
                        />
                      ) : field.type === "select" ? (
                        <Form.FloatingLabel
                          controlId={field.name}
                          label={field.label}
                        >
                          <Form.Control
                            as="select"
                            name={field.name}
                            value={formData[field.name] || ""}
                            id={field.id}
                            onChange={handleInputChange}
                            isInvalid={!!formErrors[field.name]}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options.map((option, i) => (
                              <option selected={(info != undefined && info[`countryId`]) == option.id} key={i} value={option.id}>
                                {option[field.name]}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {formErrors[field.name]}
                          </Form.Control.Feedback>
                        </Form.FloatingLabel>
                      ) : field.type === "file" ? (
                        <Form.Control
                          type={field.type}
                          label={field.label}
                          name={field.name}
                          accept={field.accept}
                          // className="form-switch"
                          // checked={formData[field.name] === ""}
                          onChange={handleInputChange}
                        />
                      ) : null}
                      <Form.Control.Feedback type="invalid">
                        {formErrors[field.name]}
                      </Form.Control.Feedback>
                    </Col>
                  ))}
                  <Button type="submit">{info != undefined ? "Edit" : "Add"}</Button>
                </Form>
              </Row>
            </Col>
          </Row>
        </Container >
      </div >
    </>
  );
};

export default DynamicFrom;
