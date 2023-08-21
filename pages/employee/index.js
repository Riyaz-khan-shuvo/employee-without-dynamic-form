import { deleteEmployee, getEmployee } from '@/services/apiService/employee/employee.service';
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
    }, [])

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure to delete this country?")
        if (confirm) {
            try {
                await deleteEmployee(id);
                const updatedData = data.filter(item => item.id !== id);
                setData(updatedData);
            } catch (error) {
                console.error('Error deleting country:', error);
            }
        }
    };


    return (
        <div className='container mt-5'>
            <h1 className='display-6 mb-3'>Employee List</h1>
            <Link href={"/employee/create"}>Add Employee</Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name </th>
                        <th>Address </th>
                        <th>Gender </th>
                        <th>Department </th>
                        <th>Joining Date  </th>
                        <th>Education </th>
                        <th>Country </th>
                        <th>State  </th>
                        <th>City  </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((da, index) => <tr key={index}>
                            <td> {index + 1} </td>
                            <td> {da.name} </td>
                            <td> {da.address} </td>
                            <td> {da.gender} </td>
                            <td> {da.department.departmentName} </td>
                            <td> {da.joiningDate} </td>
                            <td> {da.joiningDate} </td>
                            <td> {da.country.countryName} </td>
                            <td> {da.state.stateName} </td>
                            <td> {da.city.cityName} </td>
                            <td>
                                <Link href={`country/edit/${da.id}`} className='btn btn-sm me-3 btn-success'> Edit </Link>
                                <Button
                                    className='btn btn-sm btn-danger'
                                    onClick={() => handleDelete(da.id)}
                                >
                                    Delete
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