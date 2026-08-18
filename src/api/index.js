import axios from "axios";

const ROOT_PATH = process.env.REACT_APP_ROOT_PATH;
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        if (['/login', '/erp/login'].includes(window.location.pathname)) {
            return Promise.reject(error);
        }

        localStorage.removeItem("access_token");
        window.location.href = `${ROOT_PATH}/login`;
    } else {
        return Promise.reject(error);
    }
})

export default api;
