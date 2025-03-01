import axios from "axios";
const API_URL = "http://localhost:5001/api/auth";

export const register = (email: string, password: string, name: string) =>
    axios.post(`${API_URL}/register`, { email, password, name });

export const login = (email: string, password: string) =>
    axios.post(`${API_URL}/login`, { email, password });