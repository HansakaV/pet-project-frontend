import { useEffect, useState } from "react";
import { getAllProjects, createProject, deleteProject } from "../api/project";
import type  Project  from "../types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllProjects();
      setProjects(res.data.data);
    } catch {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: {
    projectId: string;
    name: string;
    description: string;
  }) => {
    try {
      await createProject(data);
      loadProjects();
    } catch {
      setError("Failed to create project");
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteProject(id);
      loadProjects();
    } catch {
      setError("Failed to delete project");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    createProject: create,
    deleteProject: remove,
    reload: loadProjects,
  };
}
