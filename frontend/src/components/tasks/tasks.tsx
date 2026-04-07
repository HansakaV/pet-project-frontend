import {
  X,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Clock,
} from "lucide-react";
import type Task from "../../types/task";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  projectName: string;
  onAddTask: () => void;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskModal({
  isOpen,
  onClose,
  tasks,
  projectName,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: TaskModalProps) {
  if (!isOpen) return null;

  // 🔹 Split tasks by status
  const todoTasks = tasks.filter(t => t.status === "To Do");
  const inProgressTasks = tasks.filter(t => t.status === "In Progress");
  const doneTasks = tasks.filter(t => t.status === "Done");

  return (
    console.log("Rendering TaskModal for project:", projectName, "with tasks:", tasks),
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[85vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {projectName}
            </h2>
            <p className="text-sm text-gray-500">
              Manage project tasks and progress
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">

          {/* Top Bar */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">
              Tasks ({tasks.length})
            </h3>
            <button
              onClick={onAddTask}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
            >
              <Plus size={16} /> Add Task
            </button>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TaskColumn
              title="To Do"
              tasks={todoTasks}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />

            <TaskColumn
              title="In Progress"
              tasks={inProgressTasks}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />

            <TaskColumn
              title="Done"
              tasks={doneTasks}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================
   TASK COLUMN
   ====================== */

function TaskColumn({
  title,
  tasks,
  onUpdateTask,
  onDeleteTask,
}: {
  title: "To Do" | "In Progress" | "Done";
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}) {
  return (
    console.log("Rendering TaskColumn:", title, tasks),
    <div className="bg-gray-50 rounded-lg p-3">
      <h4 className="text-center font-semibold text-gray-700 mb-3">
        {title} ({tasks.length})
      </h4>

      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div
              key={task._id}
              className="bg-white border rounded-lg p-3 shadow-sm"
            >
              {/* Title */}
              <div className="flex items-center gap-2">
                <StatusIcon status={task.status} />
                <p className="font-medium text-sm">
                  {task.title}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 mt-1 ml-6">
                {task.description}
              </p>

              {/* Controls */}
              <div className="mt-3 space-y-2">

                {/* Status Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {task.status === "To Do" && (
                    <button
                      onClick={() =>
                        onUpdateTask({ ...task, status: "In Progress" })
                      }
                      className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded"
                    >
                      Move to In Progress
                    </button>
                  )}

                  {task.status === "In Progress" && (
                    <>
                      <button
                        onClick={() =>
                          onUpdateTask({ ...task, status: "Done" })
                        }
                        className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded"
                      >
                        Move to Done
                      </button>

                      <button
                        onClick={() =>
                          onUpdateTask({ ...task, status: "To Do" })
                        }
                        className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded"
                      >
                        Move to To Do
                      </button>
                    </>
                  )}

                  {task.status === "Done" && (
                    <button
                      onClick={() =>
                        onUpdateTask({ ...task, status: "To Do" })
                      }
                      className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded"
                    >
                      Move to To Do
                    </button>
                  )}
                </div>

                {/* Dropdown + Delete */}
                <div className="flex justify-between items-center">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      onUpdateTask({
                        ...task,
                        status: e.target.value as Task["status"],
                      })
                    }
                    className="text-xs border rounded p-1"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>

                  <button
                    onClick={() => onDeleteTask(task._id)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xs text-gray-400">
            No tasks
          </p>
        )}
      </div>
    </div>
  );
}

/* ======================
   STATUS ICON
   ====================== */

function StatusIcon({ status }: { status: Task["status"] }) {
  switch (status) {
    case "Done":
      return <CheckCircle2 size={16} className="text-green-500" />;
    case "In Progress":
      return <Clock size={16} className="text-amber-500" />;
    default:
      return <Circle size={16} className="text-gray-400" />;
  }
}
