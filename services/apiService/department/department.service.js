import { apiUrl } from "@/environment/environment";

async function getDepartment() {
    try {
        const response = await fetch(`${apiUrl}/Department`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getSingleDepartment(id) {
    try {
        const response = await fetch(`${apiUrl}/Department/${id}`, { cors: true });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function updateDepartment(id, data) {
    try {
        const response = await fetch(`${apiUrl}/Department/${id}`, {
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
async function addDepartment(data) {
    try {
        const response = await fetch(`${apiUrl}/Department`, {
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
        console.error('Error adding Department:', error);
        throw error;
    }
}

async function deleteDepartment(id) {
    try {
        const response = await fetch(`${apiUrl}/Department/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: `);
        }

        return true; // Return a success indicator or any relevant data
    } catch (error) {
        console.error('Error deleting Department:', error);
        throw error;
    }
}
export {
    getDepartment,
    getSingleDepartment,
    updateDepartment,
    addDepartment,
    deleteDepartment
}

