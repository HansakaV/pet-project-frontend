import {  useEffect,useState } from "react";
import type Task from "../types/task";
import { getAllTasks, createTask, deleteTask, changeTaskStatus } from "../api/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
        setLoading(true);
        setError("");
        const res = await getAllTasks();
        setTasks(res.data.data);
    } catch {
        setError("Failed to load tasks");
    } finally {
        setLoading(false);
    }
  };

  const create = async (data: {
    projectId: string;
    title: string;
    description: string;
    status: "To Do" | "In Progress" | "Done";
  }) => {
    try {
        await createTask(data);
        loadTasks();
    } catch {
        setError("Failed to create task");
    }
  };
  useEffect(()=> {
    loadTasks();
  },[])

  return {
    tasks,
    loading,
    error,
    createTask: create,
    reload: loadTasks,
  }
}

