import axios from "axios";
import { API_URL } from "../config";


export const getCommissionLogsAPI = async (id) => {
    try {
        const data = await axios.get(`${API_URL}/commission-log?userID=${id}`)
            .then(res => {
                console.log(res);
                if (typeof res.data != "undefined") return (res.data);

            })
        console.log("data", data);
        return data;
    }
    catch (error) {
        console.log(error);

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with an error:', error.response.status);
            console.error('Error message:', error.response.data.message);
            if (typeof error.response.data != "undefined") return error.response.data
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server');
            return { success: false }
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error during request setup:', error.message);
            return { success: false }
        }
    }
}


export const getMyPaymentLogsAPI = async () => {
    try {
        const data = await axios.get(`${API_URL}/logs/payment-logs`, {
            headers: {
                "pk2": sessionStorage.getItem("pk2")
            }
        })
            .then(res => {
                console.log(res);
                if (typeof res.data != "undefined") return (res.data);

            })
        console.log("data", data);
        return data;
    }
    catch (error) {
        console.log(error);

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with an error:', error.response.status);
            console.error('Error message:', error.response.data.message);
            if (typeof error.response.data != "undefined") return error.response.data
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server');
            return { success: false }
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error during request setup:', error.message);
            return { success: false }
        }
    }
}
