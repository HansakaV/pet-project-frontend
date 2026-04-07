import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { ArrowLeft, Plus, Layout, LogOut, User as UserIcon } from "lucide-react";
import Column from "../components/board/Column";
import TaskModal from "../components/board/TaskModal";
import { getProjectById } from "../api/project";
import { getAllTasks, createTask, updateTask, deleteTask, changeTaskStatus } from "../api/task";
import { useAuth } from "../context/AuthContext";

import type Task from "../types/task";
import type Project from "../types/project";

const COLUMNS = ["To Do", "In Progress", "Done"];

export default function BoardPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState("To Do");

  const fetchData = useCallback(async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const [projectRes, tasksRes] = await Promise.all([
        getProjectById(projectId),
        getAllTasks(projectId)
      ]);
      setProject(projectRes.data.data);
      setTasks(tasksRes.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch project data");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Optimistic UI update
    const updatedTasks = Array.from(tasks);
    const taskIndex = updatedTasks.findIndex(t => t._id === draggableId);
    if (taskIndex === -1) return;

    const task = updatedTasks[taskIndex];
    const newStatus = destination.droppableId;
    
    // Update local state
    task.status = newStatus as any;
    setTasks(updatedTasks);

    try {
      await changeTaskStatus(draggableId, newStatus);
    } catch (err) {
      console.error("Failed to update task status", err);
      fetchData();
    }
  };

  const handleCreateOrUpdateTask = async (taskData: any) => {
    try {
      if (editingTask && editingTask._id) {
        await updateTask(editingTask._id, taskData);
      } else {
        await createTask({ ...taskData, projectId });
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchData();
    } catch (err) {
      console.error("Failed to save task", err);
    }
  };

  const handleDeleteTask = async (taskId: string | undefined) => {
    if (!taskId) return;
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId!);
      fetchData();
    } catch (err) {

      console.error("Failed to delete task", err);
    }
  };


  const openCreateModal = (status: string) => {
    setDefaultStatus(status);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] p-4 text-center">
      <h2 className="text-2xl font-bold text-red-400 mb-4">{error}</h2>
      <button onClick={() => navigate("/")} className="btn-primary">Back to Projects</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col">
      {/* Header */}
      <header className="glass-card sticky top-0 z-40 px-6 py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate("/")}
              className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-all shadow-lg shadow-indigo-500/5 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Layout size={16} className="text-indigo-400" />
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  {project?.name}
                </h1>
              </div>
              <p className="text-xs text-slate-500 max-w-md truncate">
                {project?.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/50 border border-white/5">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                <UserIcon size={12} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-slate-300">{user?.name}</span>
            </div>

            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>

            <button 
              onClick={() => openCreateModal("To Do")}
              className="btn-primary py-1.5 px-4 text-sm"
            >
              <Plus size={16} />
              New Task
            </button>
          </div>
        </div>
      </header>

      {/* Board Content */}
      <main className="flex-1 overflow-x-auto p-8 custom-scrollbar">
        <div className="max-w-7xl mx-auto h-full">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-6 h-full min-h-[calc(100vh-180px)]">
              {COLUMNS.map((status) => (
                <Column
                  key={status}
                  id={status}
                  title={status}
                  tasks={tasks.filter(t => t.status === status)}
                  onAddTask={openCreateModal}
                  onEditTask={openEditModal}
                  onDeleteTask={handleDeleteTask}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdateTask}
        initialTask={editingTask}
        defaultStatus={defaultStatus}
      />
    </div>
  );
}
