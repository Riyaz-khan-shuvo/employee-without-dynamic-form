import DynamicFrom from '@/components/_dynamicForm';
import { getSingleCity, updateCity } from '@/services/apiService/city/city.service';
import { getStates } from '@/services/apiService/state/state.service';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditCity = () => {
    const [state, setState] = useState([])
    const [city, setCity] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const id = router.query.edit;
    useEffect(() => {
        const getState = async () => {
            const getAllData = await getStates();
            setState(getAllData)
        }
        getState()
        const getData = async (stateId) => {
            try {
                const getAllData = await getSingleCity(stateId);
                setCity(getAllData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (id !== undefined) {
            getData(id);
        }
    }, [id])
    const handleEdit = async (formData) => {
        const stateId = formData.stateName;
        delete formData.stateName
        const stateData = { ...formData, id, stateId }
        try {
            const updatedData = await updateCity(id, stateData);
            console.log('Updated data:', updatedData);
            toast.success('State has been updated successfully!');
            await router.push("/city");
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const formFields = [
        { name: 'cityName', label: 'City Name', type: 'text' },
        { name: 'stateName', label: 'State',  type: 'select', options: state }
    ];

    return (
        <div>
            <DynamicFrom fields={formFields} onSubmit={handleEdit} info={city} />
            <ToastContainer />
        </div>
    );
};

export default EditCity;