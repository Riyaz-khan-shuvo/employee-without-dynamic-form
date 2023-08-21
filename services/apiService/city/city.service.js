import { apiUrl } from "@/environment/environment";

async function getCities() {
    try {
        const response = await fetch(`${apiUrl}/City/dropdown`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getSingleCity(id) {
    try {
        const response = await fetch(`${apiUrl}/City/${id}`, { cors: true });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function updateCity(id, data) {
    try {
        const response = await fetch(`${apiUrl}/City/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        });

        if (!response.ok) {
            const responseBody = await response.text();
            // throw new Error(`Network response was not ok: ${response.status} - ${responseBody}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

async function addCity(data) {
    try {
        const response = await fetch(`${apiUrl}/City`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: `);
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding country:', error);
        throw error;
    }
}

async function deleteCity(id) {
    try {
        const response = await fetch(`${apiUrl}/City/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: `);
        }

        return true; // Return a success indicator or any relevant data
    } catch (error) {
        console.error('Error deleting country:', error);
        throw error;
    }
}
export {
    getCities,
    getSingleCity,
    updateCity,
    addCity,
    deleteCity
}

