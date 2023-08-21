import { deleteCountry, getCountries } from '@/services/apiService/country/country.service';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const Country = () => {
    const [data, setData] = useState([])


    useEffect(() => {
        const getData = async () => {
            const getAllData = await getCountries();
            setData(getAllData)
        }
        getData()
    }, [])

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure to delete this country?")
        if (confirm) {
            try {
                await deleteCountry(id);
                const updatedData = data.filter(item => item.id !== id);
                setData(updatedData);
            } catch (error) {
                console.error('Error deleting country:', error);
            }
        }
    };


    return (
        <div className='container mt-5'>
            <h1 className='display-6 mb-3'>Country List</h1>
            <Link href={"/country/create"}>Add Country</Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Country </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((da, index) => <tr key={index}>
                            <td> {index + 1} </td>
                            <td> {da.countryName} </td>
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

export default Country;