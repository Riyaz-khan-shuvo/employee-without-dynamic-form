import { getAllCountry, getCityByState, getStateByCountry } from '@/services/apiService/Common/Common.service';
import { getSingleEmployee, updateEmployee } from '@/services/apiService/employee/employee.service';
import { getStates } from '@/services/apiService/state/state.service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const EditEmp = () => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState();
    const [state, setState] = useState();
    const [states, setStates] = useState([]);
    const [city, setCity] = useState([]);
    const [cities, setCities] = useState([]);
    const router = useRouter()
    let count = 0
    const id = router.query.edit;
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const selectedState = (e) => {
        setCountry(e.target.value);
        loadState(e);
      };

      const selectedCity = (e)=>{
        setCity(e.target.value)
        loadCity(e)
      }
    useEffect(() => {
        const getData = async (id) => {
            try {
                const getAllData = await getSingleEmployee(id);
                setData(getAllData);
                if(!country&&country!=getAllData.countryId){
                    setCountry(getAllData.countryId);
                    const dataState = await getStateByCountry(getAllData.countryId);

                    setStates(dataState);
                }
                if(!state&&state!=getAllData.stateId){
                    setState(getAllData.stateId);
                    const dataCity = await getCityByState(getAllData.stateId);
                    setCities(dataCity);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (id !== undefined) {
            getData(id);
        }
        const getCountryData = async () => {
            const getAllData = await getAllCountry();
            setCountries(getAllData);
        };
        getCountryData();

        // const getAllState = async () => {
        //     const getAllData = await getStates();
        //     setStates(getAllData);
        // };
        // getAllState();


    }, [id]);


    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        // Handle picture file input separately
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

        // Handle other inputs
        if (type === 'checkbox') {
            setData((prevData) => ({
                ...prevData,
                [name]: checked,
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const loadState = async (e) => {

        try {
            if(country){
            const getAllData = await getStateByCountry(e.target.value);

            setStates(getAllData);
            if (data.stateId) {
                e.target.value = data.stateId;
            }
        }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const loadCity = async (e) => {

        handleChange(e)
        try {
            const getData = await getCityByState(e.target.value);
            setCities(getData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    if (data.dateOfBirth != undefined) {
        var convertedDate = new Date(data.dateOfBirth).toISOString().split('T')[0];
    }


    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const empData = new FormData(e.target)
            const addEmp = await updateEmployee(id, empData);
            router.push("/emp")
        } catch (error) {
            console.error('Error adding country:', error);
        }
    }



    return (
        <div>
            {isLoading ? <p>Loading ...</p> : <>
                <div className='emp-bg'>
                    <section className="content">
                        <div className="container">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Edit Employee</h3>
                                </div>
                                <form onSubmit={(e) => handleEdit(e)}>
                                    <div className="card-body">

                                        <input type="hidden" name="id" value={data.id} />
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label" htmlFor="firstName">First Name</label>
                                                    <div className="col-md-9">
                                                        <input value={data.firstName} onChange={(e) => handleChange(e)} className="form-control" type="text" name="firstName" />
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label" htmlFor="lastName">Last Name</label>
                                                    <div className="col-md-9">
                                                        <input value={data.lastName} onChange={(e) => handleChange(e)} className="form-control" type="text" name="lastName" />
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label" htmlFor="phone">Email </label>
                                                    <div className="col-md-9">
                                                        <input value={data.email} onChange={(e) => handleChange(e)} className="form-control" type="email" name="email" />
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label" htmlFor="phone">Phone </label>
                                                    <div className="col-md-9">
                                                        <input value={data.phone} onChange={(e) => handleChange(e)} className="form-control" type="text" name="phone" />
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label" htmlFor="dateOfBirth">Date Of Birth</label>
                                                    <div className="col-md-9 pt-2">
                                                        <input value={convertedDate} className="form-control" type="date" name="dateOfBirth" onChange={(e) => handleChange(e)} />
                                                        <span className="text-danger field-validation-valid"  ></span>
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label">Gender</label>
                                                    <div className="col-md-9 pt-2">
                                                        <label className="radio-inline ml-3">
                                                            <input onChange={(e) => handleChange(e)} className="form-check-input" name="gender" type="radio" value="male" checked={data.gender === "male"} /> Male
                                                        </label>
                                                        <label className="radio-inline ml-4">
                                                            <input onChange={(e) => handleChange(e)} className="form-check-input" name="gender" type="radio" value="female" checked={data.gender === "female"} /> Female
                                                        </label>
                                                        <label className="radio-inline ml-4">
                                                            <input className="form-check-input" name="gender" type="radio" onChange={(e) => handleChange(e)} value="other" checked={data.gender === "other"} /> Other
                                                        </label>
                                                        <br />

                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label">Education</label>
                                                    <div className="col-md-9 pt-2">
                                                        <div className="form-check form-check-inline">
                                                            <input checked={data.ssc === true} onChange={(e) => handleChange(e)} type="checkbox" className="form-check-input" name="ssc" value="true" />
                                                            <label className="form-check-label" htmlFor="Ssc">
                                                                Ssc
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input checked={data.hsc === true} onChange={(e) => handleChange(e)} type="checkbox" className="form-check-input" name="hsc" value="true" />
                                                            <label className="form-check-label" htmlFor="Hsc">
                                                                Hsc
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input checked={data.bsc === true} onChange={(e) => handleChange(e)} type="checkbox" className="form-check-input" name="bsc" value="true" />
                                                            <label className="form-check-label" htmlFor="Bsc">
                                                                Bsc
                                                            </label>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label" htmlFor="address">Address</label>
                                                    <div className="col-md-9">
                                                        <textarea value={data.address} onChange={(e) => handleChange(e)} rows="4" className="form-control" name="address"></textarea>
                                                        <span className="text-danger field-validation-valid" ></span>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-md-6">

                                                <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label" htmlFor="zipCode">Zip Code </label>
                                                    <div className="col-md-9">
                                                        <input value={data.zipCode} onChange={(e) => handleChange(e)} className="form-control" type="text" name="zipCode" />
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label" htmlFor="countryId">Country Name</label>
                                                    <div className="col-md-9">
                                                        <select onChange={selectedState}
                                                         className="form-control" name="countryId" value={country}>
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
                                                        <select
                                                            value={data.stateId}
                                                            onChange={(e) => selectedCity(e)}
                                                            className="form-control"
                                                            data-val="true"
                                                            name="stateId"
                                                        >
                                                            <option value="">Select State</option>
                                                            {states.data != undefined &&
                                                                states.data.map((st, index) => (
                                                                    <option value={st.id} key={index}>
                                                                        {st.name}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <label className="col-md-3 col-form-label" htmlFor="cityId">City Name</label>
                                                    <div className="col-md-9">
                                                        <select
                                                            value={data.cityId}
                                                            onChange={(e) => handleChange(e)}
                                                            className="form-control"
                                                            data-val="true"
                                                            name="cityId"
                                                        >
                                                            <option value="">Select City</option>
                                                            {cities.data != undefined &&
                                                                cities.data.map((ci, index) => (
                                                                    <option value={ci.id} key={index}>
                                                                        {ci.name}
                                                                    </option>
                                                                ))}
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
                                                            </div> : <>  <img src={`https://localhost:7217/${data.picture}`} alt="img" id="UploadFile" className="img-thumbnail" style={{ width: "150px" }} /> </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <div className="text-end">
                                            <button type="submit" className="btn btn-outline-primary btn-sm">
                                                <i className="far fa-save"></i> Edit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>



            </>}
        </div>
    );
};

export default EditEmp;