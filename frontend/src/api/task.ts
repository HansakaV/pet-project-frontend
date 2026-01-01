import apiClient from "./axios";

export const getAllTasks = (projectId:string) => apiClient.get(`/tasks/${projectId}`);
export const createTask = (data:any) => apiClient.post("/tasks", data);
export const deleteTask = (taskId:string) => apiClient.delete(`/tasks/${taskId}`);
export const changeTaskStatus = (taskId:string, status:string) => apiClient.patch(`/tasks/${taskId}/status`, { status });