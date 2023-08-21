import DynamicFrom from '@/components/_dynamicForm';
import { addCountry } from '@/services/apiService/country/country.service';
import { addDepartment } from '@/services/apiService/department/department.service';
import { useRouter } from 'next/router';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateDepartment = () => {
    const formFields = [
        { name: 'departmentName', label: 'Department Name', type: 'text' },
    ];
    const router = useRouter()

    const handleSubmit = async (formData) => {
        try {
            const addDep = await addDepartment(formData);
            console.log('Country added:', addDep);
            toast.success('Country has been added successfully!');
            router.push("/department")
        } catch (error) {
            console.error('Error adding country:', error);
            toast.error('Error adding country. Please try again.');
        }
    };

    return (
        <div>
            <DynamicFrom fields={formFields} onSubmit={handleSubmit} />
            <ToastContainer />
        </div>
    );
};

export default CreateDepartment;