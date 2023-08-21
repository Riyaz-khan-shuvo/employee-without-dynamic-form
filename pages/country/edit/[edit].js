import DynamicFrom from '@/components/_dynamicForm';
import { getCountry, updateCountry } from '@/services/apiService/country/country.service';
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
        { name: 'countryName', label: 'Country Name', type: 'text' },
    ];


    useEffect(() => {
        const getData = async (countryId) => {
            try {
                const getAllData = await getCountry(countryId);
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
        const country = { ...formData, id }
        try {
            const updatedData = await updateCountry(id, country);
            console.log('Updated data:', updatedData);
            toast.success('Country has been updated successfully!');
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