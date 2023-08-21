import { apiUrl } from "@/environment/environment";

async function getCountries() {
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

async function getCountry(id) {
    try {
        const response = await fetch(`${apiUrl}/Country/${id}`, { cors: true });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function updateCountry(id, data) {
    try {
        const response = await fetch(`${apiUrl}/Country/${id}`, {
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
async function addCountry(data) {
    try {
        const response = await fetch(`${apiUrl}/Country`, {
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

async function deleteCountry(id) {
    try {
        const response = await fetch(`${apiUrl}/Country/${id}`, {
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
    getCountries,
    getCountry,
    updateCountry,
    addCountry,
    deleteCountry
}

