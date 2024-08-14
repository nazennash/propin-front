import axios from 'axios';

// const API_URL = "http://127.0.0.1:8000/";
const API_URL = "https://pinacore-rnlyj.ondigitalocean.app/";

export const axiosPrivateInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to include the token in the request headers
axiosPrivateInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);
