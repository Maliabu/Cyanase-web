import axios from "axios";
import { TOKEN, API_URL_GET_DEPOSIT, API_URL_USER_GET_PROFILE_PHOTO, API_URL_GET_ALL_FUNDMANAGERS, API_URL_GET_INVESTMENT_CLASSES, API_URL_GET_USER_TRACK, API_URL_GET_INVESTMENT_CLASS_OPTIONS, API_URL_GET_USER_BANKS, API_URL_GET_RISK_ANALYSIS_PERCENTAGES, API_URL_GET_USER_VERIFICATION, API_URL_GET_INVESTMENT_WITHDRAWS, API_URL_GET_INVESTMENT_OPTIONS, API_URL_GET_INVESTMENT_OPTION, API_URL_GET_GOAL, API_URL_GET_WITHDRAW_FEE, API_URL_GET_SUB_STATUS, API_URL_GET_GOAL_DEPOSIT, API_URL_USER_NETWORTH, API_URL_GET_RISK_PROFILE, API_URL_GET_AUTH_USER, API_URL_GET_NEXTOFKIN, API_URL_GET_WITHDRAW, API_URL_GET_GOAL_WITHDRAW, API_URL_GET_PENDING_WITHDRAW } from "../apis";

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

export const RequestFundManagers = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_ALL_FUNDMANAGERS}`, {
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

export const UserBanks = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_USER_BANKS}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const UserVerificationRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_USER_VERIFICATION}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const RequestRiskAnalysisPercentages = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_RISK_ANALYSIS_PERCENTAGES}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const ProfilePhoto = async() => {
    try {
        const response = await axios.get(`${API_URL_USER_GET_PROFILE_PHOTO}`, {
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

export const InvestmentWithdrawRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_INVESTMENT_WITHDRAWS}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const GetUserTrackRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_USER_TRACK}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const WithdrawFeeRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_WITHDRAW_FEE}`, {
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

export const GetInvestmentOptionsRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_INVESTMENT_OPTIONS}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const GetInvestmentClassesRequests = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_INVESTMENT_CLASSES}`, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const GetInvestmentClassOptionsRequests = async(option) => {
    try {
        const response = await axios.post(`${API_URL_GET_INVESTMENT_CLASS_OPTIONS}`, option, {
            headers: {
                "Authorization": `Token ${TOKEN}`
            }
        });
        return response;
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
};

export const GetInvestmentOptionRequest = async() => {
    try {
        const response = await axios.get(`${API_URL_GET_INVESTMENT_OPTION}`, {
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

export const getClassOptions = async(option, description, id, logo) => {
    try {
        const response = await axios.post(`${API_URL_GET_INVESTMENT_CLASS_OPTIONS}`, option, {
            headers: {
                "Authorization": `Token ${TOKEN}`,
                "Content-Type": "application/json"
            }
        });
        return [response.data, option, description, id, logo];
    } catch (error) {
        return error ? error.response ? error.response.data : error : error.message;
    }
}