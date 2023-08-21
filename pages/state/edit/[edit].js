import DynamicFrom from '@/components/_dynamicForm';
import { getCountries } from '@/services/apiService/country/country.service';
import { getSingleState, updateState } from '@/services/apiService/state/state.service';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const EditState = () => {
    const [country, setCountry] = useState([])
    const [state, setState] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const id = router.query.edit;
    useEffect(() => {
        const getCountry = async () => {
            const getAllData = await getCountries();
            setCountry(getAllData)
        }
        getCountry()
        const getData = async (stateId) => {
            try {
                const getAllData = await getSingleState(stateId);
                setState(getAllData);
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
        const countryId = formData.countryName;
        delete formData.countryName
        const stateData = { ...formData, id, countryId }
        try {
            const updatedData = await updateState(id, stateData);
            console.log('Updated data:', updatedData);
            toast.success('State has been updated successfully!');
            await router.push("/state"); // Wait for navigation before showing toast
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const formFields = [
        { name: 'stateName', label: 'State Name', type: 'text' },
        { name: 'countryName', label: 'Country', type: 'select', options: country }
    ];

    return (
        <div>
            <DynamicFrom fields={formFields} onSubmit={handleEdit} info={state} />
            <ToastContainer />
        </div>
    );
};

export default EditState;