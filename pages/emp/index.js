import { deleteEmployee, getEmployee, getSearchData } from '@/services/apiService/employee/employee.service';
import { faEye, faPen, faPenSquare, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
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
    const [limit, setLimit] = useState(10)

    useEffect(() => {
        const getData = async () => {
            const getAllData = await getEmployee(0, limit);
            setData({
                data: getAllData.data,
                total: getAllData.total
            });
            setPageCount(Math.ceil(getAllData.total / limit));
        };
        getData();
    }, [limit]);

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

    const handleSearch = async (e) => {
        console.log(e.target.value);
        const empSearchData = await getSearchData(e.target.value);
        setData(empSearchData)
    }

    const handleShowItem = (e) => {
        const newLimit = parseInt(e.target.value);
        setLimit(newLimit);
        setCurrentPage(0);

    }

    return (
        <div className="emp-bg">
            <div className="my-3">
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <h1 className='display-6 mb-3'>Employee List</h1>
                                </div>
                                <div>
                                    <Link className='btn btn-outline-primary btn-sm' href={"/emp/create"}> <FontAwesomeIcon icon={faPenToSquare} />  Add Employee</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='d-flex justify-content-between my-3'>
                                <div>
                                    <div>
                                        <span className='me-3'> Show</span>
                                        <select onChange={(e) => handleShowItem(e)} className="form-control-sm">
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className='me-3'> Search  </label>
                                    <input type="text" onChange={(e) => handleSearch(e)} name="search" id="" />
                                </div>
                            </div>
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
                                <div className="text-end">
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        onPageChange={handlePageClick}
                                        containerClassName={"pagination justify-content-end"}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;