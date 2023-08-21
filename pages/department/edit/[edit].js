import DynamicFrom from '@/components/_dynamicForm';
import { getSingleDepartment, updateDepartment } from '@/services/apiService/department/department.service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditCountry = () => {
    const router = useRouter()
    const id = router.query.edit;
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const formFields = [
        { name: 'departmentName', label: 'Department Name', type: 'text' },
    ];


    useEffect(() => {
        const getData = async (countryId) => {
            try {
                const getAllData = await getSingleDepartment(countryId);
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

    const handleEdit = async (formData) => {
        const department = { ...formData, id }
        try {
            const updatedData = await updateDepartment(id, department);
            console.log('Updated data:', updatedData);
            toast.success('Department has been updated successfully!');
            router.push("/department")
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div>
            {
                isLoading ? <p>Loading ...</p> : <> <DynamicFrom info={data} fields={formFields} onSubmit={handleEdit} />
                    <ToastContainer />
                </>
            }
        </div>
    );
};

export default EditCountry;