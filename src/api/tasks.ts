import axios from "axios";
const API_URL = "http://localhost:5001/api/tasks";

export const fetchTasks = (token: string) =>
    axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });

export const createTask = (token: string, task: any) =>
    axios.post(API_URL, task, { headers: { Authorization: `Bearer ${token}` } });

export const updateTask = (token: string, id: number, task: any) =>
    axios.put(`${API_URL}/${id}`, task, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTask = (token: string, id: number) =>
    axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });