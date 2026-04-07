import { useEffect, useState } from "react";
import type Task from "../types/task";
import {
  getAllTasks,
  createTask,
  deleteTask,
  changeTaskStatus
} from "../api/task";

export function useTasks(projectId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    if (!projectId) return;
    console.log("Loading tasks for projectId:", projectId);

    try {
      setLoading(true);
      setError("");
      const res = await getAllTasks(projectId);
      console.log("Loaded tasks:", res.data.data);
      setTasks(res.data.data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: {
    title: string;
    description: string;
    status: "To Do" | "In Progress" | "Done";
  }) => {
    try {
      console.log("Creating task with data:", data, "for projectId:", projectId);
      await createTask({
        ...data,
        projectId
      });
      await loadTasks();
    } catch {
      setError("Failed to create task");
    }
  };

  const remove = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      await loadTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  const changeStatus = async (taskId: string, status: Task["status"]) => {
    try {
      await changeTaskStatus(taskId, status);
      await loadTasks();
    } catch {
      setError("Failed to update task");
    }
  };

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  return {
    tasks,
    loading,
    error,
    createTask: create,
    deleteTask: remove,
    changeTaskStatus: changeStatus,
    reload: loadTasks
  };
}
