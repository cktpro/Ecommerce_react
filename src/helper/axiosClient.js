import axios from 'axios';

export const axiosAdmin = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_USER,
  headers: { "Content-Type": "application/json" },
});