import { Draggable } from "@hello-pangea/dnd";
import { Edit2, Trash2, Calendar } from "lucide-react";

import type Task from "../../types/task";

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, index, onEdit, onDelete }: TaskCardProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "High": return "text-red-400 bg-red-400/10";
      case "Medium": return "text-amber-400 bg-amber-400/10";
      case "Low": return "text-emerald-400 bg-emerald-400/10";
      default: return "text-slate-400 bg-slate-400/10";
    }
  };

  return (
    <Draggable draggableId={task._id!} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card group animate-fade-in ${
            snapshot.isDragging ? "ring-2 ring-indigo-500 shadow-2xl scale-105" : ""
          }`}
          style={{
            ...provided.draggableProps.style,
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-semibold text-slate-100 line-clamp-2">
              {task.title}
            </h4>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => onDelete(task._id!)}
                className="p-1 hover:bg-red-900/30 rounded text-slate-400 hover:text-red-400 transition-colors"
              >

                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-3 line-clamp-3 leading-relaxed">
            {task.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-700/50">
            {task.priority && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            )}
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <Calendar size={10} />
              <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
