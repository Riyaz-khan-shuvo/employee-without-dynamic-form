import { deleteEmployee, getEmployee } from '@/services/apiService/employee/employee.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBDataTable } from 'mdbreact';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const EmployeePage = () => {
    // const [data, setData] = useState([])
    const PAGE_SIZE = 10;

    const [data, setData] = useState({
        data: [],
        total: 0,
        currentPage: 1, // Add currentPage state
    });

    const fetchEmployeeData = async (pageIndex) => {
        try {
            const response = await getEmployee(pageIndex, PAGE_SIZE);
            setData({
                data: response.data,
                total: response.total,
                currentPage: pageIndex + 1,
            });
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    useEffect(() => {
        fetchEmployeeData(0);
    }, []);

    const handlePageChange = (pageIndex) => {
        fetchEmployeeData(pageIndex);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure to delete this employee?");
        if (confirm) {
            try {
                await deleteEmployee(id);
                // Refresh data after deletion
                fetchEmployeeData(data.currentPage - 1); // Use currentPage to refresh
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const tableInfo = data.data != undefined && data.data.map((da) => da)
    
    // console.log(tableInfo);

    // console.log(data.data);
    // const taleData = {
    //     columns: [
    //         {
    //             label: 'Full Name',
    //             field: 'firstName',
    //             sort: 'asc',
    //             width: 150
    //         },
    //         {
    //             label: 'Email',
    //             field: 'email',
    //             sort: 'asc',
    //             width: 270
    //         },
    //         {
    //             label: 'Gender',
    //             field: 'gender',
    //             sort: 'asc',
    //             width: 200
    //         },
    //         {
    //             label: 'Phone',
    //             field: 'phone',
    //             sort: 'asc',
    //             width: 100
    //         },
    //         {
    //             label: 'Image',
    //             field: 'picture',
    //             sort: 'disabled',
    //             render: (value) => <img src={value} alt="Profile" width="50" />,
    //             width: 150
    //         }
    //     ],
    //     rows: data.data!=undefined&& data.data
    // };


    const columns = [
        {
            label: 'ID',
            field: 'id',
            width: 100,
        },
        {
            label: 'First Name',
            field: 'firstName',
            width: 150,
        },
        {
            label: 'Last Name',
            field: 'lastName',
            width: 150,
        },
        {
            label: 'Email',
            field: 'email',
            width: 200,
        },
        {
            label: 'Profile Picture',
            field: 'picture',
            width: 150,
            sort: 'disabled',
            // render: (field) => <img src={field} alt="Profile" width="50" />
        }
        // Add more columns as needed
    ];

    const rows = data.data != undefined && data.data.map((employee, index) => ({
        id: index + 1,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        picture: <img src={`https://localhost:7217/${employee.picture}`} style={{ width: "55px" }} alt="" />,
        // Add more fields as needed
    }));

    //   const displayedRows = rows.slice(0, ITEMS_PER_PAGE * totalPages);

    // const dataTable = {
    //     columns,
    //     rows: rows,
    // };

    const dataTable = {
        columns,
        rows,
        pagination: true,
        paginationPerPage: PAGE_SIZE,
        paginationRowsPerPageOptions: [10, 20, 30],
        paginationFirstLast: true,
        paginationPrevNext: true,
        paginationTotalRows: data.total,
        onPageChange: (pageIndex) => handlePageChange(pageIndex),
    };

    // const handlePageChange = async (pageIndex) => {
    //     const getAllData = await getEmployee(pageIndex, PAGE_SIZE);
    //     setData(getAllData);
    // };

    console.log(data.data);

    return (
        <div className='container mt-5'>
            <div className='container mt-5'>
                <h1 className='display-6 mb-3'>Employee List</h1>
                <Link href={"/emp/create"}>Add Employee</Link>

                <MDBDataTable
                    striped
                    bordered
                    small
                    data={dataTable}
                />
            </div>
        </div>
    );
};

export default EmployeePage;