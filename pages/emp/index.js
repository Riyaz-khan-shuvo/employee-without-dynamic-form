import { deleteEmployee, getEmployee } from '@/services/apiService/employee/employee.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';


const Employee = () => {
    const [data, setData] = useState({
        data: [],
        total: 0
    });
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    let limit = 10;

    useEffect(() => {
        const getData = async () => {
            const getAllData = await getEmployee(0, limit);
            setData({
                data: getAllData.data,
                total: getAllData.total
            });
        };
        getData();
        setPageCount(Math.ceil(data.total / limit));
    }, [limit, data.total]);

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

    const handlePageClick = async (data) => {
        const newPage = data.selected;
        setCurrentPage(newPage);
        const employees = await getEmployee(newPage, limit);
        setData(employees);
    };


    return (
        <div className='container mt-5' >
            <h1 className='display-6 mb-3'>Employee List</h1>
            <Link href={"/emp/create"}>Add Employee</Link>
            <div className='emp-table' >
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
                            data.data != undefined && data.data.map((da, index) => {
                                const actualIndex = index + (currentPage * limit) + 1;
                                return (
                                    <tr key={index}>
                                        <td> {actualIndex} </td>
                                        <td> {da.firstName + " " + da.lastName} </td>

                                        <td> {da.email} </td>
                                        <td> {da.gender} </td>

                                        <td> {da.phone} </td>
                                        <td> <img style={{ width: "125px", }} src={`https://localhost:7217/${da.picture}`} alt="" /> </td>

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
                            )
                        }


                    </tbody>

                </Table>
            </div>
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default Employee;