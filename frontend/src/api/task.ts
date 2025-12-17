import apiClient from "./axios";

export const createTask = (data:any) => {
    return apiClient.post("/tasks", data);
}