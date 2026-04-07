import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { Plus, MoreHorizontal } from "lucide-react";

import type Task from "../../types/task";

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onAddTask: (status: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export default function Column({ id, title, tasks, onAddTask, onEditTask, onDeleteTask }: ColumnProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do": return "bg-indigo-500";
      case "In Progress": return "bg-amber-500";
      case "Done": return "bg-emerald-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <div className="kanban-column flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(title)} shadow-[0_0_8px_rgba(0,0,0,0.3)] shadow-current`} />
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            {title}
            <span className="ml-2 text-xs font-medium text-slate-500 normal-case">
              {tasks.length}
            </span>
          </h3>
        </div>
        <button className="text-slate-500 hover:text-slate-300 transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto custom-scrollbar pr-1 flex flex-col gap-3 min-h-[150px] transition-colors rounded-lg ${
              snapshot.isDraggingOver ? "bg-indigo-500/5 ring-1 ring-inset ring-indigo-500/20" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button
        onClick={() => onAddTask(title)}
        className="mt-4 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-800/40 border border-dashed border-slate-700 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all duration-300 text-sm font-medium"
      >
        <Plus size={16} />
        Add Task
      </button>
    </div>
  );
}
