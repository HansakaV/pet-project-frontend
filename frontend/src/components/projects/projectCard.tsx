import { Trash2, FolderOpen, BookOpenCheck } from "lucide-react";
import { useState } from "react";
import type Project from "../../types/project";
import TaskModal from "../tasks/tasks"; 
import TaskFormModal from "../tasks/newTaskModel";

interface Props {
  project: Project;
  index: number;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onDelete }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  // Note: In a real app, these would likely be API calls passed via props
  const handleUpdateTask = (task: any) => console.log("Updating Task...", task);
  const handleDeleteTask = (id: string) => console.log("Deleting Task...", id);

  const handleAddTask = () => {
    setIsTaskFormOpen(true);
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
              <FolderOpen size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{project.name}</h3>
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

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-50">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <BookOpenCheck size={16} />
            View Tasks
          </button>
          
          <button
            onClick={() => onDelete(project._id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Task Management Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tasks={project.tasks || []} // Assuming tasks are part of the project object
        projectName={project.name}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />

      <TaskFormModal
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        projectId={project._id}
        onSubmit={(task) => {
        console.log("New Task:", task);
        setIsTaskFormOpen(false);
       }}
       />

      
    </>
  );
}