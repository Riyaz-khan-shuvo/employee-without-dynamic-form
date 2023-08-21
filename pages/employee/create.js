import DynamicFrom from '@/components/_dynamicForm';
import { getCities } from '@/services/apiService/city/city.service';
import { getCountries } from '@/services/apiService/country/country.service';
import { getStates } from '@/services/apiService/state/state.service';
import React, { useEffect, useState } from 'react';

const CreateEmployee = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    // const loadCountries = async (countryId) => {
    //     const getData = async () => {
    //         try {
    //             const getAllData = await getStates();
    //             const filteredStates = getAllData.filter((st) => st.countryId === Number(countryId));
    //             setStates(filteredStates);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //     getData();
    // }; 
    useEffect(() => {
        const getCountryData = async () => {
            const getAllData = await getCountries();
            setCountries(getAllData);
        };

        const getCityData = async () => {
            const getAllData = await getCities();
            setCities(getAllData);
        };
        getCountryData();
        // getStateData();
        getCityData();

    }, []);


    console.log(states);

    // const loadState = async () => {

    //     try {
    //         const getAllData = await getStates();
    //         // const filteredStates = getAllData.filter((st) => st.countryId === Number(countryId));
    //         setStates(getAllData);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    // const loadCity = async (stateId) => {
    //     try {
    //         const getAllData = await getCities();
    //         const filterCity = getAllData.filter((ci) => ci.stateId === Number(stateId));
    //         setCities(filterCity);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    const formFields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'address', label: 'Address', type: 'textarea' },
        { name: 'gender', label: 'Gender', type: 'radio', options: ['Male', 'Female', 'Other'] },
        { name: 'joiningDate', label: 'joining Date', type: 'date' },
        { name: 'ssc', label: 'SSC', type: 'checkbox' },
        { name: 'hsc', label: 'HSC', type: 'checkbox' },
        { name: 'bsc', label: 'B.Sc', type: 'checkbox' },
        { name: 'picture', label: 'Picture', type: 'file', accept: 'image/*' },
        { name: 'countryName', label: 'Country', type: 'select', options: countries },
        { name: 'stateName', label: 'State', type: 'select', options: states },
        { name: 'cityName', label: 'City', type: 'select', options: cities }
    ];

    return (
        <div>
            <DynamicFrom fields={formFields} loadState={setStates} loadCity={cities} />
        </div>
    );
};

export default CreateEmployee;