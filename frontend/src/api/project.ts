import apiClient from "./axios";

export const getAllProjects = () => apiClient.get("/projects");
export const getProjectById = (projectId:string) => apiClient.get(`/projects/${projectId}`);
export const createProject = (data:any) => apiClient.post("/projects", data);
export const deleteProject = (projectId:string) => apiClient.delete(`/projects/${projectId}`);