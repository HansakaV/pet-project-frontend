import apiClient from "./axios";

export const getAllProjects = () => apiClient.get("/projects");
export const createProject = (data:any) => apiClient.post("/projects", data);
export const deleteProject = (projectId:string) => apiClient.delete(`/projects/${projectId}`);