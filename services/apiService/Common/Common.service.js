import { apiUrl } from "@/environment/environment";

async function getAllCountry() {
    try {
        const response = await fetch(`${apiUrl}/Country/dropdown`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getStateByCountry(countryId) {
    try {
        const response = await fetch(`${apiUrl}/State/dropdown?countryId=${countryId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getCityByState(stateId) {
    try {
        const response = await fetch(`${apiUrl}/City/dropdown?stateId=${stateId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export {
    getAllCountry,
    getStateByCountry,
    getCityByState
}
