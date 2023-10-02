import env from "react-dotenv";
// const server = env.SERVER_IP
// const port = env.SERVER_PORT
const server = "34.135.168.124"
// export const API_URL = "http://"+server+":"+port+"/api/v1/en/register/user/";
export const API_URL = "http://"+server+"/api/v1/en/register/user/";
export const API_URL_DEPOSIT = "http://"+server+"/api/v1/en/make/deposit/";
export const API_URL_BANK_WITHDRAW = "http://"+server+"/api/v1/en/make/bank/withdraw/";
export const API_URL_MM_WITHDRAW = "http://"+server+"/api/v1/en/make/mm/withdraw/";
export const API_URL_GOAL_BANK_WITHDRAW = "http://"+server+"/api/v1/en/make/goal/bank/withdraw/";
export const API_URL_GOAL_MM_WITHDRAW = "http://"+server+"/api/v1/en/make/goal/mm/withdraw/";
export const API_URL_GOAL_DEPOSIT = "http://"+server+"/api/v1/en/make/goal/deposit/";
export const API_URL_GET_DEPOSIT = "http://"+server+"/api/v1/en/get/deposit/";
export const API_URL_GET_SUB_STATUS = "http://"+server+"/api/v1/en/get/subscription/status/";
export const API_URL_SUBSCRIBE = "http://"+server+"/api/v1/en/make/subscription/";
export const API_URL_GET_WITHDRAW = "http://"+server+"/api/v1/en/get/withdraw/";
export const API_URL_GET_WITHDRAW_FEE = "http://"+server+"/api/v1/en/get/withdraw/fee/";
export const API_URL_GET_PENDING_WITHDRAW = "http://"+server+"/api/v1/en/get/pending/withdraw/";
export const API_URL_GET_GOAL_WITHDRAW = "http://"+server+"/api/v1/en/get/goal/withdraw/";
export const API_URL_GOAL = "http://"+server+"/api/v1/en/create/goal/";
export const API_URL_GET_GOAL_DEPOSIT = "http://"+server+"/api/v1/en/get/deposit/by/goal";
export const API_URL_GET_GOAL = "http://"+server+"/api/v1/en/get/user/goal/";
export const API_EMAIL_VERIFY = "http://"+server+"/api/v1/en/email/verify/";
export const API_URL_USER_PROFILE_PHOTO = "http://"+server+"/api/v1/en/auth/user/upload/profile/photo/";
export const API_URL_USER_GET_PROFILE_PHOTO = "http://"+server+"/static/photo.png";
export const API_URL_USER_NETWORTH = "http://"+server+"/api/v1/en/auth/user/networth/";
export const API_URL_LOGIN = "http://"+server+"/api/v1/en/auth/user/login/";
export const API_URL_USER_NEXTOFKIN = "http://"+server+"/api/v1/en/user/nextOfKin/";
export const API_URL_GET_NEXTOFKIN = "http://"+server+"/api/v1/en/get/nextOfKin/";
export const API_URL_GET_TOKEN = "http://"+server+"/api/v1/en/auth/token/";
export const API_URL_GET_AUTH_USER = "http://"+server+"/api/v1/en/auth/user/";
export const API_URL_GET_AUTH_USER_BY_EMAIL = "http://"+server+"/api/v1/en/auth/user/email/";
export const API_URL_ADD_AUTH_USER_RISK_PROFILE = "http://"+server+"/api/v1/en/auth/user/riskprofile/";
export const API_URL_GET_RISK_PROFILE = "http://"+server+"/api/v1/en/auth/get/riskprofile/";
export const API_URL_USER_UPDATE_PASSWORD = "http://"+server+"/api/v1/en/auth/user/update/password/"
export const API_URL_PASSWORD_RESET = "http://"+server+"/api/v1/en/password/reset/"
export const API_URL_RESET_PASSWORD = "http://"+server+"/reset/password/"
export const TOKEN = localStorage.getItem('token');