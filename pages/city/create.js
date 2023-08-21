import DynamicFrom from '@/components/_dynamicForm';
import { addCity } from '@/services/apiService/city/city.service';
import { getStates } from '@/services/apiService/state/state.service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCity = () => {
    const [state, setState] = useState([])
    useEffect(() => {
        const getCountry = async () => {
            const getAllData = await getStates();
            setState(getAllData)
        }
        getCountry()
    }, [])
    const formFields = [
        { name: 'cityName', label: 'City Name', type: 'text' },
        { name: 'stateName', label: 'State', type: 'select', options: state }
    ];
    const router = useRouter()

    const handleSubmit = async (formData) => {
        const stateId = formData.stateName;
        delete formData.stateName
        const cityData = { ...formData, stateId }
        console.log(cityData);
        try {
            const stateInfo = await addCity(cityData);
            console.log('State added:', stateInfo);
            toast.success('City has been added successfully!');
            router.push("/city")
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

export default CreateCity;