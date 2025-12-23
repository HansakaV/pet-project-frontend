import { X, Plus, Trash2, Edit2, CheckCircle2, Circle, Clock } from "lucide-react";
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
  isOpen, onClose, tasks, projectName, onAddTask, onUpdateTask, onDeleteTask 
}: TaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{projectName}</h2>
            <p className="text-sm text-gray-500">Manage project tasks and progress</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Task List */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Tasks ({tasks.length})</h3>
            <button 
              onClick={() => onAddTask() }
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-all text-sm"
            >
              <Plus size={16} /> Add Task
            </button>
          </div>

          <div className="space-y-3">
            {tasks.length > 0 ? tasks.map((task) => (
              
              <div key={task._id} className="group border rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={task.status} />
                      <h4 className="font-medium text-gray-900">{task.title || "Untitled Task"}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 ml-6">{task.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <select 
                      value={task.status}
                      onChange={(e) => onUpdateTask({ ...task, status: e.target.value as any })}
                      className="text-xs border rounded p-1 mr-2 bg-gray-50"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                    <button onClick={() => onDeleteTask(task._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-10 text-gray-400">
                <p>No tasks found. Click "Add Task" to start.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for status icons
function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "Done": return <CheckCircle2 size={18} className="text-green-500" />;
    case "In Progress": return <Clock size={18} className="text-amber-500" />;
    default: return <Circle size={18} className="text-gray-400" />;
  }
}