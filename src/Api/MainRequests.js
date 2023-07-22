import axios from "axios";
import { TOKEN, API_URL_GET_DEPOSIT, API_URL_GET_GOAL, API_URL_GET_SUB_STATUS, API_URL_GET_GOAL_DEPOSIT, API_URL_USER_NETWORTH, API_URL_GET_RISK_PROFILE, API_URL_GET_AUTH_USER, API_URL_GET_NEXTOFKIN, API_URL_GET_WITHDRAW, API_URL_GET_GOAL_WITHDRAW, API_URL_GET_PENDING_WITHDRAW } from "../apis";

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

export const WithdrawRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_WITHDRAW}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const SubscriptionRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_SUB_STATUS}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const PendingWithdrawRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_PENDING_WITHDRAW}`, {
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

export const GetNextOfKin = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_NEXTOFKIN}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const GetRiskProfile = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_RISK_PROFILE}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const Networth = async() => {
    try {
        const response = await axios.get(`${API_URL_USER_NETWORTH}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const GoalWithdraws = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_GOAL_WITHDRAW}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};