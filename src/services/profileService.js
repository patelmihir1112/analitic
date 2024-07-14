import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export async function getProfiles() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
}



export async function createProfile(profile) {
    const formData = new FormData();

    for (const key in profile) {
        formData.append(key, profile[key]);
    }

    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response,"response");
        return response;
    } catch (error) {
        console.error('Error creating profile:', error);
        throw error;
    }
}

