import DynamicFrom from '@/components/_dynamicForm';
import { getAllCountry, getCityByState, getStateByCountry } from '@/services/apiService/Common/Common.service';
import { getCities } from '@/services/apiService/city/city.service';
import { addEmployee } from '@/services/apiService/employee/employee.service';
import { getStates } from '@/services/apiService/state/state.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import defaultImage from "../../public/images/boxed-bg.jpg"
import React, { useEffect, useState } from 'react';

const CreateEmployee = () => {
    const [countries, setCountries] = useState([]);
    const [department, setDepartment] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState([])
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const router = useRouter()

    useEffect(() => {
        const getCountryData = async () => {
            const getAllData = await getAllCountry();
            setCountries(getAllData);
        };
        getCountryData();

    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (type === 'file') {
            const selectedImage = files[0];
            if (selectedImage) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagePreviewUrl(e.target.result);
                };
                reader.readAsDataURL(selectedImage);
            }
        }
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
            e.target.reset()
            router.push("/emp")
        } catch (error) {
            console.error('Error adding country:', error);
        }


    }

    return (
        <div className='emp-bg'>
            <section className="content">
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Add New Employee</h3>
                        </div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="card-body">

                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="firstName">First Name</label>
                                            <div className="col-md-9">
                                                <input onChange={(e) => handleChange(e)} className="form-control" type="text" name="firstName" />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="lastName">Last Name</label>
                                            <div className="col-md-9">
                                                <input onChange={(e) => handleChange(e)} className="form-control" type="text" name="lastName" />
                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="phone">Email </label>
                                            <div className="col-md-9">
                                                <input onChange={(e) => handleChange(e)} className="form-control" type="email" name="email" />
                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="phone">Phone </label>
                                            <div className="col-md-9">
                                                <input onChange={(e) => handleChange(e)} className="form-control" type="text" name="phone" />
                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="dateOfBirth">Date Of Birth</label>
                                            <div className="col-md-9 pt-2">
                                                <input className="form-control" type="date" name="dateOfBirth" onChange={(e) => handleChange(e)} />
                                                <span className="text-danger field-validation-valid"  ></span>
                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label">Gender</label>
                                            <div className="col-md-9 pt-2">
                                                <label className="radio-inline ml-3">
                                                    <input onChange={(e) => handleChange(e)} className="form-check-input" name="gender" type="radio" value="male" /> Male
                                                </label>
                                                <label className="radio-inline ml-4">
                                                    <input onChange={(e) => handleChange(e)} className="form-check-input" name="gender" type="radio" value="female" /> Female
                                                </label>
                                                <label className="radio-inline ml-4">
                                                    <input className="form-check-input" name="gender" type="radio" onChange={(e) => handleChange(e)} value="other" /> Other
                                                </label>
                                                <br />

                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label">Education</label>
                                            <div className="col-md-9 pt-2">
                                                <div className="form-check form-check-inline">
                                                    <input onChange={(e) => handleChange(e)} type="checkbox" className="form-check-input" name="ssc" value="true" />
                                                    <label className="form-check-label" htmlFor="Ssc">
                                                        Ssc
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input onChange={(e) => handleChange(e)} type="checkbox" className="form-check-input" name="hsc" value="true" />
                                                    <label className="form-check-label" htmlFor="Hsc">
                                                        Hsc
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input onChange={(e) => handleChange(e)} type="checkbox" className="form-check-input" name="bsc" value="true" />
                                                    <label className="form-check-label" htmlFor="Bsc">
                                                        Bsc
                                                    </label>
                                                </div>

                                            </div>
                                        </div>
                                        {/* <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="joiningDate">Joining Date</label>
                                            <div className="col-md-9 pt-2">
                                                <input className="form-control" type="date" name="joiningDate" onChange={(e) => handleChange(e)} />
                                                
                                            </div>
                                        </div> */}
                                        {/* <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="departmentName">Department</label>
                                            <div className="col-md-9">
                                                <select onChange={(e) => handleChange(e)} className="form-control" data-val="true" name="departmentId">
                                                    <option value="">Select Department</option>
                                                    {
                                                        department.map((de, index) => <option value={de.id} key={index}> {de.departmentName} </option>)
                                                    }
                                                </select>
                                         
                                            </div>
                                        </div> */}
                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="address">Address</label>
                                            <div className="col-md-9">
                                                <textarea onChange={(e) => handleChange(e)} rows="4" className="form-control" name="address"></textarea>
                                                <span className="text-danger field-validation-valid" ></span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6">

                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="zipCode">Phone </label>
                                            <div className="col-md-9">
                                                <input onChange={(e) => handleChange(e)} className="form-control" type="text" name="zipCode" />
                                            </div>
                                        </div>

                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="countryId">Country Name</label>
                                            <div className="col-md-9">
                                                <select onChange={(e) => loadState(e)} className="form-control" data-val="true" name="countryId">
                                                    <option value="">Select Country</option>
                                                    {
                                                        countries.data != undefined && countries.data.map((cou, index) => <option value={cou.id} key={index}> {cou.name} </option>)
                                                    }
                                                </select>
                                                <span className="text-danger field-validation-valid" ></span>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="stateId">State Name</label>
                                            <div className="col-md-9">
                                                <select onChange={(e) => loadCity(e)} className="form-control" data-val="true" name="stateId">
                                                    <option value="">Select State</option>
                                                    {
                                                        states.data != undefined && states.data.map((st, index) => <option value={st.id} key={index}> {st.name} </option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="cityId">City Name</label>
                                            <div className="col-md-9">
                                                <select onChange={(e) => handleChange(e)} className="form-control" data-val="true" name="cityId">
                                                    <option value="">Select City</option>
                                                    {
                                                        cities.data != undefined && cities.data.map((ci, index) => <option value={ci.id} key={index}> {ci.name} </option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <label className="col-md-3 col-form-label" htmlFor="pictureFile">Picture</label>
                                            <div className="col-md-9">
                                                <input onChange={(e) => handleChange(e)} type="file" className="form-control" name="pictureFile" accept="image/*" />
                                                <span className="text-danger field-validation-valid"></span>
                                            </div>
                                            <div className="mt-3 text-end">
                                                {imagePreviewUrl !== "" ?
                                                    <div className="mt-3 text-end">
                                                        <img
                                                            src={imagePreviewUrl}
                                                            alt="Uploaded"
                                                            className="img-thumbnail"
                                                            style={{ width: "150px" }}
                                                        />
                                                    </div> : <> <img src={`/images/boxed-bg.jpg`} alt="hi" style={{ width: "155px" }} /> </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="text-end">
                                    <button type="submit" className="btn btn-outline-primary btn-sm">
                                        <FontAwesomeIcon icon={faSave} /> Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CreateEmployee;