import axios from "axios";
import { TOKEN, API_URL_GET_DEPOSIT, API_URL_GET_GOAL, API_URL_GET_GOAL_DEPOSIT, API_URL_GET_AUTH_USER } from "../apis";

export const MainRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_DEPOSIT}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const UserRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_AUTH_USER}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const PersonalRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_GOAL}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const GoalDeposit = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_GOAL_DEPOSIT}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};