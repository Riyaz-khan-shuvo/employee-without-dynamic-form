import { deleteEmployee, getEmployee } from '@/services/apiService/employee/employee.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const Employee = () => {
    const [data, setData] = useState([])


    useEffect(() => {
        const getData = async () => {
            const getAllData = await getEmployee();
            setData(getAllData)
        }
        getData()
    }, [data])
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure to delete this country?")
        if (confirm) {
            try {
                await deleteEmployee(id);
            } catch (error) {
                console.error('Error deleting country:', error);
            }
        }
    };


    return (
        <div className='container mt-5'>
            <h1 className='display-6 mb-3'>Employee List</h1>
            <Link href={"/emp/create"}>Add Employee</Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name </th>
                        <th>Email </th>
                        <th>Gender </th>
                        <th>Phone </th>
                        <th>Image  </th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.data != undefined && data.data.map((da, index) => <tr key={index}>
                            <td> {index + 1} </td>
                            <td> {da.firstName + " " + da.lastName} </td>

                            <td> {da.email} </td>
                            <td> {da.gender} </td>

                            <td> {da.phone} </td>
                            <td> <img style={{ width: "125px" }} src={`https://localhost:7217/${da.picture}`} alt="" /> </td>

                            {/* <td> {da.name} </td>
                            <td> {da.address} </td>
                            <td> {da.gender} </td>
                            <td> {da.department.departmentName} </td>
                            <td> {da.joiningDate} </td>
                            <td> {da.joiningDate} </td>
                            <td> {da.country.countryName} </td>
                            <td> {da.state.stateName} </td>
                            <td> {da.city.cityName} </td> */}
                            <td>
                                <Link href={`emp/edit/${da.id}`} className='btn btn-sm me-3 btn-success'> <FontAwesomeIcon icon={faPen} /> </Link>
                                <Link href={`emp/details/${da.id}`} className='btn btn-sm me-3 btn-primary'> <FontAwesomeIcon icon={faEye} /> </Link>
                                <Button
                                    className='btn btn-sm btn-danger'
                                    onClick={() => handleDelete(da.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </td>

                        </tr>)
                    }


                </tbody>
            </Table>
        </div>
    );
};

export default Employee;