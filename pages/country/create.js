import DynamicFrom from '@/components/_dynamicForm';
import { addCountry } from '@/services/apiService/country/country.service';
import { useRouter } from 'next/router';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCountry = () => {
    const formFields = [
        { name: 'countryName', label: 'Country Name', type: 'text' },
    ];
    const router = useRouter()

    const handleSubmit = async (formData) => {
        try {
            const addedCountry = await addCountry(formData);
            console.log('Country added:', addedCountry);
            toast.success('Country has been added successfully!');
            router.push("/country")
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

export default CreateCountry;