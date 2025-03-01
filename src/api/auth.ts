import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL + "api/auth";

export const register = (email: string, password: string, name: string) =>
    axios.post(`${API_URL}/register`, { email, password, name });

export const login = (email: string, password: string) =>
    axios.post(`${API_URL}/login`, { email, password });

export const verifyToken = async (token: string): Promise<boolean> => {
    try {
        const response = await axios.get(`${API_URL}/validate-token`, { headers: { Authorization: `Bearer ${token}` },});
        if (!response.status) throw new Error("Invalid Token");
        return true;
    } catch (error) {
        localStorage.removeItem("token"); // Remove invalid token
        return false;
    }
};