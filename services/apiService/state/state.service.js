import { apiUrl } from "@/environment/environment";

async function getStates() {
    try {
        const response = await fetch(`${apiUrl}/State`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getSingleState(id) {
    try {
        const response = await fetch(`${apiUrl}/State/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function updateState(id, data) {
    try {
        const response = await fetch(`${apiUrl}/State/${id}`, {
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

async function addState(data) {
    try {
        const response = await fetch(`${apiUrl}/State`, {
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

async function deleteState(id) {
    try {
        const response = await fetch(`${apiUrl}/State/${id}`, {
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
    getStates,
    getSingleState,
    updateState,
    addState,
    deleteState
}