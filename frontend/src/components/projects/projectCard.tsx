import { Trash2, FolderOpen, BookOpenCheck } from "lucide-react";
import { useState } from "react";
import type Project from "../../types/project";
import type Task from "../../types/task";

import { useTasks } from "../../hooks/useTasks";
import TaskModal from "../tasks/tasks";
import TaskFormModal from "../tasks/newTaskModel";

interface Props {
  project: Project;
  index: number;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onDelete }: Props) {
  // ✅ SINGLE source of truth for tasks
  const {
    tasks,
    createTask,
    deleteTask,
    changeTaskStatus,
  } = useTasks(project._id);

  const [isTaskListOpen, setIsTaskListOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const [taskFormData, setTaskFormData] = useState<{
    title: string;
    description: string;
    status: Task["status"];
    projectId: string;
  }>({
    title: "",
    description: "",
    status: "To Do",
    projectId: project._id,
  });

  /* ======================
     HANDLERS
     ====================== */

  const handleCreateTask = async () => {
    await createTask({
      title: taskFormData.title,
      description: taskFormData.description,
      status: taskFormData.status,
    });

    // reset form
    setTaskFormData({
      title: "",
      description: "",
      status: "To Do",
      projectId: project._id,
    });

    setIsTaskFormOpen(false);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };

  const handleUpdateTask = async (task: Task) => {
    await changeTaskStatus(task._id, task.status);
  };

  /* ======================
     UI
     ====================== */

  return (
    <>
      {/* ------------ Project Card ------------ */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
              <FolderOpen size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {project.name}
              </h3>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                ID: {project.projectId}
              </span>
            </div>
          </div>
        </div>

        {project.description && (
          <p className="text-gray-600 text-sm line-clamp-1 mb-3">
            {project.description}
          </p>
        )}

        <div className="flex items-center justify-end gap-2 pt-2 border-t">
          <button
            onClick={() => setIsTaskListOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg"
          >
            <BookOpenCheck size={16} />
            View Tasks
          </button>

          <button
            onClick={() => onDelete(project._id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* ------------ Task List Modal ------------ */}
      <TaskModal
        isOpen={isTaskListOpen}
        onClose={() => setIsTaskListOpen(false)}
        tasks={tasks}
        projectName={project.name}
        onAddTask={() => setIsTaskFormOpen(true)}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />

      {/* ------------ Task Create Modal ------------ */}
      <TaskFormModal
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        projectId={project._id}
        onCreateTask={handleCreateTask}
        TaskFromData={taskFormData}
        setTaskFormData={setTaskFormData}
      />
    </>
  );
}
