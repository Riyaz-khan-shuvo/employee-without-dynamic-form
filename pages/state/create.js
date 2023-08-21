import DynamicFrom from '@/components/_dynamicForm';
import { getCountries } from '@/services/apiService/country/country.service';
import { addState } from '@/services/apiService/state/state.service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateState = () => {
    const [country , setCountry] = useState([])
    useEffect(()=>{
        const getCountry = async () => {
            const getAllData = await getCountries();
            setCountry(getAllData)
        }
        getCountry()
    },[])
    const formFields = [
        { name: 'stateName', label: 'State Name', type: 'text' },
        { name: 'countryName', label: 'Country', type: 'select', options: country }
    ];
    const router = useRouter()

    const handleSubmit = async (formData) => {
        const countryId = formData.countryName;
        delete formData.countryName
        const stateData = { ...formData, countryId }
        console.log(stateData);
        try {
            const stateInfo = await addState(stateData);
            console.log('State added:', stateInfo);
            toast.success('State has been added successfully!');
            router.push("/state")
        } catch (error) {
            console.error('Error adding country:', error);
            toast.error('Error adding country. Please try again.');
        }
    };
    return (
        <div>
            <div>
                <DynamicFrom fields={formFields} onSubmit={handleSubmit} />
                <ToastContainer />
            </div>
        </div>
    );
};

export default CreateState;