import { deleteCity, getCities } from '@/services/apiService/city/city.service';
import { } from '@/services/apiService/state/state.service';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const City = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            const getAllData = await getCities();
            setData(getAllData)
        }
        getData()
    }, [])

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure to delete this city?")
        if (confirm) {
            try {
                await deleteCity(id);
                const updatedData = data.filter(item => item.id !== id);
                setData(updatedData);
            } catch (error) {
                console.error('Error deleting country:', error);
            }
        }
    };
    return (
        <div>
            <div className='container mt-5'>
                <h1 className='display-6 mb-3'>State List</h1>
                <Link href={"/city/create"}>Add City </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>City </th>
                            <th>State </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((da, index) => <tr key={index}>
                                <td> {index + 1} </td>
                                <td> {da.cityName} </td>
                                <td> {da.states.stateName} </td>
                                <td>
                                    <Link href={`city/edit/${da.id}`} className='btn btn-sm me-3 btn-success'> Edit </Link>
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
        </div>
    );
};

export default City;