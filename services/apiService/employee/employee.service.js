import { apiUrl } from "@/environment/environment";
// https://localhost:7217/api/Employee/search?pageIndex=0&pageSize=10
async function getEmployee(index, size) {
    const response = await fetch(`${apiUrl}/Employee/search?pageIndex=${index}&pageSize=${size}`);
    try {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getSingleEmployee(id) {
    try {
        const response = await fetch(`${apiUrl}/Employee/id?id=${id}`, { cors: true });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function updateEmployee(id, data) {

    try {
        const response = await fetch(`https://localhost:7217/api/Employee/${id}`, {
            method: 'PUT',
            body: data,
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


async function addEmployee(data) {
    console.log(data);
    try {
        const response = await fetch(`${apiUrl}/Employee`, {
            method: 'POST',
            body: data,
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: `);
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding Employee:', error);
        throw error;
    }
}

async function deleteEmployee(id) {
    try {
        const response = await fetch(`${apiUrl}/Employee/id?id=${id}`, {
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


async function getSearchData(text) {
    const response = await fetch(`${apiUrl}/Employee/search?pageIndex=0&pageSize=10&searchText=${text}`);
    try {
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
    getEmployee,
    getSingleEmployee,
    updateEmployee,
    addEmployee,
    deleteEmployee,
    getAllCountry,
    getSearchData
}
