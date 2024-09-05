import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/";
const API_URL = "https://pinacore-rnlyj.ondigitalocean.app/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivateInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
