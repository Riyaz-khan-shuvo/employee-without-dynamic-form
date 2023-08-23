import { deleteEmployee, getEmployee } from '@/services/apiService/employee/employee.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBDataTable } from 'mdbreact';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

const Pageinat = () => {
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    let limit = 10;

    const total = items.total != undefined ? items.total : 20;
    console.log(total);
    useEffect(() => {
        const getData = async () => {
            const getAllData = await getEmployee(0, limit);
            setItems(getAllData)
            setpageCount(Math.ceil(total / limit));
        }
        getData()
    }, [limit])
    console.log(pageCount);

    const fetchData = async (currentPage) => {
        const res = await getEmployee(currentPage, limit);

        return res.data;
    };

    const handlePageClick = async (data) => {
        console.log(data.selected);

        let currentPage = data.selected ;
console.log(currentPage);
        const commentsFormServer = await getEmployee(currentPage, limit);

        setItems(commentsFormServer);
        // scroll to the top
        //window.scrollTo(0, 0)
    };

    return (
        <div className='container mt-5'>
            <div className='container mt-5'>
                <h1 className='display-6 mb-3'>Employee List</h1>
                <Link href={"/emp/create"}>Add Employee</Link>

                <div className="container">
                    <div className="row m-2">
                        {items.data != undefined && items.data.map((item) => {
                            return (
                                <div key={item.id} className="col-sm-6 col-md-4 v my-2">
                                    <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                                        <div className="card-body">
                                            <h5 className="card-title text-center h2">Id :{item.id} </h5>
                                            <h6 className="card-subtitle mb-2 text-muted text-center">
                                                {item.email}
                                            </h6>
                                            <p className="card-text">{item.body}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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
            </div>
        </div>
    );
};

export default Pageinat;