import { getSingleEmployee } from '@/services/apiService/employee/employee.service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';

const EmpDetails = () => {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const id = router.query.details;
    useEffect(() => {
        const getData = async (id) => {
            try {
                const getAllData = await getSingleEmployee(id);
                setData(getAllData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (id !== undefined) {
            getData(id);
        }
    }, [id]);
    return (
        <div className=''>
            {
                isLoading ? <p>Loading...</p> :
                    <div className="emp-bg">
                        <div className="container">
                            <div class="card">
                                <div class="card-header">
                                    <div class="d-flex justify-content-between">
                                        <h3 class="card-title">Employee Details</h3>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <dl class="row">
                                                <dt class="col-md-3">
                                                    Employee Name
                                                </dt>
                                                <dd class="col-md-9">
                                                    {data.firstName + " " + data.lastName}
                                                </dd>
                                                <dt class="col-md-3">
                                                    Email
                                                </dt>
                                                <dd class="col-md-9">
                                                    {data.email}
                                                </dd>
                                                <dt class="col-md-3">
                                                    Phone
                                                </dt>
                                                <dd class="col-md-9">
                                                    {data.phone}
                                                </dd>
                                                <dt class="col-md-3">
                                                    Address
                                                </dt>
                                                <dd class="col-md-9">
                                                    {data.address}
                                                </dd>
                                                <dt class="col-md-3">
                                                    Gender
                                                </dt>
                                                <dd class="col-md-9">
                                                    {data.gender}
                                                </dd>
                                                <dt class="col-md-3">
                                                    Date of Birth
                                                </dt>
                                                <dd class="col-md-9">
                                                    {data.dateOfBirth}
                                                </dd>
                                                <dt class="col-md-3">
                                                    Education
                                                </dt>
                                                <dd class="col-md-9">
                                                    Ssc
                                                    <input checked={data.ssc == true} class="check-box" disabled="disabled" type="checkbox" />
                                                    Hsc
                                                    <input checked={data.hsc == true} class="check-box" disabled="disabled" type="checkbox" />
                                                    Bsc
                                                    <input checked={data.bsc == true} class="check-box" disabled="disabled" type="checkbox" />
                                                    Msc
                                                    <input class="check-box" disabled="disabled" type="checkbox" />
                                                </dd>

                                                <dt class="col-md-3">
                                                    Country
                                                </dt>
                                                <dd class="col-md-9">
                                                    {data.country.name}
                                                </dd>
                                                <dt class="col-md-3">
                                                    State
                                                </dt>
                                                <dd class="col-md-9">
                                                    {data.state.name}
                                                </dd>
                                                <dt class="col-md-3">
                                                    City
                                                </dt>
                                                <dd class="col-md-9">
                                                    {data.city.name}
                                                </dd>
                                                <dt class="col-md-3">
                                                    Zip Code
                                                </dt>
                                                <dd class="col-md-9">
                                                    {data.zipCode}
                                                </dd>
                                            </dl>
                                        </div>
                                        <div class="col-md-4">
                                            <dl class="row">
                                                <dt class="col-md-3">
                                                    Picture
                                                </dt>
                                                <dd class="col-md-9">
                                                    <img className='img-fluid' src={`https://localhost:7217/${data.picture}`} />
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="d-flex justify-content-end">

                                        <Link class="btn btn-outline-danger btn-sm me-3" href="/emp">
                                            <FontAwesomeIcon icon={faMultiply} /> Cancel
                                        </Link>
                                        <Link class="btn btn-outline-primary btn-sm me-3" href={`/emp/edit/${id}`}>
                                            <FontAwesomeIcon icon={faPen} /> Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default EmpDetails;