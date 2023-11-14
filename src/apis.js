
const server = "server.cyanase.lol"
// const server = "127.0.0.1:8000"
export const API_URL = "https://"+server+"/api/v1/en/register/user/";
export const API_URL_DEPOSIT = "https://"+server+"/api/v1/en/make/deposit/";
export const API_URL_GET_INVESTMENT_OPTIONS = "https://"+server+"/api/v1/en/auth/get/investment/options/";
export const API_URL_BANK_WITHDRAW = "https://"+server+"/api/v1/en/make/bank/withdraw/";
export const API_URL_MM_WITHDRAW = "https://"+server+"/api/v1/en/make/mm/withdraw/";
export const API_URL_GOAL_BANK_WITHDRAW = "https://"+server+"/api/v1/en/make/goal/bank/withdraw/";
export const API_URL_GOAL_MM_WITHDRAW = "https://"+server+"/api/v1/en/make/goal/mm/withdraw/";
export const API_URL_GOAL_DEPOSIT = "https://"+server+"/api/v1/en/make/goal/deposit/";
export const API_URL_GET_DEPOSIT = "https://"+server+"/api/v1/en/get/deposit/";
export const API_URL_GET_SUB_STATUS = "https://"+server+"/api/v1/en/get/subscription/status/";
export const API_URL_SUBSCRIBE = "https://"+server+"/api/v1/en/make/subscription/";
export const API_URL_GET_WITHDRAW = "https://"+server+"/api/v1/en/get/withdraw/";
export const API_URL_GET_WITHDRAW_FEE = "https://"+server+"/api/v1/en/get/withdraw/fee/";
export const API_URL_GET_PENDING_WITHDRAW = "https://"+server+"/api/v1/en/get/pending/withdraw/";
export const API_URL_GET_GOAL_WITHDRAW = "https://"+server+"/api/v1/en/get/goal/withdraw/";
export const API_URL_GOAL = "https://"+server+"/api/v1/en/create/goal/";
export const API_URL_GET_GOAL_DEPOSIT = "https://"+server+"/api/v1/en/get/deposit/by/goal";
export const API_URL_GET_GOAL = "https://"+server+"/api/v1/en/get/user/goal/";
export const API_EMAIL_VERIFY = "https://"+server+"/api/v1/en/email/verify/";
export const API_URL_USER_PROFILE_PHOTO = "https://"+server+"/api/v1/en/auth/user/upload/profile/photo/";
export const API_URL_USER_GET_PROFILE_PHOTO = "https://"+server+"/static/photo.png";
export const API_URL_USER_NETWORTH = "https://"+server+"/api/v1/en/auth/user/networth/";
export const API_URL_LOGIN = "https://"+server+"/api/v1/en/auth/user/login/";
export const API_URL_USER_NEXTOFKIN = "https://"+server+"/api/v1/en/user/nextOfKin/";
export const API_URL_GET_NEXTOFKIN = "https://"+server+"/api/v1/en/get/nextOfKin/";
export const API_URL_GET_TOKEN = "https://"+server+"/api/v1/en/auth/token/";
export const API_URL_GET_AUTH_USER = "https://"+server+"/api/v1/en/auth/user/";
export const API_URL_REGISTER_API_USER = "https://"+server+"/api/v1/en/register/api/user/";
export const API_URL_GET_AUTH_USER_BY_EMAIL = "https://"+server+"/api/v1/en/auth/user/email/";
export const API_URL_ADD_AUTH_USER_RISK_PROFILE = "https://"+server+"/api/v1/en/auth/user/riskprofile/";
export const API_URL_GET_RISK_PROFILE = "https://"+server+"/api/v1/en/auth/get/riskprofile/";
export const API_URL_USER_UPDATE_PASSWORD = "https://"+server+"/api/v1/en/auth/user/update/password/"
export const API_URL_PASSWORD_RESET = "https://"+server+"/api/v1/en/password/reset/"
export const API_URL_RESET_PASSWORD = "https://"+server+"/reset/password/"
export const PROFILE_PHOTO = "https://"+server+"/media/profile/default_picture.jpg"
export const TOKEN = localStorage.getItem('token');
export const apiDocs = "https://developers.cyanase.lol"