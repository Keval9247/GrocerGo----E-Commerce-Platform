import axios from "axios";

export const Subscribe = async (email) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe`, email);
        return response;
    } catch (error) {
        throw error
    }
}