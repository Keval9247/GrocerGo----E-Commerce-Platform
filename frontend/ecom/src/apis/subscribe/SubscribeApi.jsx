import axios from "axios";

export const Subscribe = async (email) => {
    try {
        console.log("credentials   : ", email);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/subscribe`, email);
        // console.log("reposnse", response);
        return response;
    } catch (error) {
        throw error
    }
}